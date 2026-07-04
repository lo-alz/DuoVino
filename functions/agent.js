// Cloudflare Worker route (see src/worker.js) — DuoVino "Head of Marketing" agent.
// The AI provider is NOT hardcoded here — see functions/_lib/ai.js. Which
// vendor/model answers is chosen by the AGENT_PROVIDER / AGENT_MODEL env vars
// (Cloudflare dashboard -> Workers & Pages -> duovino -> Settings -> Variables
// and secrets), defaulting to Claude. That vendor's API key (e.g.
// ANTHROPIC_API_KEY) is never shipped to the browser. The live site is served
// from GitHub Pages, so the browser calls this function CROSS-ORIGIN at
// https://duovino.alzapp.workers.dev/agent — every response needs CORS headers.

import { callAIStream } from "./_lib/ai.js";

const DEFAULT_MODEL = "claude-opus-4-8";

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

  const provider = env.AGENT_PROVIDER || "anthropic";
  const model = env.AGENT_MODEL || DEFAULT_MODEL;

  let stream;
  try {
    stream = await callAIStream({ env, provider, model, system: SYSTEM, messages, maxTokens: 8000, thinking: "adaptive" });
  } catch (e) {
    return new Response("Upstream error: " + (e?.message || "unknown"), { status: 502, headers: CORS });
  }

  return new Response(stream, {
    headers: { ...CORS, "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
}
