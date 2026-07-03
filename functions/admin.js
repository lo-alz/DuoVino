// Cloudflare Pages Function — DuoVino admin gate (secure alternative to the
// client-side SHA-256 check used when the app is on GitHub Pages alone).
// The admin password lives ONLY here (ADMIN_PASS, set in the Cloudflare
// Pages dashboard -> Settings -> Environment variables). The browser POSTs
// { passcode } to /admin; on a correct passcode this returns the list of
// registered emails from the Supabase accounts table.

const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "content-type",
};

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...CORS, "content-type": "application/json", "cache-control": "no-store" },
  });
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: "Bad request" }, 400); }

  const ADMIN_PASS = env.ADMIN_PASS || "loloadmin";
  if (!body || body.passcode !== ADMIN_PASS) return json({ error: "Unauthorized" }, 401);

  const SUPABASE_URL = env.SUPABASE_URL || "https://akcllnykjdobuclojjdc.supabase.co";
  const SUPABASE_KEY = env.SUPABASE_ANON_KEY || "sb_publishable_vMCtrrJgu2mhTR-hSo5_Gw_BTqMubel";

  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/accounts?select=email,updated_at&order=updated_at.desc`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    if (!r.ok) return json({ error: "Database error" }, 500);
    const emails = await r.json();
    return json({ emails }, 200);
  } catch (e) {
    return json({ error: e?.message || "Unknown error" }, 500);
  }
}
