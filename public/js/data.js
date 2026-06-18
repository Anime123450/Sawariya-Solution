/* ============================================================
   SAWARIYA SOLUTION — centralized content store
   Single source of truth for all page content.
   Built so a CMS / admin API can later replace these literals
   (e.g. fetch('/api/services') -> SS_DATA.services) with no
   change to the rendering code.
   ============================================================ */
window.SS_DATA = {
  site: {
    name: "Sawariya Solution",
    tagline: "Top-notch IT, under one roof",
    short: "SAWARIYA",
    sub: "I T   S O L U T I O N S",
    description:
      "A Vadodara-based IT studio building web, software, mobile and cloud products for growing businesses across India.",
  },

  contact: {
    phone1: "+91 70160 64136",
    phone2: "+91 75672 75735",
    email1: "admin@sawariyasolution.com",
    email2: "vishnuchandel11@gmail.com",
    address: "TF 39, Siddheshwar Hallmark, Ajwa Road, Vadodara, Gujarat 390019",
    hours: "Mon – Sat · 10:00 AM – 7:00 PM",
    mapsUrl: "https://maps.google.com/?q=Siddheshwar+Hallmark+Ajwa+Road+Vadodara",
  },

  socials: [
    { platform: "Facebook", url: "https://facebook.com/ivishsolution", icon: "facebook" },
    { platform: "Instagram", url: "https://instagram.com/sawariya_solution", icon: "instagram" },
    { platform: "LinkedIn", url: "https://linkedin.com/company/ivish-solution", icon: "linkedin" },
    { platform: "YouTube", url: "https://youtube.com/@sawariyasolution", icon: "youtube" },
    { platform: "WhatsApp", url: "https://wa.me/917016064136", icon: "whatsapp" },
  ],

  milestones: [
    { value: 40, suffix: "+", label: "Clients served" },
    { value: 120, suffix: "+", label: "Projects delivered" },
    { value: 30, suffix: "+", label: "Specialists on team" },
    { value: 6, suffix: "+", label: "Years in business" },
  ],

  // 6 core services (consolidated from the live site)
  services: [
    {
      slug: "web-development",
      icon: "browser",
      title: "Web Development & Design",
      short: "Custom websites and web apps — responsive, fast, and built to convert.",
      full:
        "Tailored web solutions: custom applications, responsive front-ends, e-commerce platforms, REST/API integrations, and ongoing maintenance for a seamless online experience.",
      points: ["Custom web applications", "E-commerce & payments", "API integrations", "Maintenance & support"],
    },
    {
      slug: "software-development",
      icon: "layers",
      title: "Software Development",
      short: "ERP, CRM and workflow systems that run the daily business.",
      full:
        "Custom and enterprise software — ERP, CRM, and workflow automation, plus inventory, HR, and finance systems tailored to how your team actually works.",
      points: ["ERP & CRM platforms", "Workflow automation", "Inventory & billing", "HR & finance systems"],
    },
    {
      slug: "mobile-apps",
      icon: "phone",
      title: "Mobile App Development",
      short: "Native and cross-platform apps for Android and iOS.",
      full:
        "Design and development of Android and iOS applications — native, hybrid, and cross-platform — from first wireframe to store launch and beyond.",
      points: ["Android & iOS", "Flutter & React Native", "App store launch", "Push & analytics"],
    },
    {
      slug: "cloud-hosting",
      icon: "cloud",
      title: "Cloud & Hosting Solutions",
      short: "Reliable hosting, automated backups, and disaster recovery.",
      full:
        "Reliable web hosting (shared, VPS, dedicated, cloud), domain registration, automated cloud backups, and disaster-recovery strategies that keep you online.",
      points: ["Shared, VPS & cloud", "Domain & DNS", "Automated backups", "Disaster recovery"],
    },
    {
      slug: "digital-marketing",
      icon: "megaphone",
      title: "Digital Marketing & SEO",
      short: "Data-driven SEO, social, and campaigns that bring real demand.",
      full:
        "Unlock the full potential of digital marketing where creativity meets data — SEO, social media, and paid campaigns across every major platform.",
      points: ["Search engine optimization", "Social media marketing", "Paid ad campaigns", "Content & creatives"],
    },
    {
      slug: "it-consulting",
      icon: "compass",
      title: "IT Consulting & Support",
      short: "Strategy, infrastructure, and 24/7 support you can lean on.",
      full:
        "Expert guidance on IT infrastructure, digital transformation, and technology adoption — with 24/7 help-desk support, troubleshooting, and managed maintenance.",
      points: ["IT strategy & transformation", "Infrastructure planning", "24/7 help desk", "Managed maintenance"],
    },
  ],

  // Products map to the kinds of clients Sawariya actually serves
  products: [
    { slug: "crm", category: "Sales", title: "Sawariya CRM", short: "Leads, clients, tasks, and tickets in one tidy workspace for your sales team.", color: "#1B45C4", tag: "Most popular" },
    { slug: "erp", category: "Operations", title: "Sawariya ERP", short: "Run inventory, billing, purchase, and accounts from a single connected suite.", color: "#2E57D6" },
    { slug: "hms", category: "Healthcare", title: "Hospital Management", short: "OPD, appointments, pharmacy, and billing for clinics and hospitals.", color: "#3A6AE0" },
    { slug: "pos", category: "Retail", title: "Smart POS & Billing", short: "GST billing, stock, and day-end reports for shops and restaurants.", color: "#123A9E" },
    { slug: "hrms", category: "People", title: "Sawariya HRMS", short: "Attendance, payroll, leave, and employee records without the spreadsheets.", color: "#4B79EA" },
    { slug: "school", category: "Education", title: "School & Institute ERP", short: "Admissions, fees, attendance, and parent communication in one portal.", color: "#11308F" },
  ],

  // Portfolio — built from Sawariya's real clients
  projects: [
    { slug: "dr-apple", category: "Healthcare", title: "Dr Apple Healthcare", client: "Dr Apple Healthcare", short: "Patient-facing website with appointment booking and a doctor directory.", tags: ["Web", "Booking"] },
    { slug: "manavta", category: "Healthcare", title: "Manavta Hospital", client: "Manavta Hospital", short: "Hospital management system covering OPD, billing, and records.", tags: ["Software", "ERP"] },
    { slug: "girnar", category: "Hospitality", title: "Girnar Kathiyawadi", client: "Girnar Kathiyawadi Hotel", short: "Restaurant website with digital menu and online ordering.", tags: ["Web", "E-commerce"] },
    { slug: "kids-fashion", category: "E-commerce", title: "Kids Fashion Dekho", client: "Kids Fashion Dekho", short: "Online fashion store with catalog, cart, and payment gateway.", tags: ["E-commerce", "Web"] },
    { slug: "ayansh", category: "Corporate", title: "Ayansh Security", client: "Ayansh Security", short: "Corporate website and lead capture for a security services firm.", tags: ["Web", "Branding"] },
    { slug: "saurabh-dixit", category: "Personal", title: "Saurabh Dixit", client: "Saurabh Dixit", short: "Personal brand site and portfolio with a writing section.", tags: ["Web", "Portfolio"] },
  ],

  // Clients shown with a representative image (CMS-editable: name + image)
  clients: [
    { name: "Dr Apple Healthcare", logo: "portfolio/dr-apple.jpg" },
    { name: "Manavta Hospital", logo: "portfolio/manavta.jpg" },
    { name: "Girnar Kathiyawadi", logo: "portfolio/girnar.jpg" },
    { name: "Kids Fashion Dekho", logo: "portfolio/kids-fashion.jpg" },
    { name: "Ayansh Security", logo: "portfolio/ayansh.jpg" },
    { name: "Saurabh Dixit", logo: "portfolio/saurabh.jpg" },
  ],

  // Technology partners & platforms we build on (real brand logos, CMS-editable)
  partners: [
    { name: "Google Cloud", logo: "partners/googlecloud.svg", url: "https://cloud.google.com" },
    { name: "Razorpay", logo: "partners/razorpay.svg", url: "https://razorpay.com" },
    { name: "Cloudflare", logo: "partners/cloudflare.svg", url: "https://www.cloudflare.com" },
    { name: "MongoDB", logo: "partners/mongodb.svg", url: "https://www.mongodb.com" },
    { name: "Flutter", logo: "partners/flutter.svg", url: "https://flutter.dev" },
    { name: "React", logo: "partners/react.svg", url: "https://react.dev" },
    { name: "WordPress", logo: "partners/wordpress.svg", url: "https://wordpress.org" },
    { name: "Firebase", logo: "partners/firebase.svg", url: "https://firebase.google.com" },
  ],

  // Home hero banner — a rotating, full-width slideshow (CMS-editable slides)
  banner: {
    autoplay: 6000,
    slides: [
      {
        image: "banner/team-collab.jpg",
        eyebrow: "IT solutions studio · Vadodara",
        title: "Top-notch IT,<br>all under <span class=\"grad-light\">one roof</span>.",
        lead: "Web, software, mobile, cloud, and marketing — Sawariya Solution builds and runs the technology behind 40+ growing businesses across India.",
        ctaPrimaryLabel: "Start a project", ctaPrimaryHref: "contact.html",
        ctaSecondaryLabel: "See our work", ctaSecondaryHref: "portfolio.html",
      },
      {
        image: "banner/developer.jpg",
        eyebrow: "Custom software & apps",
        title: "Software that runs<br>your <span class=\"grad-light\">whole business</span>.",
        lead: "ERP, CRM, mobile apps, and workflow automation — tailored to how your team actually works, delivered and supported by one accountable team.",
        ctaPrimaryLabel: "Explore services", ctaPrimaryHref: "services.html",
        ctaSecondaryLabel: "View products", ctaSecondaryHref: "products.html",
      },
      {
        image: "banner/cloud-network.jpg",
        eyebrow: "Cloud · Hosting · 24/7 support",
        title: "Always online.<br>Always <span class=\"grad-light\">supported</span>.",
        lead: "Reliable cloud hosting, automated backups, and a help desk that picks up the phone — so your business keeps running without a hitch.",
        ctaPrimaryLabel: "Talk to us", ctaPrimaryHref: "contact.html",
        ctaSecondaryLabel: "Our process", ctaSecondaryHref: "about.html",
      },
    ],
  },

  testimonials: [
    { name: "Dr. Apple Team", role: "Operations Head", company: "Dr Apple Healthcare", quote: "Sawariya rebuilt our booking flow and it just works. Patients find us, book, and show up — no support calls.", rating: 5, avatar: "people/person-1.jpg" },
    { name: "Girnar Kathiyawadi", role: "Owner", company: "Girnar Hotel", quote: "The online menu and ordering paid for itself in the first month. Clean design, and they answer the phone.", rating: 5, avatar: "people/person-2.jpg" },
    { name: "Ayansh Security", role: "Director", company: "Ayansh Security", quote: "Professional from the first call. Our new website finally looks like the company we want to be.", rating: 5, avatar: "people/person-3.jpg" },
  ],

  blogs: [
    { slug: "erp-for-smb", category: "Software", title: "Do small businesses really need an ERP?", excerpt: "A plain-language guide to when a spreadsheet stops being enough — and what to buy instead.", author: "Vishnu Chandel", date: "2026-05-28", read: "6 min" },
    { slug: "website-speed", category: "Web", title: "Five things slowing your website down", excerpt: "Most slow sites share the same handful of problems. Here is how we fix them.", author: "Sawariya Team", date: "2026-05-12", read: "4 min" },
    { slug: "local-seo-vadodara", category: "Marketing", title: "Local SEO for businesses in Gujarat", excerpt: "How to show up when someone nearby searches for what you sell.", author: "Sawariya Team", date: "2026-04-30", read: "7 min" },
    { slug: "app-or-website", category: "Mobile", title: "App or website — which should you build first?", excerpt: "A founder-friendly way to decide where your first rupee should go.", author: "Vishnu Chandel", date: "2026-04-15", read: "5 min" },
  ],

  jobs: [
    { slug: "full-stack", title: "Full-Stack Developer", department: "Engineering", location: "Vadodara · On-site", type: "Full-time", exp: "1–3 yrs", short: "Build web apps end to end with our product team." },
    { slug: "flutter", title: "Flutter Developer", department: "Engineering", location: "Vadodara / Remote", type: "Full-time", exp: "1–2 yrs", short: "Ship cross-platform mobile apps for our clients." },
    { slug: "ui-ux", title: "UI/UX Designer", department: "Design", location: "Vadodara · On-site", type: "Full-time", exp: "0–2 yrs", short: "Design interfaces people enjoy using." },
    { slug: "digital-marketing", title: "Digital Marketing Executive", department: "Marketing", location: "Vadodara · On-site", type: "Full-time", exp: "0–2 yrs", short: "Run SEO, social, and ad campaigns for clients." },
    { slug: "bde", title: "Business Development Executive", department: "Sales", location: "Vadodara · On-site", type: "Full-time", exp: "0–3 yrs", short: "Talk to prospects and grow the client base." },
  ],

  // why-us values
  values: [
    { title: "Under one roof", body: "Web, software, mobile, cloud, and marketing from a single team — no juggling vendors." },
    { title: "Built to last", body: "We write maintainable code and document it, so your product keeps working after launch." },
    { title: "Plain answers", body: "No jargon, no runaround. We explain what we're doing and why, in language you can use." },
    { title: "We pick up the phone", body: "Local, responsive support. When something breaks, a real person responds the same day." },
  ],

  process: [
    { step: "01", title: "Discover", body: "We learn your business, users, and goals before writing a line of code." },
    { step: "02", title: "Design", body: "Wireframes and visual design you approve before development begins." },
    { step: "03", title: "Build", body: "We develop in short cycles and show you working software, not status reports." },
    { step: "04", title: "Launch & support", body: "We ship, monitor, and stay on call — your launch is the start, not the end." },
  ],

  // page-level imagery (keyword photos; swap freely or manage in the CMS)
  images: {},
};

/* ---- Relevant imagery (curated local photos in /public/images) ----
   Each item gets a real, topic-matched `.image`. A CMS edits these as a
   normal field; paths resolve from the site root (and from /admin/).        */
(function () {
  const D = window.SS_DATA;
  // Root-relative paths (public pages live at site root). Admin only shows
  // these as editable text, so no path juggling is needed.
  const P = (p) => (/^https?:|^images\//.test(p) ? p : "images/" + p);

  const map = {
    services: ["services/web-development.jpg", "services/software.jpg", "services/mobile-apps.jpg", "services/cloud-hosting.jpg", "services/digital-marketing.jpg", "services/it-consulting.jpg"],
    products: ["products/crm.jpg", "products/erp.jpg", "products/hms.jpg", "products/pos.jpg", "products/hrms.jpg", "products/school.jpg"],
    projects: ["portfolio/dr-apple.jpg", "portfolio/manavta.jpg", "portfolio/girnar.jpg", "portfolio/kids-fashion.jpg", "portfolio/ayansh.jpg", "portfolio/saurabh.jpg"],
    blogs: ["blog/erp-smb.jpg", "blog/website-speed.jpg", "blog/local-seo.jpg", "blog/app-or-website.jpg"],
  };
  Object.keys(map).forEach((k) =>
    D[k].forEach((item, i) => { item.image = P(map[k][i] || map[k][0]); })
  );

  // resolve banner slide + partner + client logo paths to absolute (root / admin aware)
  D.banner.slides.forEach((s) => { s.image = P(s.image); });
  D.partners.forEach((p) => { if (p.logo) p.logo = P(p.logo); });
  D.clients.forEach((c) => { if (c && typeof c === "object" && c.logo) c.logo = P(c.logo); });
  D.testimonials.forEach((tm) => { if (tm.avatar) tm.avatar = P(tm.avatar); });

  D.images = {
    aboutStory: P("feature/about-story.jpg"),
    homeWhy: P("feature/home-why.jpg"),
    productsWhy: P("feature/products-why.jpg"),
    careers: P("feature/careers.jpg"),
    servicesDetail: map.services.map((s) => P(s)),
  };
})();
