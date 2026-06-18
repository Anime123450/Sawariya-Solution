// Evaluate public/js/data.js in a tiny sandbox and dump window.SS_DATA to JSON.
// Used to seed the database with the exact content the static site shipped with.
// Run:  node scripts/dump-content.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const code = readFileSync("public/js/data.js", "utf8");
const window = {};
const location = { pathname: "/", search: "" };
// data.js does `window.SS_DATA = {...}` then an IIFE that uses `location`
const run = new Function("window", "location", code + "\nreturn window.SS_DATA;");
const data = run(window, location);

mkdirSync("database/seeders/data", { recursive: true });
writeFileSync("database/seeders/data/content.json", JSON.stringify(data, null, 2));
console.log("wrote database/seeders/data/content.json");
console.log("keys:", Object.keys(data).join(", "));
console.log("counts:", ["services", "products", "projects", "testimonials", "blogs", "jobs", "milestones", "clients", "partners"].map((k) => `${k}=${data[k]?.length}`).join("  "), `banner.slides=${data.banner?.slides?.length}`);
