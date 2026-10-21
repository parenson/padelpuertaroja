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
  async function ensureFresh() {
    if (!session) return null;
    if (session.expires_at - 60 > Date.now() / 1000) return session;
    try {
      const r = await fetch(cfg.url + "/auth/v1/token?grant_type=refresh_token", { method: "POST", headers: { apikey: cfg.anonKey, "Content-Type": "application/json" }, body: JSON.stringify({ refresh_token: session.refresh_token }) });
      if (!r.ok) throw new Error("refresh failed");
      setSession(await r.json());
    } catch (e) { setSession(null); }
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

  return { ready, cfg, signIn, signOut, ensureFresh, user, getTournament, saveTournament, listPhotos, publicUrl, uploadBlob, addPhoto, deletePhoto };
})();
