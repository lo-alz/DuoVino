// DuoVino — Cloudflare Worker entry point.
// This project is deployed as a Worker-with-assets (dashboard Git integration
// runs `npx wrangler deploy`, driven by wrangler.jsonc at the repo root).
// Static files (index.html, marketing.html, images, etc.) are served via the
// ASSETS binding; a few paths are routed to serverless function logic below.
// Those handlers are the SAME Pages-Functions-style modules under /functions
// (onRequestPost/onRequestOptions receiving a { request, env } context) so
// the logic is written once and works whether this ends up deployed as a
// classic Cloudflare Pages project or, as here, a Worker with assets.

import * as grade from "../functions/grade.js";
import * as agent from "../functions/agent.js";
import * as admin from "../functions/admin.js";

const ROUTES = {
  "/grade": grade,
  "/agent": agent,
  "/admin": admin,
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const route = ROUTES[url.pathname];

    if (route) {
      const ctxObj = { request, env, ctx };
      if (request.method === "OPTIONS" && route.onRequestOptions) return route.onRequestOptions(ctxObj);
      if (request.method === "POST" && route.onRequestPost) return route.onRequestPost(ctxObj);
      return new Response("Method not allowed", { status: 405 });
    }

    // Everything else: serve the static site.
    return env.ASSETS.fetch(request);
  },
};
