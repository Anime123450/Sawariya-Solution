/* ============================================================
   SAWARIYA SOLUTION — UI engine
   Icons · peacock feather signature · header/footer ·
   nav · scroll-reveal · counters · toast · card builders
   ============================================================ */
(function () {
  const SS = (window.SS = window.SS || {});
  const D = window.SS_DATA;

  /* ---------- Icons (stroke, inherit currentColor) ---------- */
  const s = (p, o = {}) =>
    `<svg viewBox="0 0 24 24" fill="${o.fill ? "currentColor" : "none"}" stroke="${o.fill ? "none" : "currentColor"}" stroke-width="${o.sw || 1.7}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;

  SS.icons = {
    browser: s('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>'),
    layers: s('<path d="M12 3 21 8l-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5M3 16.5 12 21l9-4.5"/>'),
    phone: s('<rect x="6" y="2.5" width="12" height="19" rx="3"/><path d="M11 18.5h2"/>'),
    cloud: s('<path d="M17.5 19a4.5 4.5 0 0 0 .5-9 6 6 0 0 0-11.6-1.5A4 4 0 0 0 6 19h11.5Z"/>'),
    megaphone: s('<path d="M3 11v2a1 1 0 0 0 1 1h2l9 5V5L6 10H4a1 1 0 0 0-1 1Z"/><path d="M18 8a4 4 0 0 1 0 8"/>'),
    compass: s('<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>'),
    arrow: s('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    arrowUpRight: s('<path d="M7 17 17 7M8 7h9v9"/>'),
    check: s('<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>'),
    plus: s('<path d="M12 5v14M5 12h14"/>'),
    menu: s('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    close: s('<path d="M6 6l12 12M18 6 6 18"/>'),
    phoneCall: s('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.7 2.6a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.5-1.2a2 2 0 0 1 2.1-.5c.8.4 1.7.6 2.6.7a2 2 0 0 1 1.7 2Z"/>'),
    mail: s('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
    pin: s('<path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/>'),
    clock: s('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    send: s('<path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z"/>'),
    star: s('<path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8 6.8 19.5l1-5.8L3.5 9.6l5.9-.9L12 3Z"/>', { fill: 1 }),
    quote: '“',
    briefcase: s('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>'),
    logout: s('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>'),
    search: s('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.2-4.2"/>'),
    edit: s('<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/>'),
    trash: s('<path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/>'),
    grid: s('<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>'),
    sparkle: s('<path d="M12 3v4M12 17v4M5 12H1M23 12h-4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8"/>'),
    facebook: s('<path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V8.5c0-.4.3-.5.5-.5Z"/>', { fill: 1 }),
    instagram: s('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>'),
    linkedin: s('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7" stroke="#fff"/>', {}),
    youtube: s('<rect x="3" y="6" width="18" height="12" rx="4"/><path d="m11 9.5 4 2.5-4 2.5Z" fill="currentColor" stroke="none"/>'),
    whatsapp: s('<path d="M12 3a9 9 0 0 0-7.7 13.7L3 21l4.4-1.2A9 9 0 1 0 12 3Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.5 0 1-.6 1-1l-1.5-1-1 1c-1.5-.5-2.5-1.5-3-3l1-1-1-1.5c-.4 0-1 .5-1 1Z" fill="currentColor" stroke="none"/>'),
    // industry markers
    health: s('<path d="M12 20.5S4.5 15.5 4.5 9.8A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7.5 1.8c0 5.7-7.5 10.7-7.5 10.7Z"/><path d="M7.5 11.5h2L11 9l2 5 1-2.5h2.5"/>'),
    dining: s('<path d="M6 3v7a2 2 0 0 0 4 0V3M8 10v11M17 3c-1.6 0-2.6 2.2-2.6 5.2 0 2.4 1 3.6 2.6 3.8V21"/>'),
    retail: s('<path d="M6 8.5h12l-.8 11a1 1 0 0 1-1 1H7.8a1 1 0 0 1-1-1L6 8.5Z"/><path d="M9 8.5a3 3 0 0 1 6 0"/>'),
    building: s('<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h2M14 15h1M10.5 21v-2.5h3V21"/>'),
    education: s('<path d="m12 4 9.5 4.5L12 13 2.5 8.5 12 4Z"/><path d="M6.5 10.5V16c0 1.2 2.6 3 5.5 3s5.5-1.8 5.5-3v-5.5"/>'),
    logistics: s('<path d="M3 6.5h11v9.5H3zM14 9.5h3.4L21 13v3h-7z"/><circle cx="7" cy="18" r="1.7"/><circle cx="17.5" cy="18" r="1.7"/>'),
  };
  SS.icon = (n) => SS.icons[n] || "";

  /* ---------- Real logo + relevant imagery ---------- */
  // path works from site root and from /admin/
  SS.logoSrc = (location.pathname.indexOf("/admin/") !== -1 ? "../" : "") + "images/logo.png";
  SS.logo = (cls = "") => `<img src="${SS.logoSrc}" class="ss-logo ${cls}" alt="${D.site.name}">`;
  // <img> for content cards, with graceful fallback to a brand tint if it can't load
  SS.photo = (src, alt = "") => `<img class="photo" src="${src}" alt="${alt}" loading="lazy" onerror="this.classList.add('photo-failed')">`;

  /* ---------- Peacock feather signature (programmatic) ---------- */
  // Builds a feather: central rachis + branching barbs + iridescent eye.
  SS.featherSVG = function (id = "f1", animate = true) {
    const cx = 120, yTop = 40, yBot = 308, span = yBot - yTop;
    const N = 38, Lmax = 122, ang = 0.74; // barb count / length / angle from vertical
    let barbs = "";
    const draw = animate ? ' class="feather-stroke"' : "";
    for (let i = 0; i <= N; i++) {
      const y = yTop + (span * i) / N;
      const t = (y - yTop) / span;
      // fuller plume: long in the middle, tapering to both ends
      const L = Lmax * Math.pow(Math.sin(Math.PI * t), 0.85);
      if (L < 5) continue;
      const dx = L * Math.sin(ang), dy = L * Math.cos(ang) * 0.78;
      const op = (0.45 + 0.5 * Math.sin(Math.PI * t)).toFixed(2);
      const sw = (1.6 + 1.2 * Math.sin(Math.PI * t)).toFixed(1);
      barbs += `<path d="M${cx} ${y.toFixed(0)} q ${(-dx*0.45).toFixed(0)} ${(-dy*0.8).toFixed(0)} ${(-dx).toFixed(0)} ${(-dy).toFixed(0)}" stroke="url(#${id}g)" stroke-width="${sw}" opacity="${op}"/>`;
      barbs += `<path d="M${cx} ${y.toFixed(0)} q ${(dx*0.45).toFixed(0)} ${(-dy*0.8).toFixed(0)} ${dx.toFixed(0)} ${(-dy).toFixed(0)}" stroke="url(#${id}g)" stroke-width="${sw}" opacity="${op}"/>`;
    }
    return `
<svg viewBox="0 0 240 330" fill="none" stroke-linecap="round" aria-hidden="true">
  <defs>
    <linearGradient id="${id}g" x1="20" y1="20" x2="220" y2="320" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#3A6AE0"/><stop offset=".5" stop-color="#1B45C4"/><stop offset="1" stop-color="#11308F"/>
    </linearGradient>
    <radialGradient id="${id}eye" cx="50%" cy="42%" r="62%">
      <stop offset="0" stop-color="#4B79EA"/><stop offset=".5" stop-color="#1B45C4"/><stop offset="1" stop-color="#0E2A7A"/>
    </radialGradient>
  </defs>
  <g${draw}>
    <path d="M${cx} ${yBot} Q ${cx-6} 180 ${cx} ${yTop}" stroke="url(#${id}g)" stroke-width="3"/>
    ${barbs}
  </g>
  <g>
    <ellipse cx="${cx}" cy="150" rx="58" ry="74" fill="url(#${id}eye)"/>
    <ellipse cx="${cx}" cy="150" rx="58" ry="74" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>
    <path d="M${cx} 92 C 166 108 182 168 158 200 C 140 224 100 224 82 200 C 58 168 74 108 ${cx} 92 Z" fill="#0B1437" opacity=".9"/>
    <path d="M${cx} 116 c 22 6 30 34 18 52 c -10 14 -34 14 -44 -2 c 16 6 30 -2 30 -18 c 0 -14 -10 -22 -4 -32 Z" fill="url(#${id}eye)"/>
    <circle cx="106" cy="132" r="7" fill="#fff" opacity=".85"/>
  </g>
</svg>`;
  };

  // Brand mark now uses the real logo image (kept as a function so existing call sites still work)
  SS.markSVG = () => SS.logo("logo-mark");

  /* ---------- Brand block (real logo) ---------- */
  const brand = (footer) => `
    <a class="brand${footer ? " brand-footer" : ""}" href="index.html" aria-label="${D.site.name} home">
      ${SS.logo(footer ? "logo-brand on-dark" : "logo-brand")}
    </a>`;

  /* ---------- Header ---------- */
  const NAV = [
    ["Home", "index.html", "home"],
    ["About", "about.html", "about"],
    ["Services", "services.html", "services"],
    ["Products", "products.html", "products"],
    ["Portfolio", "portfolio.html", "portfolio"],
    ["Blog", "blog.html", "blog"],
    ["Careers", "careers.html", "careers"],
    ["Contact", "contact.html", "contact"],
  ];

  SS.buildHeader = function () {
    const page = document.body.dataset.page;
    const links = NAV.map(([t, h, k]) => `<a href="${h}"${k === page ? ' class="active"' : ""}>${t}</a>`).join("");
    const mlinks = NAV.map(([t, h, k]) => `<a href="${h}"${k === page ? ' class="active"' : ""}><i style="width:7px;height:7px;border-radius:50% 50% 50% 1px;background:var(--peacock);transform:rotate(-12deg);display:inline-block"></i>${t}</a>`).join("");
    const el = document.getElementById("site-header");
    if (!el) return;
    el.className = "site-header";
    el.innerHTML = `
      <div class="container">
        <nav class="nav">
          ${brand(false)}
          <div class="nav-links">${links}</div>
          <div class="nav-cta">
            <a class="btn btn-primary" href="contact.html">Get a quote ${SS.icon("arrow")}</a>
            <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">${SS.icon("menu")}</button>
          </div>
        </nav>
      </div>
      <div class="nav-backdrop" id="navBackdrop"></div>
      <aside class="mobile-drawer" id="mobileDrawer" aria-hidden="true">
        <div class="drawer-head">${brand(false)}<button class="nav-toggle" id="navClose" aria-label="Close menu">${SS.icon("close")}</button></div>
        ${mlinks}
        <a class="btn btn-peacock" href="contact.html">Get a quote ${SS.icon("arrow")}</a>
      </aside>`;

    // scroll state
    const onScroll = () => el.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // drawer
    const drawer = document.getElementById("mobileDrawer");
    const back = document.getElementById("navBackdrop");
    const open = () => { drawer.classList.add("open"); back.classList.add("open"); document.getElementById("navToggle").setAttribute("aria-expanded", "true"); drawer.setAttribute("aria-hidden", "false"); };
    const close = () => { drawer.classList.remove("open"); back.classList.remove("open"); document.getElementById("navToggle").setAttribute("aria-expanded", "false"); drawer.setAttribute("aria-hidden", "true"); };
    document.getElementById("navToggle").addEventListener("click", open);
    document.getElementById("navClose").addEventListener("click", close);
    back.addEventListener("click", close);
    document.addEventListener("keydown", (e) => e.key === "Escape" && close());
  };

  /* ---------- Footer ---------- */
  SS.buildFooter = function () {
    const el = document.getElementById("site-footer");
    if (!el) return;
    const svc = D.services.map((x) => `<a href="services.html#${x.slug}">${x.title}</a>`).join("");
    const socials = D.socials.map((x) => `<a href="${x.url}" target="_blank" rel="noopener" aria-label="${x.platform}">${SS.icon(x.icon)}</a>`).join("");
    el.className = "site-footer";
    el.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            ${brand(true)}
            <p>${D.site.description}</p>
            <div class="socials">${socials}</div>
          </div>
          <div class="footer-col">
            <h4>Company</h4>
            <a href="about.html">About us</a>
            <a href="portfolio.html">Portfolio</a>
            <a href="blog.html">Blog</a>
            <a href="careers.html">Careers</a>
            <a href="contact.html">Contact</a>
          </div>
          <div class="footer-col">
            <h4>Services</h4>
            ${svc}
          </div>
          <div class="footer-col footer-contact">
            <h4>Get in touch</h4>
            <a class="ci" href="tel:${D.contact.phone1.replace(/\s/g, "")}">${SS.icon("phoneCall")}<span>${D.contact.phone1}</span></a>
            <a class="ci" href="mailto:${D.contact.email1}">${SS.icon("mail")}<span>${D.contact.email1}</span></a>
            <span class="ci">${SS.icon("pin")}<span>${D.contact.address}</span></span>
            <form class="newsletter" onsubmit="SS.toast('Subscribed — thanks!');return false;">
              <input type="email" placeholder="Your email for updates" aria-label="Email" required>
              <button type="submit" aria-label="Subscribe">${SS.icon("send")}</button>
            </form>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${D.site.name}. All rights reserved.</span>
          <span class="legal">
            <a href="#">Privacy Policy</a><a href="#">Terms & Conditions</a><a href="#">Refund Policy</a>
          </span>
        </div>
      </div>`;
  };

  /* ---------- Card builders (image-led) ---------- */
  SS.serviceCard = (x, i, d = 0) => `
    <a href="services.html#${x.slug}" class="card media-card reveal" data-d="${d}">
      <div class="media-ph">${SS.photo(x.image, x.title)}<span class="media-tag">${SS.icon(x.icon)} 0${i + 1}</span></div>
      <div class="media-body">
        <h3>${x.title}</h3>
        <p>${x.short}</p>
        <span class="btn-link">Learn more <span class="arr">${SS.icon("arrow")}</span></span>
      </div>
    </a>`;

  SS.productCard = (x, d = 0) => `
    <div class="card media-card reveal" data-d="${d}">
      <div class="media-ph">${SS.photo(x.image, x.title)}${x.tag ? `<span class="chip media-chip">${x.tag}</span>` : ""}</div>
      <div class="media-body">
        <span class="cat">${x.category}</span>
        <h3>${x.title}</h3>
        <p>${x.short}</p>
        <a class="btn-link" href="contact.html">Request a demo <span class="arr">${SS.icon("arrow")}</span></a>
      </div>
    </div>`;

  SS.projectCard = (x, d = 0) => `
    <a href="portfolio.html#${x.slug}" class="card project-card reveal" data-d="${d}">
      <div class="ph">${SS.photo(x.image, x.title)}
        <div class="overlay"><span class="cat">${x.category}</span><h3>${x.title}</h3></div>
      </div>
    </a>`;

  SS.blogCard = (x, d = 0) => `
    <a href="blog.html#${x.slug}" class="card blog-card reveal" data-d="${d}">
      <div class="ph">${SS.photo(x.image, x.title)}</div>
      <div class="body">
        <div class="meta"><span>${x.category}</span><span class="dot"></span><span>${x.read} read</span></div>
        <h3>${x.title}</h3>
        <p>${x.excerpt}</p>
        <span class="btn-link">Read article <span class="arr">${SS.icon("arrow")}</span></span>
      </div>
    </a>`;

  SS.testimonialCard = (x, d = 0) => `
    <div class="tcard reveal" data-d="${d}">
      <span class="quote-mark">”</span>
      <div class="stars">${SS.icon("star").repeat(x.rating)}</div>
      <blockquote>${x.quote}</blockquote>
      <div class="who"><span class="av">${x.avatar ? `<img src="${x.avatar}" alt="${x.name}">` : x.name.charAt(0)}</span><div><b>${x.name}</b><span>${x.role}, ${x.company}</span></div></div>
    </div>`;

  SS.logoPill = (name) => `<span class="logo-pill"><span class="dot"></span>${name}</span>`;

  /* ---------- Client tile (image thumbnail + name; monogram fallback) ---------- */
  SS.clientLogo = (c) => {
    const name = typeof c === "string" ? c : c.name;
    const img = typeof c === "object" ? (c.logo || c.image) : "";
    let mark;
    if (img) {
      mark = `<span class="cl-thumb"><img src="${img}" alt="${name}"></span>`;
    } else {
      const initials = name.replace(/[^A-Za-z ]/g, "").split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase() || name.slice(0, 2).toUpperCase();
      mark = `<span class="mono">${initials}</span>`;
    }
    return `<div class="client-logo reveal">${mark}<span class="cl-name">${name}</span></div>`;
  };

  /* ---------- Partner logo (real brand SVG) ---------- */
  SS.partnerLogo = (p) => {
    const name = typeof p === "string" ? p : p.name;
    const logo = typeof p === "object" ? p.logo : "";
    const url = typeof p === "object" && p.url ? p.url : "#";
    const inner = (logo ? `<img src="${logo}" alt="${name}" width="44" height="44">` : "") + `<span class="pl-name">${name}</span>`;
    return `<a class="partner-logo reveal" href="${url}" target="_blank" rel="noopener" title="${name}" aria-label="${name}">${inner}</a>`;
  };

  /* ---------- Industry card (icon-led "who we build for") ---------- */
  SS.industryCard = (x, d = 0) => `
    <div class="industry-card reveal" data-d="${d}">
      <span class="ind-ico">${SS.icon(x.icon)}</span>
      <div class="ind-body">
        <h3>${x.title}</h3>
        <p>${x.short}</p>
        ${x.tags && x.tags.length ? `<div class="ind-tags">${x.tags.map((t) => `<span>${t}</span>`).join("")}</div>` : ""}
      </div>
      <span class="ind-arrow">${SS.icon("arrowUpRight")}</span>
    </div>`;

  /* ---------- Hero banner (rotating slideshow) ---------- */
  SS.buildBanner = function (elId, banner) {
    const el = document.getElementById(elId);
    if (!el || !banner || !Array.isArray(banner.slides) || !banner.slides.length) return;
    const slides = banner.slides;
    el.classList.add("hero-banner");
    el.innerHTML = `
      <div class="hb-slides">${slides.map((s, i) => `
        <div class="hb-slide${i === 0 ? " active" : ""}" data-i="${i}">
          <img src="${s.image}" alt=""${i === 0 ? "" : ' loading="lazy"'}>
          <div class="container hb-inner">
            <div class="hb-copy">
              <span class="eyebrow">${s.eyebrow || ""}</span>
              <h1>${s.title || ""}</h1>
              <p class="lead">${s.lead || ""}</p>
              <div class="hb-actions">
                ${s.ctaPrimaryLabel ? `<a class="btn btn-peacock btn-lg" href="${s.ctaPrimaryHref || "#"}">${s.ctaPrimaryLabel}</a>` : ""}
                ${s.ctaSecondaryLabel ? `<a class="btn btn-on-ink btn-lg" href="${s.ctaSecondaryHref || "#"}">${s.ctaSecondaryLabel}</a>` : ""}
              </div>
            </div>
          </div>
        </div>`).join("")}
      </div>
      <button class="hb-arrow prev" aria-label="Previous slide">${SS.icon("arrow")}</button>
      <button class="hb-arrow next" aria-label="Next slide">${SS.icon("arrow")}</button>
      <div class="hb-dots">${slides.map((_, i) => `<button class="hb-dot${i === 0 ? " active" : ""}" data-i="${i}" aria-label="Go to slide ${i + 1}"></button>`).join("")}</div>`;

    const slideEls = [...el.querySelectorAll(".hb-slide")];
    const dotEls = [...el.querySelectorAll(".hb-dot")];
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cur = 0, timer = null;
    const show = (n) => {
      cur = (n + slides.length) % slides.length;
      slideEls.forEach((s, i) => s.classList.toggle("active", i === cur));
      dotEls.forEach((d, i) => d.classList.toggle("active", i === cur));
    };
    const next = () => show(cur + 1);
    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const start = () => { if (reduce || slides.length < 2) return; stop(); timer = setInterval(next, banner.autoplay || 6000); };
    el.querySelector(".hb-arrow.next").onclick = () => { show(cur + 1); start(); };
    el.querySelector(".hb-arrow.prev").onclick = () => { show(cur - 1); start(); };
    dotEls.forEach((d) => (d.onclick = () => { show(+d.dataset.i); start(); }));
    el.addEventListener("mouseenter", stop);
    el.addEventListener("mouseleave", start);
    start();
  };

  /* ---------- Content from the backend (CMS) ----------------------------------
     Fetch live content from the Laravel API and overlay it onto the embedded
     SS_DATA defaults. If the API isn't reachable (site served statically with
     no backend), we silently keep the defaults — the site still works.        */
  SS.applyContent = function (c) {
    if (!c || typeof c !== "object") return;
    const D = window.SS_DATA;
    ["services", "products", "projects", "testimonials", "blogs", "jobs", "milestones", "clients", "partners"]
      .forEach((k) => { if (Array.isArray(c[k]) && c[k].length) D[k] = c[k]; });
    if (Array.isArray(c.social) && c.social.length) D.socials = c.social;
    if (Array.isArray(c.banner) && c.banner.length) D.banner.slides = c.banner;
    if (c.contact && typeof c.contact === "object" && Object.keys(c.contact).length) Object.assign(D.contact, c.contact);
  };

  SS.loadContent = async function () {
    try {
      const res = await fetch("/api/content", { headers: { Accept: "application/json" } });
      if (res.ok) SS.applyContent(await res.json());
    } catch (e) { /* offline / no backend — use embedded defaults */ }
  };

  SS.statCard = (m, d = 0) => `
    <div class="stat-card reveal" data-d="${d}">
      <div class="val" data-count="${m.value}" data-suffix="${m.suffix}">0${m.suffix}</div>
      <div class="lbl">${m.label}</div>
    </div>`;

  SS.STATIC = /[?&]ss=static/.test(location.search);

  /* ---------- Scroll reveal ---------- */
  SS.observeReveal = function () {
    const els = document.querySelectorAll(".reveal:not(.in)");
    if (SS.STATIC || !("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((e) => io.observe(e));
  };

  /* ---------- Counters ---------- */
  SS.animateCounters = function () {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelectorAll("[data-count]").forEach((el) => {
      const target = +el.dataset.count, suffix = el.dataset.suffix || "";
      if (reduce || SS.STATIC) { el.textContent = target + suffix; return; }
      const io = new IntersectionObserver((ents) => {
        ents.forEach((en) => {
          if (!en.isIntersecting) return;
          io.disconnect();
          const dur = 1500, t0 = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - t0) / dur);
            const e = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * e) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      }, { threshold: 0.5 });
      io.observe(el);
    });
  };

  /* ---------- Toast ---------- */
  SS.toast = function (msg) {
    let t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
    t.innerHTML = `${SS.icon("check")}<span>${msg}</span>`;
    requestAnimationFrame(() => t.classList.add("show"));
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove("show"), 3200);
  };

  SS.mount = (id, html) => { const e = document.getElementById(id); if (e) e.innerHTML = html; };

  /* ---------- Accordion ---------- */
  SS.initAccordions = function () {
    document.querySelectorAll(".acc-head").forEach((head) => {
      if (head.dataset.wired) return;
      head.dataset.wired = "1";
      head.addEventListener("click", () => {
        const item = head.closest(".acc-item");
        const body = item.querySelector(".acc-body");
        const open = item.classList.toggle("open");
        body.style.maxHeight = open ? body.scrollHeight + "px" : "0";
      });
    });
  };

  /* ---------- Boot ---------- */
  SS.init = function (pageFn) {
    if (SS.STATIC) document.documentElement.classList.add("ss-static");
    SS.buildHeader();
    SS.buildFooter();
    if (typeof pageFn === "function") pageFn();
    document.querySelectorAll(".arr:empty").forEach((e) => (e.innerHTML = SS.icon("arrow")));
    document.querySelectorAll(".modal-close:empty").forEach((e) => (e.innerHTML = SS.icon("close")));
    document.querySelectorAll(".news-send:empty").forEach((e) => (e.innerHTML = SS.icon("send")));
    SS.initAccordions();
    SS.observeReveal();
    SS.animateCounters();
  };

  document.addEventListener("DOMContentLoaded", async () => {
    // pull live content from the backend (no-op fallback to defaults), then render
    if (location.pathname.indexOf("/admin/") === -1) await SS.loadContent();
    SS.init(window.SS_PAGE);
  });
})();
