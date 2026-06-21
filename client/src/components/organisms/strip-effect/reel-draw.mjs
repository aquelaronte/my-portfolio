/**
 * reel-draw — the placeholder brand-reel artwork generator
 * --------------------------------------------------------
 * Pure, framework-agnostic Canvas2D drawing. It runs against any standard
 * CanvasRenderingContext2D, which means the *same* code is used by:
 *
 *   - the runtime fallback (browser <canvas>) when /brand-reel.png is absent,
 *     so the effect runs immediately with zero supplied art; and
 *   - scripts/generate-brand-reel.mjs (node-canvas) to BAKE a real PNG.
 *
 * The reel is N brand "panels" laid out side by side along the wide axis, each
 * a different colourway, styled as 90s–2000s industrial retro-futurism:
 * chrome/aluminium ramps, warning-stripe diagonals, blueprint grid, halftone,
 * registration/crop marks, a bevelled wordmark, and a deliberate CMYK
 * mis-registration glitch.
 *
 * EXPECTED LAYOUT (so you can swap your own art): the texture is `width` x
 * `height` and is divided into `panelCount` equal-width panels. Panel k spans
 * u = [k/panelCount, (k+1)/panelCount]. The ribbon maps u 0..1 along its length,
 * so each panel becomes one readable face as it passes the flat front. Keep the
 * texture wide (e.g. 8192x1024) and seamless left<->right if you want a clean
 * wrap. See README.md.
 *
 * @typedef {{ top:string, bottom:string, ink:string, accent:string }} Colorway
 */

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {{
 *   width:number, height:number, panelCount:number,
 *   colorways:Colorway[],
 *   labels?:string[],            // optional per-panel wordmarks (defaults below)
 *   grain?:number                // 0..1 static speckle amount baked into the art
 * }} opts
 */
export function drawDemoReel(ctx, opts) {
  const {
    width,
    height,
    panelCount,
    colorways,
    labels = DEFAULT_LABELS,
    grain = 0.05,
  } = opts;

  const panelW = width / panelCount;

  // Clean light backdrop behind everything (also the "paper" colour).
  ctx.fillStyle = "#f4f1ea";
  ctx.fillRect(0, 0, width, height);

  for (let k = 0; k < panelCount; k++) {
    const cw = colorways[k % colorways.length];
    const label = labels[k % labels.length];
    const x0 = k * panelW;
    drawPanel(ctx, x0, 0, panelW, height, cw, label, k);
  }

  if (grain > 0) drawStaticGrain(ctx, width, height, grain);
}

const DEFAULT_LABELS = [
  "BRAND",
  "STUDIO",
  "SYSTEM",
  "FUTURE",
  "INDEX",
  "SERIES",
];

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x0 @param {number} y0 @param {number} w @param {number} h
 * @param {Colorway} cw @param {string} label @param {number} index
 */
function drawPanel(ctx, x0, y0, w, h, cw, label, index) {
  ctx.save();
  // Clip to the panel so nothing bleeds into its neighbour.
  ctx.beginPath();
  ctx.rect(x0, y0, w, h);
  ctx.clip();

  // 1. Chrome / aluminium vertical gradient ramp.
  const ramp = ctx.createLinearGradient(0, y0, 0, y0 + h);
  ramp.addColorStop(0.0, cw.top);
  ramp.addColorStop(0.42, mix(cw.top, "#ffffff", 0.35));
  ramp.addColorStop(0.5, "#ffffff");
  ramp.addColorStop(0.58, mix(cw.bottom, "#ffffff", 0.25));
  ramp.addColorStop(1.0, cw.bottom);
  ctx.fillStyle = ramp;
  ctx.fillRect(x0, y0, w, h);

  // 2. Blueprint grid lines.
  ctx.strokeStyle = withAlpha(cw.accent, 0.18);
  ctx.lineWidth = Math.max(1, h * 0.0016);
  const grid = h / 16;
  ctx.beginPath();
  for (let gx = x0; gx <= x0 + w; gx += grid) {
    ctx.moveTo(gx, y0);
    ctx.lineTo(gx, y0 + h);
  }
  for (let gy = y0; gy <= y0 + h; gy += grid) {
    ctx.moveTo(x0, gy);
    ctx.lineTo(x0 + w, gy);
  }
  ctx.stroke();

  // 3. Warning-stripe diagonal bands (top + bottom).
  drawWarningBand(ctx, x0, y0 + h * 0.06, w, h * 0.1, cw.ink);
  drawWarningBand(ctx, x0, y0 + h * 0.84, w, h * 0.1, cw.ink);

  // 4. Halftone dots (concentrated lower-right for a printed-ink feel).
  drawHalftone(ctx, x0, y0, w, h, cw.ink);

  // 5. Bevel / emboss frame.
  const inset = h * 0.035;
  ctx.lineWidth = Math.max(2, h * 0.006);
  ctx.strokeStyle = withAlpha("#ffffff", 0.55);
  ctx.strokeRect(x0 + inset, y0 + inset, w - inset * 2, h - inset * 2);
  ctx.strokeStyle = withAlpha("#000000", 0.35);
  ctx.strokeRect(x0 + inset * 1.4, y0 + inset * 1.4, w - inset * 2.8, h - inset * 2.8);

  // 6. Wordmark with CMYK mis-registration glitch.
  drawWordmark(ctx, x0 + w / 2, y0 + h * 0.5, h, label, cw.ink);

  // 7. Editorial / OCR metadata.
  drawMeta(ctx, x0, y0, w, h, cw, label, index);

  // 8. Registration target + crop marks at the corners.
  drawCropMarks(ctx, x0, y0, w, h, cw.ink);
  drawRegistrationTarget(ctx, x0 + w * 0.5, y0 + h * 0.16, h * 0.05, cw.ink);

  ctx.restore();
}

/** Diagonal hazard stripes inside a horizontal band. */
function drawWarningBand(ctx, x, y, w, h, ink) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.fillStyle = withAlpha(ink, 0.85);
  const step = h * 0.9;
  for (let sx = x - h; sx < x + w + h; sx += step * 2) {
    ctx.beginPath();
    ctx.moveTo(sx, y + h);
    ctx.lineTo(sx + h, y);
    ctx.lineTo(sx + h + step, y);
    ctx.lineTo(sx + step, y + h);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

/** Halftone dot field, density ramping toward the lower-right. */
function drawHalftone(ctx, x0, y0, w, h, ink) {
  ctx.save();
  ctx.fillStyle = withAlpha(ink, 0.22);
  const cell = h / 26;
  for (let gy = y0; gy < y0 + h; gy += cell) {
    for (let gx = x0; gx < x0 + w; gx += cell) {
      const fx = (gx - x0) / w;
      const fy = (gy - y0) / h;
      const r = cell * 0.12 + cell * 0.34 * fx * fy;
      ctx.beginPath();
      ctx.arc(gx + cell / 2, gy + cell / 2, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

/** Bold condensed wordmark, drawn 3x (C, M, K) with slight offsets. */
function drawWordmark(ctx, cx, cy, h, label, ink) {
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const size = h * 0.3;
  // Eurostile / Bank-Gothic-ish: condensed, heavy, geometric. Fall back through
  // a stack that degrades sensibly in node-canvas too.
  ctx.font = `800 ${size}px "Eurostile", "Bank Gothic", "Arial Narrow", "Helvetica Neue", Arial, sans-serif`;

  const o = h * 0.012; // mis-registration offset
  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = "#00aeef"; // cyan plate
  ctx.fillText(label, cx - o, cy + o * 0.6);
  ctx.fillStyle = "#ec008c"; // magenta plate
  ctx.fillText(label, cx + o, cy - o * 0.4);
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = ink; // key (black/ink) plate on top
  ctx.fillText(label, cx, cy);

  // Outline keeps it crisp against busy panels.
  ctx.lineWidth = Math.max(1, h * 0.004);
  ctx.strokeStyle = withAlpha("#000000", 0.4);
  ctx.strokeText(label, cx, cy);
  ctx.restore();
}

/** Small editorial / OCR text blocks, swiss-grid aligned. */
function drawMeta(ctx, x0, y0, w, h, cw, label, index) {
  ctx.save();
  ctx.fillStyle = withAlpha("#101010", 0.8);
  ctx.textBaseline = "alphabetic";
  const small = h * 0.045;
  ctx.font = `600 ${small}px "OCR A Std", "Courier New", monospace`;

  ctx.textAlign = "left";
  const pad = w * 0.06;
  ctx.fillText(`NO.${String(index + 1).padStart(2, "0")}`, x0 + pad, y0 + h * 0.74);
  ctx.fillText(`REEL/${label}`, x0 + pad, y0 + h * 0.79);

  ctx.textAlign = "right";
  ctx.fillText("C M Y K", x0 + w - pad, y0 + h * 0.74);
  ctx.fillText(cw.ink.toUpperCase(), x0 + w - pad, y0 + h * 0.79);
  ctx.restore();
}

/** L-shaped crop marks just inside each corner. */
function drawCropMarks(ctx, x0, y0, w, h, ink) {
  ctx.save();
  ctx.strokeStyle = withAlpha(ink, 0.85);
  ctx.lineWidth = Math.max(1, h * 0.004);
  const m = h * 0.05; // length
  const inset = h * 0.02;
  const corners = [
    [x0 + inset, y0 + inset, 1, 1],
    [x0 + w - inset, y0 + inset, -1, 1],
    [x0 + inset, y0 + h - inset, 1, -1],
    [x0 + w - inset, y0 + h - inset, -1, -1],
  ];
  ctx.beginPath();
  for (const [cx, cy, sx, sy] of corners) {
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + m * sx, cy);
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx, cy + m * sy);
  }
  ctx.stroke();
  ctx.restore();
}

/** Classic registration target (crosshair + ring). */
function drawRegistrationTarget(ctx, cx, cy, r, ink) {
  ctx.save();
  ctx.strokeStyle = withAlpha(ink, 0.85);
  ctx.lineWidth = Math.max(1, r * 0.12);
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.moveTo(cx - r * 1.6, cy);
  ctx.lineTo(cx + r * 1.6, cy);
  ctx.moveTo(cx, cy - r * 1.6);
  ctx.lineTo(cx, cy + r * 1.6);
  ctx.stroke();
  ctx.restore();
}

/** Sparse static speckle so the baked art has tooth even before the shader. */
function drawStaticGrain(ctx, width, height, amount) {
  ctx.save();
  const count = Math.floor(width * height * 0.00025 * amount * 20);
  for (let i = 0; i < count; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const a = Math.random() * 0.12 * amount * 10;
    ctx.fillStyle = `rgba(0,0,0,${a.toFixed(3)})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }
  ctx.restore();
}

/* ---- tiny colour helpers (hex only, no deps) ---------------------------- */

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  return [
    parseInt(n.slice(0, 2), 16),
    parseInt(n.slice(2, 4), 16),
    parseInt(n.slice(4, 6), 16),
  ];
}

function mix(a, b, t) {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  const r = Math.round(ca[0] + (cb[0] - ca[0]) * t);
  const g = Math.round(ca[1] + (cb[1] - ca[1]) * t);
  const bl = Math.round(ca[2] + (cb[2] - ca[2]) * t);
  return `rgb(${r},${g},${bl})`;
}

function withAlpha(hex, a) {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}
