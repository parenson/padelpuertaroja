// Organizer admin page: build the tournament (teams, pools, scores, knockout) and moderate the gallery.
(function () {
  const B = window.Backend, D = window.PPR;
  const $ = s => document.querySelector(s);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const uid = () => Math.random().toString(36).slice(2, 8);
  const last = n => n.trim().split(/\s+/).pop();
  const people = [...(D.players || []), ...(D.pros || [])].map(p => p.name);

  // ---------- state ----------
  const blankKO = () => ({ semis: [{}, {}], final: {}, third: {}, csemis: [{}, {}], cfinal: {} });
  let S = { teams: [], npools: 2, matches: [], ko: blankKO(), note: "" };
  const team = id => S.teams.find(t => t.id === id);
  const tname = id => (team(id) || {}).name || "TBD";
  const poolNames = ["A", "B", "C", "D"];

  function standings(p) {
    const rows = S.teams.filter(t => t.pool === p).map(t => ({ id: t.id, name: t.name, W: 0, L: 0, GF: 0, GA: 0 }));
    const by = Object.fromEntries(rows.map(r => [r.id, r]));
    S.matches.filter(m => m.pool === p && m.sa != null && m.sb != null).forEach(m => {
      const a = by[m.a], b = by[m.b]; if (!a || !b) return;
      a.GF += m.sa; a.GA += m.sb; b.GF += m.sb; b.GA += m.sa;
      if (m.sa > m.sb) { a.W++; b.L++; } else if (m.sb > m.sa) { b.W++; a.L++; }
    });
    return rows.sort((x, y) => y.W - x.W || (y.GF - y.GA) - (x.GF - x.GA) || y.GF - x.GF || x.name.localeCompare(y.name));
  }
  const tableRows = st => st.map(r => `<tr><td>${esc(r.name)}</td><td class="n">${r.W}</td><td class="n">${r.L}</td><td class="n">${r.GF - r.GA > 0 ? "+" : ""}${r.GF - r.GA}</td></tr>`).join("");

  // ---------- teams ----------
  function fillPeople() {
    [$("#p1"), $("#p2")].forEach(sel => { sel.innerHTML = '<option value="">—</option>' + people.map(n => `<option>${esc(n)}</option>`).join(""); });
  }
  function renderTeams() {
    const wrap = $("#teams"); wrap.innerHTML = "";
    if (!S.teams.length) { wrap.innerHTML = '<p class="hint">No teams yet.</p>'; return; }
    S.teams.forEach(t => {
      const d = document.createElement("div"); d.className = "team";
      d.innerHTML = `<input type="text" value="${esc(t.name)}" aria-label="Team name">
        <select aria-label="Pool">${poolNames.slice(0, S.npools).map(p => `<option ${t.pool === p ? "selected" : ""}>${p}</option>`).join("")}</select>
        <button class="btn small quiet">Remove</button>`;
      d.querySelector("input").addEventListener("change", e => { t.name = e.target.value.trim() || t.name; renderAll(); });
      d.querySelector("select").addEventListener("change", e => { t.pool = e.target.value; });
      d.querySelector("button").addEventListener("click", () => { S.teams = S.teams.filter(x => x !== t); S.matches = S.matches.filter(m => m.a !== t.id && m.b !== t.id); renderAll(); });
      wrap.appendChild(d);
    });
  }
  $("#addteam").addEventListener("click", () => {
    const a = $("#p1").value, b = $("#p2").value, typed = $("#tname").value.trim();
    const name = typed || (a && b ? `${last(a)} / ${last(b)}` : a || b);
    if (!name) return;
    S.teams.push({ id: uid(), name, players: typed ? [] : [a, b].filter(Boolean), pool: poolNames[S.teams.length % S.npools] });
    $("#p1").value = ""; $("#p2").value = ""; $("#tname").value = "";
    renderAll();
  });
  $("#npools").addEventListener("change", e => { S.npools = +e.target.value; S.teams.forEach(t => { if (!poolNames.slice(0, S.npools).includes(t.pool)) t.pool = "A"; }); renderAll(); });

  // ---------- matches ----------
  $("#genmatches").addEventListener("click", () => {
    const keep = S.matches;
    S.matches = [];
    poolNames.slice(0, S.npools).forEach(p => {
      const ts = S.teams.filter(t => t.pool === p);
      for (let i = 0; i < ts.length; i++) for (let j = i + 1; j < ts.length; j++) {
        const old = keep.find(m => (m.a === ts[i].id && m.b === ts[j].id) || (m.a === ts[j].id && m.b === ts[i].id));
        S.matches.push(old ? Object.assign({}, old, { pool: p }) : { id: uid(), pool: p, a: ts[i].id, b: ts[j].id, sa: null, sb: null });
      }
    });
    renderAll();
  });
  function renderPools() {
    const wrap = $("#pools"); wrap.innerHTML = "";
    if (!S.matches.length) { wrap.innerHTML = '<p class="hint">Generate pool matches first.</p>'; return; }
    poolNames.slice(0, S.npools).forEach(p => {
      const ms = S.matches.filter(m => m.pool === p); if (!ms.length) return;
      const sec = document.createElement("div"); sec.style.marginBottom = "16px"; sec.dataset.pool = p;
      sec.innerHTML = `<h3>Pool ${p}</h3>
        <table><thead><tr><th>Team</th><th class="n">W</th><th class="n">L</th><th class="n">+/−</th></tr></thead><tbody>${tableRows(standings(p))}</tbody></table>
        <div class="list" style="margin-top:8px"></div>`;
      const list = sec.querySelector(".list");
      ms.forEach(m => {
        const d = document.createElement("div"); d.className = "match";
        d.innerHTML = `<span class="a">${esc(tname(m.a))}</span><input type="number" min="0" max="99" inputmode="numeric" value="${m.sa ?? ""}" aria-label="Score"><span class="vs">vs</span><input type="number" min="0" max="99" inputmode="numeric" value="${m.sb ?? ""}" aria-label="Score"><span>${esc(tname(m.b))}</span>`;
        const [ia, ib] = d.querySelectorAll("input");
        const upd = () => { m.sa = ia.value === "" ? null : +ia.value; m.sb = ib.value === "" ? null : +ib.value; refreshStandings(); };
        ia.addEventListener("input", upd); ib.addEventListener("input", upd);
        list.appendChild(d);
      });
      wrap.appendChild(sec);
    });
  }
  function refreshStandings() { // keeps focus in the score inputs
    document.querySelectorAll("#pools [data-pool]").forEach(sec => { sec.querySelector("tbody").innerHTML = tableRows(standings(sec.dataset.pool)); });
    renderKO();
  }

  // ---------- knockout ----------
  // Championship: top two of each pool → semifinals → final, semifinal losers → 3rd place.
  // Consolation: bottom two of each pool → consolation semifinals → consolation final.
  const winner = m => (m.sa != null && m.sb != null && m.sa !== m.sb) ? (m.sa > m.sb ? m.a : m.b) : null;
  const loser = m => { const w = winner(m); return w ? (w === m.a ? m.b : m.a) : null; };
  const scored = m => m.sa != null || m.sb != null;
  const poolPlayDone = () => S.matches.length > 0 && S.matches.every(m => m.sa != null && m.sb != null);

  // Fills a match slot from the standings or an earlier result, unless the organizer picked the team by hand.
  function fill(m, side, id) {
    if (m[side + "Manual"]) return;
    if (scored(m) && m[side]) return;          // never move a team out of a match that already has a score
    m[side] = id || "";
  }
  function autoSeed() {
    const k = S.ko, st = poolNames.slice(0, S.npools).map(standings);
    const at = (p, i) => (st[p] && st[p][i] ? st[p][i].id : "");
    if (poolPlayDone()) {
      if (S.npools >= 2) {
        fill(k.semis[0], "a", at(0, 0)); fill(k.semis[0], "b", at(1, 1)); fill(k.semis[1], "a", at(1, 0)); fill(k.semis[1], "b", at(0, 1));
        fill(k.csemis[0], "a", at(0, 2)); fill(k.csemis[0], "b", at(1, 3)); fill(k.csemis[1], "a", at(1, 2)); fill(k.csemis[1], "b", at(0, 3));
      } else {
        fill(k.semis[0], "a", at(0, 0)); fill(k.semis[0], "b", at(0, 3)); fill(k.semis[1], "a", at(0, 1)); fill(k.semis[1], "b", at(0, 2));
        fill(k.csemis[0], "a", at(0, 4)); fill(k.csemis[0], "b", at(0, 7)); fill(k.csemis[1], "a", at(0, 5)); fill(k.csemis[1], "b", at(0, 6));
      }
    } else {
      [...k.semis, ...k.csemis].forEach(m => { fill(m, "a", ""); fill(m, "b", ""); });
    }
    fill(k.final, "a", winner(k.semis[0])); fill(k.final, "b", winner(k.semis[1]));
    fill(k.third, "a", loser(k.semis[0])); fill(k.third, "b", loser(k.semis[1]));
    fill(k.cfinal, "a", winner(k.csemis[0])); fill(k.cfinal, "b", winner(k.csemis[1]));
  }
  function resultLines() {
    const k = S.ko, c = winner(k.final), t = winner(k.third), cw = winner(k.cfinal);
    const out = [];
    if (c) out.push(`🏆 <strong>Champions: ${esc(tname(c))}</strong> · Runners-up: ${esc(tname(loser(k.final)))}`);
    if (t) out.push(`🥉 3rd place: ${esc(tname(t))}`);
    if (cw) out.push(`Consolation winners: ${esc(tname(cw))}`);
    if (!out.length) out.push('<span class="hint">Champion appears once the final has a score.</span>');
    if (!poolPlayDone()) out.unshift('<span class="hint">Semifinal teams fill in automatically once every pool match has a score. Pick teams by hand any time.</span>');
    return out.join("<br>");
  }
  const KO_BLOCKS = () => [
    ["Semifinal 1", S.ko.semis[0]], ["Semifinal 2", S.ko.semis[1]], ["Final", S.ko.final], ["3rd place match", S.ko.third],
    ["Consolation semifinal 1", S.ko.csemis[0]], ["Consolation semifinal 2", S.ko.csemis[1]], ["Consolation final", S.ko.cfinal]
  ];
  function renderKO() {
    autoSeed();
    const wrap = $("#ko"); wrap.innerHTML = "";
    const opts = v => '<option value="">—</option>' + S.teams.map(t => `<option value="${t.id}" ${t.id === v ? "selected" : ""}>${esc(t.name)}</option>`).join("");
    KO_BLOCKS().forEach(([title, m], i) => {
      const d = document.createElement("div"); d.className = "m"; d.dataset.ko = i;
      if (i === 4) { const h = document.createElement("h3"); h.textContent = "Consolation bracket"; h.style.marginTop = "6px"; wrap.appendChild(h); }
      d.innerHTML = `<h3>${title}</h3>
        <div class="sel"><select aria-label="Team">${opts(m.a)}</select><input type="number" min="0" max="99" inputmode="numeric" value="${m.sa ?? ""}" aria-label="Score"></div>
        <div class="sel"><select aria-label="Team">${opts(m.b)}</select><input type="number" min="0" max="99" inputmode="numeric" value="${m.sb ?? ""}" aria-label="Score"></div>`;
      const [sa, sb] = d.querySelectorAll("select"), [ia, ib] = d.querySelectorAll("input");
      sa.addEventListener("change", () => { m.a = sa.value; m.aManual = !!sa.value; syncKO(); });
      sb.addEventListener("change", () => { m.b = sb.value; m.bManual = !!sb.value; syncKO(); });
      ia.addEventListener("input", () => { m.sa = ia.value === "" ? null : +ia.value; syncKO(); });
      ib.addEventListener("input", () => { m.sb = ib.value === "" ? null : +ib.value; syncKO(); });
      wrap.appendChild(d);
    });
    const c = document.createElement("p"); c.id = "champ"; c.innerHTML = resultLines();
    wrap.appendChild(c);
  }
  function syncKO() { // re-derive later rounds and update the selects without re-rendering (keeps focus in the inputs)
    autoSeed();
    KO_BLOCKS().forEach(([, m], i) => {
      const d = document.querySelector(`#ko [data-ko="${i}"]`); if (!d) return;
      const [sa, sb] = d.querySelectorAll("select"); sa.value = m.a || ""; sb.value = m.b || "";
    });
    $("#champ").innerHTML = resultLines();
  }

  function renderAll() { renderTeams(); renderPools(); renderKO(); $("#npools").value = S.npools; $("#tnote").value = S.note || ""; }

  // ---------- load / save ----------
  async function load() {
    const st = $("#save-status"); st.className = "status"; st.textContent = "Loading…";
    try {
      const row = await B.getTournament();
      if (row && row.data && row.data.teams) {
        S = Object.assign({ npools: 2, matches: [], note: "" }, row.data);
        S.ko = Object.assign(blankKO(), S.ko || {}); // older published brackets have no 3rd place or consolation yet
      }
      renderAll();
      st.textContent = row && row.data && row.data.teams ? "Last published " + new Date(row.updated_at).toLocaleString() : "Nothing published yet.";
    } catch (e) { st.className = "status err"; st.textContent = "Could not load: " + e.message; }
    loadPhotos();
  }
  $("#save").addEventListener("click", async () => {
    S.note = $("#tnote").value.trim();
    const st = $("#save-status"); st.className = "status"; st.textContent = "Publishing…";
    try { await B.saveTournament(S); st.className = "status ok"; st.textContent = "Published " + new Date().toLocaleTimeString() + ". Players see it within a minute."; }
    catch (e) { st.className = "status err"; st.textContent = "Not saved: " + e.message + (/JWT|token|auth|row-level/i.test(e.message) ? " Try signing out and back in." : ""); }
  });
  $("#reload").addEventListener("click", load);

  // ---------- photos ----------
  async function loadPhotos() {
    const wrap = $("#photos"), st = $("#photo-status");
    try {
      const rows = await B.listPhotos(); wrap.innerHTML = "";
      if (!rows.length) { st.textContent = "No photos yet."; return; }
      st.textContent = rows.length + " photo" + (rows.length === 1 ? "" : "s");
      rows.forEach(r => {
        const f = document.createElement("figure");
        f.innerHTML = `<img src="${esc(B.publicUrl(r.thumb))}" alt=""><figcaption>${esc(r.uploader || "—")}${r.caption ? " · " + esc(r.caption) : ""}</figcaption><button class="btn small quiet">Remove</button>`;
        f.querySelector("button").addEventListener("click", async e => {
          if (!confirm("Remove this photo from the gallery?")) return;
          e.target.disabled = true;
          try { await B.deletePhoto(r); f.remove(); } catch (err) { e.target.disabled = false; st.textContent = "Could not remove: " + err.message; }
        });
        wrap.appendChild(f);
      });
    } catch (e) { st.textContent = "Could not load photos: " + e.message; }
  }

  // ---------- auth ----------
  function showApp(on) {
    $("#login").hidden = on; $("#app").hidden = !on;
    const u = B.user();
    $("#who").innerHTML = on && u ? `${esc(u.email)} <button class="btn small quiet" id="signout">Sign out</button>` : "";
    if (on) { $("#signout").addEventListener("click", () => { B.signOut(); showApp(false); }); load(); }
  }
  $("#signin").addEventListener("click", async () => {
    const st = $("#login-status"); st.className = "status"; st.textContent = "Signing in…";
    try { await B.signIn($("#email").value.trim(), $("#password").value); st.textContent = ""; showApp(true); }
    catch (e) { st.className = "status err"; st.textContent = "Sign in failed: " + e.message; }
  });
  $("#password").addEventListener("keydown", e => { if (e.key === "Enter") $("#signin").click(); });

  fillPeople();
  if (!B.ready()) { $("#login-status").className = "status err"; $("#login-status").textContent = "Backend not configured yet (config.js)."; }
  else B.ensureFresh().then(s => showApp(!!s));
})();
