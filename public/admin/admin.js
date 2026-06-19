/* ============================================================
   SAWARIYA SOLUTION — Admin CMS engine
   Schema-driven CRUD over the Laravel REST API (token auth).
   Lists  -> /api/collections/{collection}
   Singles -> /api/singletons/{key}
   Uploads -> /api/uploads
   ============================================================ */
(function () {
  const D = window.SS_DATA;
  const isImgField = (key) => /^(image|logo|avatar|photo)$/i.test(key);
  // resolve a stored image path for preview inside /admin/ (paths are root-relative)
  const previewSrc = (v) => { v = (v || "").trim(); return !v ? "" : /^(https?:|data:|\.\.\/)/.test(v) ? v : "../" + v.replace(/^\/+/, ""); };
  const ICONS = ["browser", "layers", "phone", "cloud", "megaphone", "compass", "sparkle", "briefcase", "check", "star"];
  const SOCIAL_ICONS = ["facebook", "instagram", "linkedin", "youtube", "whatsapp"];

  /* ---------- API layer ----------
     The REST API lives on the Laravel server (:8000). When the admin is opened
     from a static dev server (e.g. VS Code Live Server on :3000) there is no API
     on that origin, so we call :8000 directly (CORS is allowed). When Laravel
     serves the admin itself (production, or :8000) we use a same-origin path. */
  const isStaticDev =
    (location.hostname === "localhost" || location.hostname === "127.0.0.1") &&
    location.port && location.port !== "8000";
  const API = isStaticDev ? location.protocol + "//" + location.hostname + ":8000/api" : "/api";
  let token = localStorage.getItem("ss_cms_token") || "";
  let store = {}; // in-memory cache of all collections + singletons

  async function api(method, path, body, isForm) {
    const opt = { method, headers: { Accept: "application/json" } };
    if (token) opt.headers.Authorization = "Bearer " + token;
    if (body !== undefined) {
      if (isForm) { opt.body = body; }
      else { opt.headers["Content-Type"] = "application/json"; opt.body = JSON.stringify(body); }
    }
    const res = await fetch(API + path, opt);
    if (res.status === 401) { token = ""; localStorage.removeItem("ss_cms_token"); showLogin(); throw new Error("Session expired — please sign in again."); }
    const data = res.status === 204 ? null : await res.json().catch(() => null);
    if (!res.ok) throw new Error((data && data.message) || ("Request failed (" + res.status + ")"));
    return data;
  }

  const LISTS = ["banner", "services", "products", "projects", "testimonials", "blogs", "jobs", "milestones", "social", "clients", "partners"];
  const SINGLES = ["settings", "contact", "footer"];

  async function loadAll() {
    const [lists, singles] = await Promise.all([
      Promise.all(LISTS.map((k) => api("GET", "/collections/" + k))),
      Promise.all(SINGLES.map((k) => api("GET", "/singletons/" + k))),
    ]);
    store = {};
    LISTS.forEach((k, i) => (store[k] = lists[i] || []));
    SINGLES.forEach((k, i) => (store[k] = singles[i] || {}));
  }

  /* ---------- Schemas ---------- */
  const f = (key, label, opts = {}) => Object.assign({ key, label, type: "text" }, opts);
  const ENT = {
    banner: { label: "Hero banner slides", icon: "sparkle", row: (x) => ({ title: (x.title || "").replace(/<[^>]+>/g, ""), badge: "Slide", sub: x.eyebrow }),
      fields: [f("image", "Background image (path or URL)", { placeholder: "images/banner/slide.jpg" }), f("eyebrow", "Eyebrow / kicker"), f("title", "Headline (HTML allowed)", { type: "textarea" }), f("lead", "Sub-text", { type: "textarea" }), f("ctaPrimaryLabel", "Primary button label"), f("ctaPrimaryHref", "Primary button link"), f("ctaSecondaryLabel", "Secondary button label"), f("ctaSecondaryHref", "Secondary button link")] },
    services: { label: "Services", icon: "layers", row: (x) => ({ title: x.title, sub: x.short }),
      fields: [f("title", "Title"), f("icon", "Icon", { type: "select", options: ICONS }), f("image", "Image (path or URL)", { placeholder: "images/services/x.jpg" }), f("short", "Short summary", { type: "textarea" }), f("full", "Full description", { type: "textarea" })] },
    products: { label: "Products", icon: "briefcase", row: (x) => ({ title: x.title, badge: x.category, sub: x.short }),
      fields: [f("title", "Title"), f("category", "Category"), f("image", "Image (path or URL)", { placeholder: "images/products/x.jpg" }), f("short", "Short summary", { type: "textarea" }), f("tag", "Ribbon tag (optional)"), f("color", "Accent colour", { placeholder: "#1C3FBF" })] },
    projects: { label: "Portfolio", icon: "compass", row: (x) => ({ title: x.title, badge: x.category, sub: x.short }),
      fields: [f("title", "Project title"), f("category", "Industry"), f("client", "Client"), f("image", "Image (path or URL)", { placeholder: "images/portfolio/x.jpg" }), f("short", "Description", { type: "textarea" }), f("tags", "Tags (comma separated)", { tags: true })] },
    testimonials: { label: "Testimonials", icon: "star", row: (x) => ({ title: x.name, badge: x.rating + "★", sub: x.quote }),
      fields: [f("name", "Name"), f("role", "Role"), f("company", "Company"), f("quote", "Quote", { type: "textarea" }), f("rating", "Rating (1–5)", { type: "number" }), f("avatar", "Photo (path or URL)", { placeholder: "images/people/person.jpg" })] },
    blogs: { label: "Blog posts", icon: "mail", row: (x) => ({ title: x.title, badge: x.category, sub: x.excerpt }),
      fields: [f("title", "Title"), f("category", "Category"), f("author", "Author"), f("date", "Date", { type: "date" }), f("read", "Read time", { placeholder: "5 min" }), f("image", "Image (path or URL)", { placeholder: "images/blog/x.jpg" }), f("excerpt", "Excerpt", { type: "textarea" })] },
    jobs: { label: "Job openings", icon: "briefcase", row: (x) => ({ title: x.title, badge: x.department, sub: x.location }),
      fields: [f("title", "Role title"), f("department", "Department"), f("location", "Location"), f("type", "Type"), f("exp", "Experience"), f("short", "Summary", { type: "textarea" })] },
    milestones: { label: "Milestones", icon: "sparkle", row: (x) => ({ title: x.value + (x.suffix || ""), sub: x.label }),
      fields: [f("value", "Number", { type: "number" }), f("suffix", "Suffix", { placeholder: "+" }), f("label", "Label")] },
    social: { label: "Social links", icon: "instagram", row: (x) => ({ title: x.platform, sub: x.url }),
      fields: [f("platform", "Platform"), f("url", "URL"), f("icon", "Icon", { type: "select", options: SOCIAL_ICONS })] },
    clients: { label: "Client logos", icon: "check", row: (x) => ({ title: x.name, sub: x.logo }),
      fields: [f("name", "Client name"), f("logo", "Image (path or URL)", { placeholder: "images/portfolio/client.jpg" })] },
    partners: { label: "Partner logos", icon: "check", row: (x) => ({ title: x.name, sub: x.logo }),
      fields: [f("name", "Partner name"), f("logo", "Logo image (path or URL)", { placeholder: "images/partners/logo.svg" }), f("url", "Website URL")] },
    settings: { label: "Settings & SEO", icon: "compass", single: true,
      fields: [f("siteName", "Site name"), f("tagline", "Tagline"), f("short", "Logo wordmark"), f("sub", "Logo sub-text"), f("seoTitle", "SEO title"), f("seoDescription", "SEO description", { type: "textarea" }), f("keywords", "SEO keywords", { type: "textarea" })] },
    contact: { label: "Contact info", icon: "phoneCall", single: true,
      fields: [f("phone1", "Phone 1"), f("phone2", "Phone 2"), f("email1", "Email 1"), f("email2", "Email 2"), f("address", "Address", { type: "textarea" }), f("hours", "Office hours")] },
    footer: { label: "Footer", icon: "browser", single: true,
      fields: [f("description", "Footer description", { type: "textarea" }), f("copyright", "Copyright line"), f("legal", "Legal links (comma separated)")] },
  };
  const GROUPS = [
    ["Overview", [["dashboard", "Dashboard", "browser"]]],
    ["Content", ["banner", "services", "products", "projects", "testimonials", "blogs", "jobs"].map((k) => [k, ENT[k].label, ENT[k].icon])],
    ["Brand", ["clients", "partners", "milestones"].map((k) => [k, ENT[k].label, ENT[k].icon])],
    ["Site", ["settings", "contact", "social", "footer"].map((k) => [k, ENT[k].label, ENT[k].icon])],
  ];

  /* ---------- DOM refs ---------- */
  const $ = (id) => document.getElementById(id);
  let route = "dashboard";

  /* ---------- Auth / shell ---------- */
  function showLogin() { $("loginWrap").style.display = "grid"; $("shell").style.display = "none"; }
  async function enter(startRoute) {
    $("loginWrap").style.display = "none";
    $("shell").style.display = "flex";
    buildSidebar();
    $("view").innerHTML = `<div class="empty">${SS.icon("layers")}<p>Loading content…</p></div>`;
    await loadAll();
    go(startRoute && (startRoute === "dashboard" || ENT[startRoute]) ? startRoute : "dashboard");
  }

  async function login(username, password) {
    const res = await fetch(API + "/login", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ username, password }) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || "Login failed");
    token = data.token;
    localStorage.setItem("ss_cms_token", token);
    return data.user;
  }

  /* ---------- Sidebar ---------- */
  function buildSidebar() {
    const sb = document.querySelector(".side-brand");
    if (sb) sb.innerHTML = `${SS.logo("logo-side on-dark")}<span class="side-cms">CMS</span>`;
    $("sideNav").innerHTML = GROUPS.map(([grp, items]) =>
      `<div class="grp">${grp}</div>` + items.map(([k, label, icon]) =>
        `<a data-route="${k}" class="${k === route ? "active" : ""}">${SS.icon(icon)}<span>${label}</span></a>`).join("")
    ).join("");
    $("logoutBtn").innerHTML = SS.icon("logout") + "<span>Sign out</span>";
  }

  /* ---------- Router ---------- */
  function go(r) {
    route = r;
    document.querySelectorAll("#sideNav a").forEach((a) => a.classList.toggle("active", a.dataset.route === r));
    closeSidebar();
    if (r === "dashboard") return renderDashboard();
    const cfg = ENT[r];
    if (!cfg) return renderDashboard();
    $("viewTitle").textContent = cfg.label;
    $("viewSub").textContent = cfg.single ? "Edit your " + cfg.label.toLowerCase() : "Add, edit, or remove items";
    cfg.single ? renderSingle(r) : renderList(r);
  }

  /* ---------- Dashboard ---------- */
  function renderDashboard() {
    $("viewTitle").textContent = "Dashboard";
    $("viewSub").textContent = "Overview of your site content";
    const len = (k) => (store[k] || []).length;
    const kpis = [["services", "layers"], ["products", "briefcase"], ["projects", "grid"], ["blogs", "mail"]];
    const collections = ["banner", "services", "products", "projects", "testimonials", "blogs", "jobs", "clients", "partners", "milestones", "social"];
    const qa = [["banner", "sparkle", "Edit hero banner", "Manage rotating slides & buttons"], ["services", "layers", "Add a service", "Create a new service card"], ["blogs", "mail", "Publish a blog post", "Write & list a new article"], ["contact", "phoneCall", "Update contact details", "Phone, email & address"]];
    $("view").innerHTML = `
      <div class="kpi-grid">
        ${kpis.map(([k, ic]) => `<div class="kpi"><div class="ic">${SS.icon(ic)}</div><div class="kmeta"><div class="n">${len(k)}</div><div class="l">${ENT[k].label}</div></div></div>`).join("")}
      </div>
      <div class="two-col">
        <div class="panel">
          <div class="panel-head"><h3>All collections</h3><span class="badge">${collections.length} types</span></div>
          <table class="atable atable-rows">
            <thead><tr><th>Collection</th><th>Items</th><th></th></tr></thead>
            <tbody>${collections.map((k) => `<tr data-route="${k}"><td class="t-title">${ENT[k].label}</td><td><span class="count-pill">${len(k)}</span></td><td class="row-actions"><span class="icon-btn">${SS.icon("arrow")}</span></td></tr>`).join("")}</tbody>
          </table>
        </div>
        <div class="panel">
          <div class="panel-head"><h3>Quick actions</h3></div>
          <div class="panel-body" style="padding:.6rem">
            ${qa.map(([r, ic, t, sub]) => `<button class="qa-row" data-route="${r}"><span class="qa-ic">${SS.icon(ic)}</span><span class="qa-txt"><b>${t}</b><span>${sub}</span></span><span class="qa-arr">${SS.icon("arrow")}</span></button>`).join("")}
          </div>
        </div>
      </div>`;
  }

  /* ---------- List view ---------- */
  function renderList(key) {
    const cfg = ENT[key], arr = store[key] || [];
    $("view").innerHTML = `
      <div class="view-head">
        <div><h3 style="font-size:1.3rem">${cfg.label}</h3><p class="muted">${arr.length} item${arr.length === 1 ? "" : "s"}</p></div>
        <button class="btn btn-peacock" id="addBtn">${SS.icon("plus")} Add ${cfg.label.replace(/s$/, "").toLowerCase()}</button>
      </div>
      <div class="panel">
        ${arr.length ? `<table class="atable"><thead><tr><th>Item</th><th>Detail</th><th style="text-align:right">Actions</th></tr></thead>
          <tbody>${arr.map((it) => { const r = cfg.row(it); return `<tr>
            <td><div class="t-title">${r.title || "(untitled)"}</div>${r.badge ? `<span class="badge" style="margin-top:.3rem">${r.badge}</span>` : ""}</td>
            <td><div class="t-sub">${r.sub || ""}</div></td>
            <td class="row-actions"><button class="icon-btn" data-edit="${it.id}" title="Edit">${SS.icon("edit")}</button><button class="icon-btn danger" data-del="${it.id}" title="Delete">${SS.icon("trash")}</button></td>
          </tr>`; }).join("")}</tbody></table>`
        : `<div class="empty">${SS.icon("layers")}<p>No items yet. Click “Add” to create the first one.</p></div>`}
      </div>`;
    $("addBtn").onclick = () => openForm(key, null);
    $("view").querySelectorAll("[data-edit]").forEach((b) => (b.onclick = () => openForm(key, +b.dataset.edit)));
    $("view").querySelectorAll("[data-del]").forEach((b) => (b.onclick = async () => {
      const id = +b.dataset.del, item = arr.find((x) => x.id === id);
      if (!confirm(`Delete “${cfg.row(item).title}”? This can't be undone.`)) return;
      try { await api("DELETE", "/collections/" + key + "/" + id); store[key] = arr.filter((x) => x.id !== id); renderList(key); SS.toast("Deleted"); }
      catch (e) { SS.toast(e.message); }
    }));
  }

  /* ---------- Single (form) view ---------- */
  function renderSingle(key) {
    const cfg = ENT[key], obj = store[key] || {};
    $("view").innerHTML = `
      <div class="panel form-panel">
        <div class="panel-head"><h3>${cfg.label}</h3><span class="badge">Live content</span></div>
        <div class="panel-body"><form id="singleForm">${cfg.fields.map((fl) => fieldHTML(fl, obj[fl.key])).join("")}
          <button class="btn btn-peacock btn-lg" type="submit" style="margin-top:.4rem">Save changes</button></form></div>
      </div>`;
    $("singleForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const merged = Object.assign({}, obj, collect(cfg));
      delete merged.id;
      try { store[key] = await api("PUT", "/singletons/" + key, merged); SS.toast(cfg.label + " saved"); }
      catch (err) { SS.toast(err.message); }
    });
  }

  /* ---------- Field rendering ---------- */
  function fieldHTML(fl, val) {
    val = val == null ? "" : Array.isArray(val) ? val.join(", ") : val;
    const id = "fld-" + fl.key;
    const img = isImgField(fl.key);
    let input;
    if (fl.type === "textarea") input = `<textarea id="${id}">${esc(val)}</textarea>`;
    else if (fl.type === "select") input = `<select id="${id}">${fl.options.map((o) => `<option${o === val ? " selected" : ""}>${o}</option>`).join("")}</select>`;
    else input = `<input id="${id}" type="${fl.type === "number" ? "number" : fl.type === "date" ? "date" : "text"}" value="${esc(val)}"${fl.placeholder ? ` placeholder="${fl.placeholder}"` : ""}${img ? ` data-pv="${id}-pv"` : ""}>`;
    if (img) {
      const src = previewSrc(val);
      input = `<div class="img-field">${input}
        <button type="button" class="img-up" data-up="${id}">${SS.icon("plus")}<span>Upload</span></button>
        <span class="img-thumb">${SS.icon("grid")}<img id="${id}-pv" alt="" src="${esc(src)}"${src ? "" : ' style="display:none"'} onload="this.style.display='block'" onerror="this.style.display='none'"></span></div>`;
    }
    return `<div class="field"><label for="${id}">${fl.label}</label>${input}</div>`;
  }
  function collect(cfg) {
    const obj = {};
    cfg.fields.forEach((fl) => {
      let v = $("fld-" + fl.key).value;
      if (fl.type === "number") v = +v || 0;
      if (fl.tags) v = v.split(",").map((s) => s.trim()).filter(Boolean);
      obj[fl.key] = v;
    });
    return obj;
  }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  /* ---------- CRUD modal ---------- */
  let formCtx = null;
  function openForm(key, id) {
    const cfg = ENT[key];
    const isNew = id == null;
    const item = isNew ? {} : (store[key] || []).find((x) => x.id === id) || {};
    formCtx = { key, id };
    $("formKicker").textContent = isNew ? "Add" : "Edit";
    $("formTitle").textContent = (isNew ? "New " : "Edit ") + cfg.label.replace(/s$/, "").toLowerCase();
    $("formFields").innerHTML = cfg.fields.map((fl) => fieldHTML(fl, item[fl.key])).join("");
    $("formModal").classList.add("open"); document.body.style.overflow = "hidden";
  }
  function closeForm() { $("formModal").classList.remove("open"); document.body.style.overflow = ""; formCtx = null; }
  async function submitForm() {
    if (!formCtx) return;
    const { key, id } = formCtx, cfg = ENT[key], fields = collect(cfg);
    try {
      if (id == null) {
        const item = await api("POST", "/collections/" + key, fields);
        store[key] = (store[key] || []).concat(item);
      } else {
        const existing = (store[key] || []).find((x) => x.id === id) || {};
        const merged = Object.assign({}, existing, fields);
        delete merged.id;
        const item = await api("PUT", "/collections/" + key + "/" + id, merged);
        const idx = store[key].findIndex((x) => x.id === id);
        if (idx >= 0) store[key][idx] = item;
      }
      closeForm(); SS.toast("Saved"); renderList(key);
    } catch (e) { SS.toast(e.message); }
  }

  /* ---------- Image upload ---------- */
  function pickAndUpload(inputId, btn) {
    const fi = document.createElement("input");
    fi.type = "file"; fi.accept = "image/*";
    fi.onchange = async () => {
      const file = fi.files && fi.files[0];
      if (!file) return;
      const fd = new FormData(); fd.append("file", file);
      const label = btn.querySelector("span");
      const old = label ? label.textContent : "";
      if (label) label.textContent = "Uploading…";
      try {
        const r = await api("POST", "/uploads", fd, true);
        const inp = document.getElementById(inputId);
        inp.value = r.path;
        inp.dispatchEvent(new Event("input", { bubbles: true }));
        SS.toast("Image uploaded");
      } catch (e) { SS.toast(e.message); }
      finally { if (label) label.textContent = old; }
    };
    fi.click();
  }

  /* ---------- Sidebar mobile ---------- */
  const closeSidebar = () => { $("side").classList.remove("open"); $("backdrop").classList.remove("open"); };

  /* ---------- Boot ---------- */
  async function boot() {
    // delegated clicks: nav, modal close, upload button
    document.addEventListener("click", (e) => {
      const up = e.target.closest("[data-up]");
      if (up) { pickAndUpload(up.dataset.up, up); return; }
      const nav = e.target.closest("[data-route]");
      if (nav) { go(nav.dataset.route); return; }
      if (e.target.closest("[data-close]")) closeForm();
    });
    // live image previews
    document.addEventListener("input", (e) => {
      const t = e.target;
      if (t && t.dataset && t.dataset.pv) {
        const im = document.getElementById(t.dataset.pv);
        if (im) { const s = previewSrc(t.value); im.src = s; im.style.display = s ? "block" : "none"; }
      }
    });

    $("loginForm").onsubmit = async (e) => {
      e.preventDefault();
      try { const user = await login($("lg-user").value, $("lg-pass").value); await enter(); SS.toast("Welcome, " + (user.name || "admin")); }
      catch (err) { SS.toast(err.message); }
    };
    $("logoutBtn").onclick = async () => { try { await api("POST", "/logout"); } catch (e) {} token = ""; localStorage.removeItem("ss_cms_token"); showLogin(); };
    $("crudForm").addEventListener("submit", (e) => { e.preventDefault(); submitForm(); });
    $("burger").onclick = () => { $("side").classList.add("open"); $("backdrop").classList.add("open"); };
    $("backdrop").onclick = closeSidebar;
    document.addEventListener("keydown", (e) => e.key === "Escape" && closeForm());
    $("burger").innerHTML = SS.icon("menu");
    $("loginMark").innerHTML = SS.logo("logo-login");

    const params = new URLSearchParams(location.search);
    // ?demo=1 auto-logs in with the demo admin for a quick look
    if (params.get("demo") === "1" && !token) {
      try { await login("admin", "admin"); } catch (e) {}
    }
    if (token) {
      try {
        await api("GET", "/me");
        await enter(params.get("view"));
        if (params.get("new") && ENT[params.get("view")]) openForm(params.get("view"), null);
        return;
      } catch (e) { /* invalid/expired token → fall through to login */ }
    }
    showLogin();
  }
  window.SS_PAGE = boot;
})();
