// Netlify serverless function — links the site to a Managed Agent created in
// the Claude Console. The Anthropic API key lives ONLY here (ANTHROPIC_API_KEY
// env var) and is never shipped to the browser.
//
// Flow (Managed Agents): reuse a pre-created Environment (MANAGED_ENV_ID) +
// the Console Agent (MANAGED_AGENT_ID). Each conversation is a Session; we
// open the session's event stream, send the user's message, and stream the
// agent's text back. The session id is returned in the `x-session-id` header
// so the browser can continue the same conversation on later turns.

import Anthropic from "@anthropic-ai/sdk";

export default async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  let body;
  try { body = await req.json(); } catch { return new Response("Bad request", { status: 400 }); }

  const passcode = process.env.MARKETING_PASSCODE;
  if (passcode && body.passcode !== passcode) return new Response("Unauthorized", { status: 401 });

  const text = (body.text || "").toString().trim();
  if (!text) return new Response("Missing message", { status: 400 });

  if (!process.env.ANTHROPIC_API_KEY) return new Response("Server not configured: ANTHROPIC_API_KEY is not set.", { status: 500 });
  if (!process.env.MANAGED_AGENT_ID)  return new Response("Server not configured: MANAGED_AGENT_ID is not set.", { status: 500 });
  if (!process.env.MANAGED_ENV_ID)    return new Response("Server not configured: MANAGED_ENV_ID is not set.", { status: 500 });

  const client = new Anthropic(); // reads ANTHROPIC_API_KEY

  // Reuse the session the browser sends back; otherwise start a new one.
  let sessionId = (body.sessionId || "").toString().trim();
  try {
    if (!sessionId) {
      const session = await client.beta.sessions.create({
        agent: process.env.MANAGED_AGENT_ID,        // string shorthand → latest version
        environment_id: process.env.MANAGED_ENV_ID,
        title: "DuoVino marketing chat",
      });
      sessionId = session.id;
    }
  } catch (e) {
    return new Response("Could not start session: " + (e?.message || "unknown"), { status: 502 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const push = (s) => controller.enqueue(encoder.encode(s));
      try {
        // Stream-first: open the event stream, THEN send the user message.
        const events = await client.beta.sessions.events.stream(sessionId);
        await client.beta.sessions.events.send(sessionId, {
          events: [{ type: "user.message", content: [{ type: "text", text }] }],
        });

        for await (const ev of events) {
          if (ev.type === "agent.message") {
            for (const block of (ev.content || [])) {
              if (block.type === "text" && block.text) push(block.text);
            }
          } else if (ev.type === "session.error") {
            push("\n\n[agent error: " + (ev.error?.message || "unknown") + "]");
          } else if (ev.type === "session.status_terminated") {
            break;
          } else if (ev.type === "session.status_idle") {
            // requires_action would mean it's waiting on a tool result; for a
            // text agent we just treat idle as "turn complete".
            break;
          }
        }
      } catch (e) {
        push("\n\n[stream error: " + (e?.message || "unknown") + "]");
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-session-id": sessionId,
    },
  });
};
