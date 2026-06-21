/**
 * strip-effect — central configuration
 * ------------------------------------
 * Every tunable lives here so the whole effect can be re-shaped without
 * touching the rendering code. See ./README.md for a guided tour of the most
 * useful knobs (curve shape + how to swap the brand art).
 *
 * Units are "world units"; the camera looks at the origin, so think of the
 * visible area as roughly -8..8 on X and -4.5..4.5 on Y at the default FOV.
 */

export type Vec3 = [number, number, number];

export type Colorway = {
  /** Background ramp top colour (chrome / aluminium highlight). */
  top: string;
  /** Background ramp bottom colour (shadow side of the bevel). */
  bottom: string;
  /** Ink / accent used for the wordmark + warning stripes. */
  ink: string;
  /** Secondary accent used for blueprint grid + registration marks. */
  accent: string;
};

export type TextureMode = "baked" | "procedural";

export interface StripConfig {
  /* ---- Ribbon spine ------------------------------------------------------ */
  /**
   * Control points for the CatmullRomCurve3 spine, ordered tail -> head.
   * The ribbon sweeps in from the lower-left and receding (-x, -y, -z),
   * arcs up and TOWARD the camera to a near-flat camera-facing panel in the
   * middle, then curls back and away into the upper area.
   * Retune these first when you want a different sweep — see README.
   */
  controlPoints: Vec3[];
  /** Width of the flat strip across its short axis (world units). */
  ribbonWidth: number;
  /** How many points to sample along the curve. Higher = smoother curl. */
  sampleCount: number;
  /** Mobile override for sampleCount (degrades for perf on small screens). */
  sampleCountMobile: number;

  /* ---- Twist / roll ------------------------------------------------------ */
  /** Enable the subtle Möbius-style roll along the ribbon length. */
  rollEnabled: boolean;
  /** Max roll angle (radians) reached at the head of the ribbon. */
  rollAmount: number;

  /* ---- Animation --------------------------------------------------------- */
  /** Continuous auto-scroll of the UV offset, in UV units per second. */
  scrollSpeed: number;
  /** How strongly page scroll nudges the ribbon offset (0 = ignore scroll). */
  scrollCoupling: number;
  /** Lerp factor (per second) used to smooth the scroll-coupled velocity. */
  scrollLerp: number;
  /** Amplitude of the idle camera/ribbon drift so it's never fully static. */
  idleDrift: number;

  /* ---- Brand surface ----------------------------------------------------- */
  /** Which surface to draw: a baked reel texture (A) or a shader (B). */
  textureMode: TextureMode;
  /** Path to the baked reel PNG. If it 404s we generate a demo reel live. */
  reelSrc: string;
  /** Number of brand panels repeated along the ribbon length. */
  panelCount: number;
  /** Per-panel colorways, cycled across panelCount. */
  colorways: Colorway[];

  /* ---- Overlay (scanlines + grain, both modes) --------------------------- */
  /** Scanline strength (0..1). */
  scanlineIntensity: number;
  /** Film-grain strength (0..1). */
  grainIntensity: number;
  /** CMYK mis-registration fringe strength (procedural mode), in UV units. */
  cmykFringe: number;

  /* ---- Gloss ------------------------------------------------------------- */
  /** Fresnel rim gloss strength so the strip reads as glossy print, not matte. */
  glossStrength: number;

  /* ---- Camera ------------------------------------------------------------ */
  cameraFov: number;
  cameraPosition: Vec3;

  /* ---- Contact shadow ---------------------------------------------------- */
  /** Opacity of the soft blurred contact shadow under the flat section. */
  shadowOpacity: number;
}

/**
 * The default colorway list — a multicolour retro-futurist reel. Each panel
 * uses a different ramp so the strip reads as a printed sample swatch book.
 */
const COLORWAYS: Colorway[] = [
  { top: "#dfe6ec", bottom: "#7b8794", ink: "#ff3b1d", accent: "#0a84ff" }, // chrome / red
  { top: "#fff1c9", bottom: "#c79a2e", ink: "#1a1a1a", accent: "#ff2d95" }, // gold / magenta
  { top: "#d6f5ff", bottom: "#3a8fb0", ink: "#002b5c", accent: "#00e0a4" }, // ice / teal
  { top: "#ffd9e8", bottom: "#b03a6e", ink: "#2a0a1a", accent: "#ffd400" }, // candy / yellow
  { top: "#e6ffe1", bottom: "#4e9e4a", ink: "#0a2a0a", accent: "#ff6a00" }, // mint / orange
  { top: "#e9e2ff", bottom: "#6a52c7", ink: "#170a3a", accent: "#00d0ff" }, // violet / cyan
];

export const config: StripConfig = {
  /* Spine — tail (lower-left, receding) ... head (upper, curling away).      */
  controlPoints: [
    [-7.0, -4.6, -3.0], // enters lower-left, sweeping in toward the camera
    [-4.2, -2.7, 0.4], // rising up-right
    [-1.2, -0.7, 1.8], // approaching the flat front panel
    [2.0, 0.7, 1.9], // the readable, camera-facing panel (near, flat)
    [4.8, 2.5, 0.2], // curling up-right, still near (stays colourful in frame)
    [7.2, 4.5, -3.2], // exits upper-right, receding away
  ],
  ribbonWidth: 3.1,
  sampleCount: 420,
  sampleCountMobile: 200,

  rollEnabled: true,
  rollAmount: 0.22,

  scrollSpeed: 0.035,
  scrollCoupling: 0.0009,
  scrollLerp: 3.2,
  idleDrift: 0.08,

  textureMode: "baked",
  reelSrc: "/brand-reel.png",
  panelCount: 6,
  colorways: COLORWAYS,

  scanlineIntensity: 0.12,
  grainIntensity: 0.07,
  cmykFringe: 0.0016,

  glossStrength: 0.5,

  cameraFov: 34,
  cameraPosition: [0, 0.4, 11.5],

  shadowOpacity: 0.28,
};

/** Convenience: pick the colorway for a given panel index (wraps). */
export function colorwayFor(index: number, c: StripConfig = config): Colorway {
  return c.colorways[index % c.colorways.length];
}
