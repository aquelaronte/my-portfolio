/**
 * generate-brand-reel — bake the placeholder reel to /public/brand-reel.png
 * -------------------------------------------------------------------------
 * Renders the demo brand reel (the SAME drawing routine the runtime fallback
 * uses) to a wide PNG so brand-surface mode A has a real file on disk.
 *
 *   node scripts/generate-brand-reel.mjs
 *
 * Requires the optional `node-canvas` package (it is NOT a runtime dependency —
 * the site never needs it; only this offline baker does):
 *
 *   bun add -d canvas      # or: npm i -D canvas
 *
 * To swap in your OWN art, just replace public/brand-reel.png with a wide PNG
 * laid out as N equal panels side by side (see the component README). You do not
 * need this script at all if you supply your own file.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { drawDemoReel } from "../src/components/atoms/strip-effect/reel-draw.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Target reel resolution. Very wide (8:1) so each panel stays crisp as it
// passes the flat front. Keep these in sync with config.panelCount/colorways.
const WIDTH = 8192;
const HEIGHT = 1024;
const PANEL_COUNT = 6;

// Colourways mirror config.ts (kept here so the baker has zero TS deps).
const COLORWAYS = [
  { top: "#dfe6ec", bottom: "#7b8794", ink: "#ff3b1d", accent: "#0a84ff" },
  { top: "#fff1c9", bottom: "#c79a2e", ink: "#1a1a1a", accent: "#ff2d95" },
  { top: "#d6f5ff", bottom: "#3a8fb0", ink: "#002b5c", accent: "#00e0a4" },
  { top: "#ffd9e8", bottom: "#b03a6e", ink: "#2a0a1a", accent: "#ffd400" },
  { top: "#e6ffe1", bottom: "#4e9e4a", ink: "#0a2a0a", accent: "#ff6a00" },
  { top: "#e9e2ff", bottom: "#6a52c7", ink: "#170a3a", accent: "#00d0ff" },
];

async function main() {
  let createCanvas;
  try {
    ({ createCanvas } = await import("canvas"));
  } catch {
    console.error(
      "\n[generate-brand-reel] The optional `canvas` package is not installed.\n" +
        "Install it once with:  bun add -d canvas   (or: npm i -D canvas)\n" +
        "Then re-run:           node scripts/generate-brand-reel.mjs\n\n" +
        "Note: you don't need this at all — the site auto-generates a live\n" +
        "placeholder reel in the browser when public/brand-reel.png is absent.\n",
    );
    process.exit(1);
  }

  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext("2d");

  drawDemoReel(ctx, {
    width: WIDTH,
    height: HEIGHT,
    panelCount: PANEL_COUNT,
    colorways: COLORWAYS,
    grain: 0.06,
  });

  const out = resolve(__dirname, "../public/brand-reel.png");
  writeFileSync(out, canvas.toBuffer("image/png"));
  console.log(`[generate-brand-reel] wrote ${out} (${WIDTH}x${HEIGHT})`);
}

main();
