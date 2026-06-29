// Netlify serverless function — DuoVino admin gate.
// The admin password lives ONLY here (server-side) — never shipped to the
// browser. Override it by setting ADMIN_PASS in the Netlify dashboard
// (Site settings → Environment variables); otherwise the default below is used.
// The browser POSTs { passcode } to /.netlify/functions/admin; on a correct
// passcode this returns the list of registered emails from the accounts table.

const ADMIN_PASS    = process.env.ADMIN_PASS    || "loloadmin";
const SUPABASE_URL  = process.env.SUPABASE_URL  || "https://akcllnykjdobuclojjdc.supabase.co";
const SUPABASE_KEY  = process.env.SUPABASE_ANON_KEY || "sb_publishable_vMCtrrJgu2mhTR-hSo5_Gw_BTqMubel";

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

export default async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  let body;
  try { body = await req.json(); } catch { return json({ error: "Bad request" }, 400); }

  if (!body || body.passcode !== ADMIN_PASS) return json({ error: "Unauthorized" }, 401);

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
};
