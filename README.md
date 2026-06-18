<div align="center">

<img src="public/images/logo.png" alt="Sawariya Solution" width="96" />

# Sawariya Solution

Marketing website **and** a database-backed CMS for a Vadodara IT studio.
A plain HTML/CSS/JS frontend on top of a Laravel + MySQL API.

![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=flat-square&logo=laravel&logoColor=white)
![PHP](https://img.shields.io/badge/PHP_8.3-777BB4?style=flat-square&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/responsive-mobile_→_desktop-1C3FBF?style=flat-square)

</div>

---

## 🦚 About

Sawariya Solution is a small IT studio that builds web, software, mobile and cloud products for businesses across India. This is their site.

The whole thing leans into one idea: *Sawariya* is a name for Krishna, and his peacock feather is the brand mark — so the feather's "eye" turns up as the little marker next to every section heading. Royal blue on white, generous spacing, nothing that screams stock template.

The frontend is deliberately framework-free — one stylesheet and two small scripts. Behind it sits a small **Laravel API** that stores all the content in **MySQL**, so the admin panel edits real data instead of a browser's localStorage. If the API is ever unavailable, the site falls back to its bundled defaults and still renders.

## 🚀 Getting started

You need **PHP 8.3+, Composer and MySQL** (Laragon/XAMPP on Windows bundle all three).

```bash
composer install                     # install PHP dependencies
cp .env.example .env                 # then set your DB creds in .env
php artisan key:generate

# create the database once (any MySQL client):  CREATE DATABASE sawariya;
php artisan migrate --seed           # build tables + load the site content

php artisan serve                    # → http://localhost:8000
```

Open **http://localhost:8000** for the site and **http://localhost:8000/admin/** for the CMS.

> **Just want to look at the frontend?** Serve the `public/` folder statically
> (`python -m http.server 3000 --directory public`). The pages render from their
> bundled defaults — but the admin needs the API running to log in and save.

## 🛠️ Admin panel (CMS)

Go to **`/admin/`** and sign in with **`admin` / `admin`** (seeded user). Append `?demo=1` to auto-login for a quick look.

You can edit basically everything on the site — banner slides, services, products, portfolio, testimonials, blog posts, job openings, client + partner logos, milestones, social links, contact info, footer and SEO. It's schema-driven: each collection is described once in `admin/admin.js` and the table + form UI builds itself from that.

Every image/logo/photo field has a **live preview** and an **Upload** button (files land in `public/images/uploads/`). Saves go straight to the database through the API, so a change shows up on the public site on its next load.

## 🔌 API

Token auth via Laravel Sanctum. Public reads need no auth; everything else needs a Bearer token from `/api/login`.

| Method | Endpoint | Auth | Purpose |
|--------|----------|:----:|---------|
| `GET` | `/api/content` | — | All site content for the frontend |
| `POST` | `/api/login` | — | `{username, password}` → `{token, user}` |
| `GET` | `/api/collections/{c}` | ✓ | List items in a collection |
| `POST` | `/api/collections/{c}` | ✓ | Create an item |
| `PUT` | `/api/collections/{c}/{id}` | ✓ | Update an item |
| `DELETE` | `/api/collections/{c}/{id}` | ✓ | Delete an item |
| `GET`/`PUT` | `/api/singletons/{key}` | ✓ | Read / update a single record (settings, contact, footer) |
| `POST` | `/api/uploads` | ✓ | Upload an image → `{path}` |

Content is stored flexibly: list collections live in an **`entries`** table (one JSON row per item), single records in a **`singletons`** table — which mirrors the schema-driven admin nicely.

## 🎨 Design

- **Type** — Space Grotesk (headings), Hanken Grotesque (body), Space Mono (labels & numbers)
- **Colour** — royal peacock blue `#1B45C4` on white, with a blue gradient for accents
- **Layout** — content sits in a 1280px shell; the hero banner and tinted sections run full-bleed
- **Details** — fully responsive, visible keyboard focus, respects `prefers-reduced-motion`

## 📂 Project layout

```text
sawariya-solution/
├─ app/
│  ├─ Http/Controllers/Api/   # Auth, Content, Collection, Singleton, Upload
│  └─ Models/                 # Entry, Singleton, User
├─ routes/
│  ├─ api.php                 # the REST API
│  └─ web.php                 # serves the static site + /admin
├─ database/
│  ├─ migrations/             # entries, singletons, users, sanctum…
│  └─ seeders/                # ContentSeeder + data/content.json (site content)
├─ public/                    # ← the frontend (served by Laravel)
│  ├─ index.html  about.html  services.html  …  contact.html
│  ├─ css/style.css           # the whole design system
│  ├─ js/data.js              # bundled content defaults (fallback)
│  ├─ js/ui.js                # header, footer, banner, cards, API loader
│  ├─ images/                 # banner · services · products · portfolio · people · partners
│  └─ admin/                  # the CMS (index.html, admin.css, admin.js)
└─ scripts/                   # dump-content.mjs (regenerate seed data from data.js)
```

## 🔁 Re-seeding

The seed content is generated from the frontend defaults. To refresh it after editing `public/js/data.js`:

```bash
node scripts/dump-content.mjs        # rewrites database/seeders/data/content.json
php artisan db:seed --force          # reloads the database from it
```

---

<div align="center">

Made with 🦚 in Vadodara · © Sawariya Solution

</div>
