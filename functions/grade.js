// Cloudflare Worker route (see src/worker.js) — DuoVino WSET mock-exam AI grader.
// The AI provider is NOT hardcoded here — see functions/_lib/ai.js. Which
// vendor/model grades exams is chosen by the GRADE_PROVIDER / GRADE_MODEL env
// vars (Cloudflare dashboard -> Workers & Pages -> duovino -> Settings ->
// Variables and secrets), defaulting to Gemini. That vendor's API key
// (e.g. GEMINI_API_KEY) is never shipped to the browser.
//
// The live site is served from GitHub Pages, so the browser calls this
// function CROSS-ORIGIN at https://duovino.alzapp.workers.dev/grade — every
// response (including the OPTIONS preflight and errors) must carry CORS headers.
//
// Contract:
//   POST { stem: string,
//          parts: [{ label, weight, points: [{ p: string, ess: boolean }] }],
//          answer: string }                     // one question at a time
//   200  { parts: [{ points: [{ score: 0-100, quote: "verbatim substring of answer, or '' if score is 0" }] }],
//          comment: "2-3 sentence examiner comment" }
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

const SYSTEM = `You are a WSET Diploma (Level 4, D3 Wines of the World) theory examiner using positive, points-based marking with partial credit.

You are given a question, its official mark scheme (weighted parts, each with indexed mark points — some flagged ESSENTIAL) and one candidate's written answer.

For every mark point, score how close the candidate's answer comes to it on a 0-100 scale, judging essence (is the right idea there), depth (is it developed, not just named), and content (is it accurate and specific) — never just keyword matching:
- 0 = not addressed at all.
- 1-39 = a passing mention or partially relevant idea, missing the substance, depth, or accuracy the point requires.
- 40-79 = the core idea is present but underdeveloped, imprecise, or missing a qualifying detail a top answer would include.
- 80-100 = the point is made with the essence, depth, and precision expected of a strong answer.

For every point scoring above 0, copy ONE exact contiguous substring from the candidate's answer as evidence — the passage that earns the credit. Quotes MUST be verbatim, character-for-character substrings of the answer (the client highlights them by exact string search). Never paraphrase, trim internal words, or fix spelling inside a quote. Keep each quote under 200 characters. Points scoring 0 get an empty quote.

Return STRICT JSON only — no markdown, no code fences, no commentary outside the JSON:
{"parts":[{"points":[{"score":0-100,"quote":"..."}]}],"comment":"..."}

Rules:
- "parts" has exactly one entry per mark-scheme part, in the same order; "points" has exactly one entry per mark point, in the same order.
- "comment" is a 2-3 sentence examiner's comment in the register of a WSET examiners' report: name the strongest aspect, the most costly shortfall (especially ESSENTIAL points that scored low), and one concrete improvement.`;

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: "Bad request: invalid JSON" }, 400); }

  const { stem, parts, answer } = body || {};
  const partsOk = Array.isArray(parts) && parts.length &&
    parts.every((p) => p && typeof p.label === "string" && Array.isArray(p.points) && p.points.length &&
      p.points.every((pt) => pt && typeof pt.p === "string"));
  if (typeof stem !== "string" || !stem || !partsOk) return json({ error: "Missing or invalid stem/parts" }, 400);
  if (typeof answer !== "string" || answer.trim().length < 20) return json({ error: "Answer too short to mark" }, 400);

  const scheme = parts
    .map((p, pi) =>
      `Part ${pi} — ${p.label} (${p.weight}% of the question):\n` +
      p.points.map((pt, ki) => `  [${ki}]${pt.ess ? " (ESSENTIAL)" : ""} ${pt.p}`).join("\n"))
    .join("\n\n");

  const user = `QUESTION:\n${stem}\n\nMARK SCHEME:\n${scheme}\n\nCANDIDATE ANSWER:\n${answer}\n\nMark the answer now. Respond with the strict JSON object only.`;

  const provider = env.GRADE_PROVIDER || "gemini";
  const model = env.GRADE_MODEL || undefined;

  let text;
  try {
    ({ text } = await callAI({ env, provider, model, system: SYSTEM, user, maxTokens: 2000, json: true, thinking: "disabled" }));
  } catch (e) {
    return json({ error: "Grader model call failed: " + (e?.message || "unknown") }, 502);
  }

  // Defensive parse: strip code fences, isolate the outermost object.
  let raw = text.trim();
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) raw = fence[1].trim();
  const s = raw.indexOf("{"), e = raw.lastIndexOf("}");
  if (s >= 0 && e > s) raw = raw.slice(s, e + 1);

  let out;
  try { out = JSON.parse(raw); } catch { return json({ error: "Grader returned unparseable output" }, 502); }

  // Validate + clamp: scores 0-100, quotes must be verbatim substrings of the answer —
  // a nonzero score with no defensible quote is untrusted and clamped to 0.
  const clean = {
    parts: parts.map((p, pi) => {
      const rp = (Array.isArray(out?.parts) ? out.parts[pi] : null) || {};
      const rpoints = Array.isArray(rp.points) ? rp.points : [];
      const points = p.points.map((_, ki) => {
        const rk = rpoints[ki] || {};
        let score = Number(rk.score);
        if (!Number.isFinite(score)) score = 0;
        score = Math.max(0, Math.min(100, Math.round(score)));
        let quote = typeof rk.quote === "string" ? rk.quote : "";
        if (!quote || !answer.includes(quote)) { quote = ""; score = 0; }
        return { score, quote };
      });
      return { points };
    }),
    comment: typeof out?.comment === "string" ? out.comment : "",
  };

  return json(clean);
}
