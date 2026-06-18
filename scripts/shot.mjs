// Full-page screenshots via the Chrome DevTools Protocol (Edge/Chrome headless).
// Usage: node scripts/shot.mjs <baseUrl> <out-dir> <page1> [page2 ...]
// Requires an Edge/Chrome already running with --remote-debugging-port=9222.
import { writeFileSync } from "node:fs";

const [, , base, outDir, ...pages] = process.argv;
const DBG = "http://127.0.0.1:9222";

const rpc = (ws, id, method, params = {}) =>
  new Promise((resolve) => {
    const onMsg = (ev) => {
      const m = JSON.parse(ev.data);
      if (m.id === id) { ws.removeEventListener("message", onMsg); resolve(m.result); }
    };
    ws.addEventListener("message", onMsg);
    ws.send(JSON.stringify({ id, method, params }));
  });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const targets = await (await fetch(`${DBG}/json`)).json();
const page = targets.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));

let id = 1;
await rpc(ws, id++, "Page.enable");
await rpc(ws, id++, "Emulation.setDeviceMetricsOverride", { width: 1500, height: 950, deviceScaleFactor: 1, mobile: false });

for (const p of pages) {
  const url = `${base}/${p}.html?ss=static`;
  await rpc(ws, id++, "Page.navigate", { url });
  await sleep(1400);
  const { contentSize } = await rpc(ws, id++, "Page.getLayoutMetrics");
  const height = Math.min(Math.ceil(contentSize.height), 30000);
  const { data } = await rpc(ws, id++, "Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: 1500, height, scale: 1 },
  });
  const out = `${outDir}/${p.replace(/\//g, "_")}.png`;
  writeFileSync(out, Buffer.from(data, "base64"));
  console.log(`ok  ${out}  (1500x${height})`);
}
ws.close();
