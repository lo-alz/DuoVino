// Cloudflare Worker route (see src/worker.js) — DuoVino WSET mock-exam AI grader.
// The Gemini API key lives ONLY here (GEMINI_API_KEY, set in the
// Cloudflare dashboard -> Workers & Pages -> duovino -> Settings -> Variables
// and secrets); it is never shipped to the browser.
//
// The live site is served from GitHub Pages, so the browser calls this
// function CROSS-ORIGIN at https://duovino.alzapp.workers.dev/grade — every
// response (including the OPTIONS preflight and errors) must carry CORS headers.
//
// Contract:
//   POST { stem: string,
//          parts: [{ label, weight, points: [{ p: string, ess: boolean }] }],
//          answer: string }                     // one question at a time
//   200  { parts: [{ covered: [pointIdx],
//                    evidence: [{ i: pointIdx, quote: "verbatim substring of answer" }],
//                    missed: [pointIdx] }],
//          comment: "2-3 sentence examiner comment" }
//   4xx/5xx { error: string }

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

const SYSTEM = `You are a WSET Diploma (Level 4, D3 Wines of the World) theory examiner using positive, points-based marking.

You are given a question, its official mark scheme (weighted parts, each with indexed mark points — some flagged ESSENTIAL) and one candidate's written answer.

Decide, for every mark point, whether the candidate's answer genuinely addresses it. A point is covered only when the substance of the point is actually made — a passing mention of a keyword without the idea behind it earns nothing. Do not reward material that merely relates to the topic.

For each covered point, copy ONE exact contiguous substring from the candidate's answer as evidence — the passage that earns the mark. Quotes MUST be verbatim, character-for-character substrings of the answer (the client highlights them by exact string search). Never paraphrase, trim internal words, or fix spelling inside a quote. Keep each quote under 200 characters.

Return STRICT JSON only — no markdown, no code fences, no commentary outside the JSON:
{"parts":[{"covered":[pointIdx...],"evidence":[{"i":pointIdx,"quote":"..."}],"missed":[pointIdx...]}],"comment":"..."}

Rules:
- "parts" has exactly one entry per mark-scheme part, in the same order.
- "covered" and "missed" together account for every point index of that part.
- Every covered index should have one evidence entry; missed points have none.
- "comment" is a 2-3 sentence examiner's comment in the register of a WSET examiners' report: name the strongest aspect, the most costly omission (especially ESSENTIAL points), and one concrete improvement.`;

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

  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) return json({ error: "Server not configured: GEMINI_API_KEY is not set" }, 500);

  const scheme = parts
    .map((p, pi) =>
      `Part ${pi} — ${p.label} (${p.weight}% of the question):\n` +
      p.points.map((pt, ki) => `  [${ki}]${pt.ess ? " (ESSENTIAL)" : ""} ${pt.p}`).join("\n"))
    .join("\n\n");

  const user = `QUESTION:\n${stem}\n\nMARK SCHEME:\n${scheme}\n\nCANDIDATE ANSWER:\n${answer}\n\nMark the answer now. Respond with the strict JSON object only.`;

  let resp;
  try {
    resp = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents: [{ role: "user", parts: [{ text: user }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 2000, responseMimeType: "application/json" },
      }),
    });
  } catch (e) {
    return json({ error: "Grader model call failed: " + (e?.message || "unknown") }, 502);
  }

  if (!resp.ok) {
    let detail = "";
    try { detail = (await resp.json())?.error?.message || ""; } catch {}
    return json({ error: "Grader model call failed" + (detail ? ": " + detail : "") }, 502);
  }

  const msg = await resp.json();

  // Defensive parse: join text parts, strip code fences, isolate the outermost object.
  let raw = ((msg.candidates?.[0]?.content?.parts) || []).map((b) => b.text || "").join("").trim();
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) raw = fence[1].trim();
  const s = raw.indexOf("{"), e = raw.lastIndexOf("}");
  if (s >= 0 && e > s) raw = raw.slice(s, e + 1);

  let out;
  try { out = JSON.parse(raw); } catch { return json({ error: "Grader returned unparseable output" }, 502); }

  // Validate + clamp: indices in range, quotes verbatim substrings, missed = complement of covered.
  const clean = {
    parts: parts.map((p, pi) => {
      const rp = (Array.isArray(out?.parts) ? out.parts[pi] : null) || {};
      const n = p.points.length;
      const inR = (k) => Number.isInteger(k) && k >= 0 && k < n;
      const covered = [...new Set((Array.isArray(rp.covered) ? rp.covered : []).filter(inR))];
      const evidence = (Array.isArray(rp.evidence) ? rp.evidence : [])
        .filter((ev) => ev && inR(ev.i) && typeof ev.quote === "string" && ev.quote.length && answer.includes(ev.quote))
        .map((ev) => ({ i: ev.i, quote: ev.quote }));
      const missed = Array.from({ length: n }, (_, k) => k).filter((k) => !covered.includes(k));
      return { covered, evidence, missed };
    }),
    comment: typeof out?.comment === "string" ? out.comment : "",
  };

  return json(clean);
}
