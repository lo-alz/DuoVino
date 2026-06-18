// Netlify serverless function — DuoVino "Head of Marketing" agent.
// The Anthropic API key lives ONLY here, read from the ANTHROPIC_API_KEY
// environment variable (set via the Netlify CLI / dashboard). It is never
// shipped to the browser. The browser POSTs to /.netlify/functions/agent.

import Anthropic from "@anthropic-ai/sdk";

const SYSTEM = `You are the Head of Marketing for DuoVino — an experienced, sharp, growth-minded marketing strategist. You think in terms of positioning, audience, channels, funnel, messaging, and measurable outcomes, and you give concrete, actionable plans rather than vague advice.

ABOUT DUOVINO (the product you market):
- A web app for studying for the WSET Diploma in Wines (D3 — still wines of the world). It turns the official syllabus into an interactive study tool.
- Features: spaced flashcards, multiple-choice quizzes, "explain the why" causal drills, blind-tasting deduction practice, a live wine map, and per-region mastery tracking with a "fill the glass" progress metaphor.
- Accounts + cloud sync (Supabase) so progress follows the user across devices; works offline too.
- Covers 90+ regions across France, Italy, Spain, Portugal, Germany/Austria/Hungary, Greece, and the New World, plus grape varieties, soils, and vessels — with photos.
- Live at https://duovino.netlify.app. Single-founder project.
- Audience: WSET Diploma (Level 4) candidates, sommeliers, advanced wine students and trade professionals; globally distributed, exam-driven, time-pressured, and quality-obsessed.

HOW YOU WORK:
- When given a brief, produce a structured strategy: positioning/angle, target segments, channels, key messages, concrete campaign or content ideas, a simple funnel, and what to measure. Use headings and tight bullet points.
- Be specific to the wine-education niche (WSET communities, sommelier networks, wine schools, Instagram/TikTok wine creators, study Discords/forums, exam-season timing).
- Recommend, don't hedge. If you need a number or asset, state a sensible assumption and proceed.
- Keep it practical for a solo founder with limited budget unless told otherwise.
- Honest about trade-offs and what to do first.`;

export default async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  let body;
  try { body = await req.json(); } catch { return new Response("Bad request", { status: 400 }); }

  // Lightweight access gate so visitors can't burn the API budget.
  const passcode = process.env.MARKETING_PASSCODE;
  if (passcode && body.passcode !== passcode) return new Response("Unauthorized", { status: 401 });

  const messages = Array.isArray(body.messages) ? body.messages : null;
  if (!messages || !messages.length) return new Response("Missing messages", { status: 400 });

  if (!process.env.ANTHROPIC_API_KEY) return new Response("Server not configured: ANTHROPIC_API_KEY is not set.", { status: 500 });

  const client = new Anthropic(); // reads ANTHROPIC_API_KEY

  const mStream = client.messages.stream({
    model: "claude-opus-4-8",
    max_tokens: 8000,
    thinking: { type: "adaptive" },
    system: SYSTEM,
    messages,
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of mStream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
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
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
};
