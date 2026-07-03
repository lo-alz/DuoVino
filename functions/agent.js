// Cloudflare Pages Function — DuoVino "Head of Marketing" agent.
// The Anthropic API key lives ONLY here (ANTHROPIC_API_KEY, set in the
// Cloudflare Pages dashboard -> Settings -> Environment variables); it is
// never shipped to the browser. The live site is served from GitHub Pages,
// so the browser calls this function CROSS-ORIGIN at
// https://duovino.pages.dev/agent — every response needs CORS headers.

const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "content-type",
};

const SYSTEM = `You are the Head of Marketing for DuoVino — an experienced, sharp, growth-minded marketing strategist. You think in terms of positioning, audience, channels, funnel, messaging, and measurable outcomes, and you give concrete, actionable plans rather than vague advice.

ABOUT DUOVINO (the product you market):
- A web app for studying WSET wine qualifications (Level 3 and Diploma units D1-D6, currently focused on D3 — still wines of the world). It turns the official syllabus into an interactive study tool.
- Features: spaced flashcards, multiple-choice quizzes, "explain the why" causal drills, blind-tasting deduction practice, a live wine map, mock exams with AI grading, and per-region mastery tracking with a "fill the glass" progress metaphor.
- Accounts + cloud sync (Supabase) so progress follows the user across devices; works offline too.
- Covers 90+ regions across France, Italy, Spain, Portugal, Germany/Austria/Hungary, Greece, and the New World, plus grape varieties, soils, and vessels — with photos.
- Live at https://lo-alz.github.io/DuoVino/. Single-founder project.
- Audience: WSET Diploma (Level 4) candidates, sommeliers, advanced wine students and trade professionals; globally distributed, exam-driven, time-pressured, and quality-obsessed.

HOW YOU WORK:
- When given a brief, produce a structured strategy: positioning/angle, target segments, channels, key messages, concrete campaign or content ideas, a simple funnel, and what to measure. Use headings and tight bullet points.
- Be specific to the wine-education niche (WSET communities, sommelier networks, wine schools, Instagram/TikTok wine creators, study Discords/forums, exam-season timing).
- Recommend, don't hedge. If you need a number or asset, state a sensible assumption and proceed.
- Keep it practical for a solo founder with limited budget unless told otherwise.
- Honest about trade-offs and what to do first.`;

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch {
    return new Response("Bad request", { status: 400, headers: CORS });
  }

  // Lightweight access gate so visitors can't burn the API budget.
  const passcode = env.MARKETING_PASSCODE;
  if (passcode && body.passcode !== passcode) {
    return new Response("Unauthorized", { status: 401, headers: CORS });
  }

  const messages = Array.isArray(body.messages) ? body.messages : null;
  if (!messages || !messages.length) {
    return new Response("Missing messages", { status: 400, headers: CORS });
  }

  const apiKey = env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response("Server not configured: ANTHROPIC_API_KEY is not set.", { status: 500, headers: CORS });
  }

  let upstream;
  try {
    upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-8",
        max_tokens: 8000,
        thinking: { type: "adaptive" },
        system: SYSTEM,
        messages,
        stream: true,
      }),
    });
  } catch (e) {
    return new Response("Upstream error: " + (e?.message || "unknown"), { status: 502, headers: CORS });
  }

  if (!upstream.ok || !upstream.body) {
    let detail = "";
    try { detail = (await upstream.json())?.error?.message || ""; } catch {}
    return new Response("Model call failed" + (detail ? ": " + detail : ""), { status: 502, headers: CORS });
  }

  // Re-stream: parse the upstream SSE and forward only the text deltas as plain text,
  // matching the previous Netlify function's client contract (plain-text stream).
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = upstream.body.getReader();

  const stream = new ReadableStream({
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
            const m = line.match(/^data:\s*(.*)$/);
            if (!m) continue;
            let evt;
            try { evt = JSON.parse(m[1]); } catch { continue; }
            if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta") {
              controller.enqueue(encoder.encode(evt.delta.text));
            }
          }
        }
      } catch (e) {
        controller.enqueue(encoder.encode("\n\n[stream error: " + (e?.message || "unknown") + "]"));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { ...CORS, "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
}
