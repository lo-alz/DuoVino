// Cloudflare Worker route (see src/worker.js) — Guided·Blanks leading-question hint.
// Given one WSET mark-scheme point, returns a single Socratic question that nudges
// the candidate toward recalling that point WITHOUT stating the answer, its key
// terms, or synonyms of them. The AI provider is chosen the same way as grading/
// the marketing agent — see functions/_lib/ai.js (HINT_PROVIDER / HINT_MODEL env
// vars, Cloudflare dashboard -> Workers & Pages -> duovino -> Settings ->
// Variables and secrets — defaults to Gemini).
//
// Contract:
//   POST { point: string, category?: string, topic?: string }
//   200  { question: string }
//   4xx/5xx { error: string }

import { callAI } from "./_lib/ai.js";

const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "content-type",
};

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { ...CORS, "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const SYSTEM = `You write single leading questions for WSET Diploma flashcard-style recall practice.

You are given one mark-scheme point — a fact or idea a candidate should recall — plus its category and topic for context. Write ONE short question that nudges the candidate toward THAT specific point, without stating the answer, its key terms, or close synonyms of them. The question should feel like a teacher's prompt: it narrows the candidate's thinking without doing the recall for them.

Return STRICT JSON only — no markdown, no commentary: {"question":"..."}`;

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: "Bad request: invalid JSON" }, 400); }

  const { point, category, topic } = body || {};
  if (typeof point !== "string" || !point.trim()) return json({ error: "Missing point" }, 400);

  const user = `TOPIC: ${topic || ""}\nCATEGORY: ${category || ""}\nMARK POINT (do not reveal this or its wording): ${point}\n\nWrite the leading question now. Respond with the strict JSON object only.`;

  const provider = env.HINT_PROVIDER || "gemini";
  const model = env.HINT_MODEL || undefined;

  let text;
  try {
    ({ text } = await callAI({ env, provider, model, system: SYSTEM, user, maxTokens: 400, json: true, thinking: "disabled" }));
  } catch (e) {
    return json({ error: "Hint model call failed: " + (e?.message || "unknown") }, 502);
  }

  let raw = text.trim();
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) raw = fence[1].trim();
  const s = raw.indexOf("{"), e = raw.lastIndexOf("}");
  if (s >= 0 && e > s) raw = raw.slice(s, e + 1);

  let out;
  try { out = JSON.parse(raw); } catch { return json({ error: "Hint returned unparseable output" }, 502); }

  const question = typeof out?.question === "string" ? out.question.trim() : "";
  if (!question) return json({ error: "Hint returned empty question" }, 502);

  return json({ question });
}
