// Thin client for the Supabase backend used by index.html (read, upload) and admin.html (write).
// Plain fetch calls against Supabase's REST, Storage, and Auth endpoints. No library needed.
window.Backend = (function () {
  const cfg = window.PPR_BACKEND || {};
  const KEY = "ppr_admin_session";
  const ready = () => !!(cfg.url && cfg.anonKey);

  let session = null;
  try { session = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { session = null; }

  function setSession(s) {
    session = s ? {
      access_token: s.access_token, refresh_token: s.refresh_token, user: s.user,
      expires_at: s.expires_at || (Math.floor(Date.now() / 1000) + (s.expires_in || 3600))
    } : null;
    try { session ? localStorage.setItem(KEY, JSON.stringify(session)) : localStorage.removeItem(KEY); } catch (e) {}
  }

  async function req(path, opts) {
    opts = opts || {};
    // An organizer login (admin page) is shared with the portal on the same phone. Refresh it when it has
    // expired, or drop it and fall back to the public key, so reads never fail with "JWT expired".
    if (session) await ensureFresh();
    const headers = Object.assign({ apikey: cfg.anonKey, Authorization: "Bearer " + (session ? session.access_token : cfg.anonKey) }, opts.headers || {});
    const r = await fetch(cfg.url + path, Object.assign({}, opts, { headers }));
    if (!r.ok) {
      let msg = r.statusText;
      try { const j = await r.json(); msg = j.message || j.msg || j.error_description || j.error || JSON.stringify(j); } catch (e) {}
      throw new Error(msg || ("HTTP " + r.status));
    }
    const ct = r.headers.get("content-type") || "";
    return ct.includes("json") ? r.json() : r.text();
  }

  // ---- auth (admin page only) ----
  async function signIn(email, password) {
    const s = await req("/auth/v1/token?grant_type=password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    setSession(s); return s;
  }
  let refreshing = null; // one refresh at a time, so parallel requests share it
  async function ensureFresh() {
    if (!session) return null;
    if (session.expires_at - 60 > Date.now() / 1000) return session;
    if (!refreshing) {
      refreshing = (async () => {
        try {
          const r = await fetch(cfg.url + "/auth/v1/token?grant_type=refresh_token", { method: "POST", headers: { apikey: cfg.anonKey, "Content-Type": "application/json" }, body: JSON.stringify({ refresh_token: session.refresh_token }) });
          if (!r.ok) throw new Error("refresh failed");
          setSession(await r.json());
        } catch (e) { setSession(null); }
        refreshing = null;
      })();
    }
    await refreshing;
    return session;
  }
  const signOut = () => setSession(null);
  const user = () => (session && session.user) || null;

  // ---- tournament (one row, id 1, with a JSON blob) ----
  async function getTournament() {
    const rows = await req("/rest/v1/tournament?id=eq.1&select=data,updated_at", { headers: { Accept: "application/json" } });
    return rows[0] || null;
  }
  async function saveTournament(data) {
    await ensureFresh();
    return req("/rest/v1/tournament", {
      method: "POST", headers: { "Content-Type": "application/json", Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({ id: 1, data, updated_at: new Date().toISOString() })
    });
  }

  // ---- showcase betting pool (settings in tournament row 2, bets in the bets table) ----
  const POOL = 2;
  async function getPool() {
    const rows = await req("/rest/v1/tournament?id=eq." + POOL + "&select=data,updated_at", { headers: { Accept: "application/json" } });
    return rows[0] || null;
  }
  async function savePool(data) {
    await ensureFresh();
    return req("/rest/v1/tournament", {
      method: "POST", headers: { "Content-Type": "application/json", Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({ id: POOL, data, updated_at: new Date().toISOString() })
    });
  }
  const listBets = () => req("/rest/v1/bets?pool=eq." + POOL + "&select=id,name,team,amount,device,created_at&order=created_at.desc&limit=1000", { headers: { Accept: "application/json" } });
  const addBet = row => req("/rest/v1/bets", { method: "POST", headers: { "Content-Type": "application/json", Prefer: "return=representation" }, body: JSON.stringify(Object.assign({ pool: POOL }, row)) });
  async function deleteBet(id) { await ensureFresh(); return req("/rest/v1/bets?id=eq." + id, { method: "DELETE" }); }
  // Parimutuel math. Winners split the whole pool in proportion to their stake; if nobody backed the winner, everyone is refunded.
  function pari(bets) {
    const t = { a: 0, b: 0, na: 0, nb: 0 };
    (bets || []).forEach(x => { if (x.team === "a") { t.a += x.amount; t.na++; } else if (x.team === "b") { t.b += x.amount; t.nb++; } });
    t.total = t.a + t.b;
    t.oddsA = t.a ? t.total / t.a : null; t.oddsB = t.b ? t.total / t.b : null; // "pays X for 1"
    t.payout = (bet, winner) => { const side = t[winner] || 0; if (bet.team !== winner) return 0; return side ? bet.amount * t.total / side : bet.amount; };
    return t;
  }

  // ---- photos ----
  const listPhotos = () => req("/rest/v1/photos?select=id,path,thumb,caption,uploader,created_at,w,h&order=created_at.desc&limit=500", { headers: { Accept: "application/json" } });
  const publicUrl = p => cfg.url + "/storage/v1/object/public/gallery/" + p;
  const uploadBlob = (path, blob) => req("/storage/v1/object/gallery/" + path, { method: "POST", headers: { "Content-Type": blob.type, "x-upsert": "false" }, body: blob });
  const addPhoto = row => req("/rest/v1/photos", { method: "POST", headers: { "Content-Type": "application/json", Prefer: "return=representation" }, body: JSON.stringify(row) });
  async function deletePhoto(row) {
    await ensureFresh();
    await req("/storage/v1/object/gallery", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prefixes: [row.path, row.thumb] }) });
    await req("/rest/v1/photos?id=eq." + row.id, { method: "DELETE" });
  }

  return { ready, cfg, signIn, signOut, ensureFresh, user, getTournament, saveTournament, getPool, savePool, listBets, addBet, deleteBet, pari, listPhotos, publicUrl, uploadBlob, addPhoto, deletePhoto };
})();
