// Central AI-provider registry, shared by grade.js and agent.js.
//
// Callers never name a provider, model, endpoint, or request shape directly —
// they call callAI()/callAIStream() with a `provider` string that comes from
// an env var (GRADE_PROVIDER, AGENT_PROVIDER). To point either function at a
// different vendor, change that env var in the Cloudflare dashboard; no code
// edit needed. To ADD a vendor, add one entry below (endpoint/headers/body
// shape + how to pull text out of its response) — everything else adapts
// automatically.

export const PROVIDERS = {
  anthropic: {
    keyEnv: "ANTHROPIC_API_KEY",
    defaultModel: "claude-sonnet-5",
    endpoint: "https://api.anthropic.com/v1/messages",
    headers: (key) => ({ "x-api-key": key, "anthropic-version": "2023-06-01" }),
    body: ({ model, system, user, maxTokens, thinking }) => ({
      model, max_tokens: maxTokens, thinking: { type: thinking || "disabled" },
      system, messages: [{ role: "user", content: user }],
    }),
    text: (data) => (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join(""),
    error: (data) => data?.error?.message,

    streamEndpoint: "https://api.anthropic.com/v1/messages",
    streamBody: ({ model, system, messages, maxTokens, thinking }) => ({
      model, max_tokens: maxTokens, thinking: { type: thinking || "adaptive" },
      system, messages, stream: true,
    }),
    streamDelta: (evt) =>
      evt.type === "content_block_delta" && evt.delta?.type === "text_delta" ? evt.delta.text : "",
  },

  gemini: {
    keyEnv: "GEMINI_API_KEY",
    defaultModel: "gemini-2.5-flash",
    endpoint: (model) => `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    headers: (key) => ({ "x-goog-api-key": key }),
    body: ({ system, user, maxTokens, json, thinking }) => ({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: "user", parts: [{ text: user }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: maxTokens,
        ...(json ? { responseMimeType: "application/json" } : {}),
        // Gemini 2.5's "thinking" tokens count against maxOutputTokens — with a
        // small budget the model can spend it all reasoning and emit no visible
        // text. Structured one-shot calls (grading, hints) don't need it.
        ...(thinking === "disabled" ? { thinkingConfig: { thinkingBudget: 0 } } : {}),
      },
    }),
    text: (data) => (data.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join(""),
    error: (data) => data?.error?.message,

    streamEndpoint: (model) =>
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`,
    streamBody: ({ system, messages, maxTokens, thinking }) => ({
      systemInstruction: { parts: [{ text: system }] },
      contents: messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        maxOutputTokens: maxTokens,
        ...(thinking === "disabled" ? { thinkingConfig: { thinkingBudget: 0 } } : {}),
      },
    }),
    streamDelta: (evt) => (evt.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join(""),
  },
};

function resolve(providerName) {
  const cfg = PROVIDERS[providerName];
  if (!cfg) throw new Error(`Unknown AI provider: "${providerName}"`);
  return cfg;
}

// One-shot call. Returns { text }. Throws on missing key / HTTP error.
export async function callAI({ env, provider, model, system, user, maxTokens = 2000, json = false, thinking }) {
  const cfg = resolve(provider);
  const apiKey = env[cfg.keyEnv];
  if (!apiKey) throw new Error(`Server not configured: ${cfg.keyEnv} is not set`);
  const m = model || cfg.defaultModel;

  const endpoint = typeof cfg.endpoint === "function" ? cfg.endpoint(m) : cfg.endpoint;
  const resp = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json", ...cfg.headers(apiKey) },
    body: JSON.stringify(cfg.body({ model: m, system, user, maxTokens, json, thinking })),
  });

  const data = await resp.json().catch(() => null);
  if (!resp.ok) throw new Error((data && cfg.error(data)) || `${provider} call failed (${resp.status})`);

  return { text: cfg.text(data || {}) };
}

// Streaming call. Returns a ReadableStream<Uint8Array> of plain-text deltas
// (provider-specific SSE framing is fully absorbed here).
export async function callAIStream({ env, provider, model, system, messages, maxTokens = 8000, thinking }) {
  const cfg = resolve(provider);
  if (!cfg.streamEndpoint) throw new Error(`Provider "${provider}" does not support streaming`);
  const apiKey = env[cfg.keyEnv];
  if (!apiKey) throw new Error(`Server not configured: ${cfg.keyEnv} is not set`);
  const m = model || cfg.defaultModel;

  const endpoint = typeof cfg.streamEndpoint === "function" ? cfg.streamEndpoint(m) : cfg.streamEndpoint;
  const resp = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json", ...cfg.headers(apiKey) },
    body: JSON.stringify(cfg.streamBody({ model: m, system, messages, maxTokens, thinking })),
  });

  if (!resp.ok || !resp.body) {
    let detail = "";
    try { detail = cfg.error(await resp.json()) || ""; } catch {}
    throw new Error(detail || `${provider} stream call failed (${resp.status})`);
  }

  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const reader = resp.body.getReader();

  return new ReadableStream({
    async start(controller) {
      let buf = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          const lines = buf.split("\n");
          buf = lines.pop() ?? "";
          for (const line of lines) {
            const m2 = line.match(/^data:\s*(.*)$/);
            if (!m2 || m2[1] === "[DONE]") continue;
            let evt;
            try { evt = JSON.parse(m2[1]); } catch { continue; }
            const delta = cfg.streamDelta(evt);
            if (delta) controller.enqueue(encoder.encode(delta));
          }
        }
      } catch (e) {
        controller.enqueue(encoder.encode("\n\n[stream error: " + (e?.message || "unknown") + "]"));
      } finally {
        controller.close();
      }
    },
  });
}
