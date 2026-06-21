/**
 * reel-texture — Brand surface mode A (baked reel)
 * ------------------------------------------------
 * Loads the wide brand-reel PNG and configures it for scrolling along the
 * ribbon's length (wrapS = RepeatWrapping, max anisotropy, offset.x animated by
 * the scene). If the PNG is missing (so the demo runs with ZERO supplied art),
 * we draw the placeholder reel onto an offscreen canvas with the exact same
 * routine the Node baker uses (reel-draw.mjs) and use that instead.
 */
import * as THREE from "three";
import { config, type StripConfig } from "./config";
import { drawDemoReel } from "./reel-draw.mjs";

/** Dimensions for the live-generated fallback reel (wide, 8:1). */
const FALLBACK_WIDTH = 4096; // half of the 8192 baked target — plenty for screen
const FALLBACK_HEIGHT = 512;

function configureTexture(tex: THREE.Texture, maxAnisotropy: number): THREE.Texture {
  tex.wrapS = THREE.RepeatWrapping; // scroll along ribbon length
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.anisotropy = maxAnisotropy; // sharp at grazing angles as panels curl away
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

/** Draw the placeholder reel to an offscreen canvas and wrap it as a texture. */
function generateFallbackTexture(
  c: StripConfig,
  maxAnisotropy: number,
): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = FALLBACK_WIDTH;
  canvas.height = FALLBACK_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    drawDemoReel(ctx, {
      width: FALLBACK_WIDTH,
      height: FALLBACK_HEIGHT,
      panelCount: c.panelCount,
      colorways: c.colorways,
      grain: 0.04,
    });
  }
  const tex = new THREE.CanvasTexture(canvas);
  return configureTexture(tex, maxAnisotropy);
}

/**
 * Resolve the brand-reel texture. Tries the baked PNG first, falls back to the
 * live-generated demo reel on any load error (e.g. 404 before you supply art).
 *
 * @param maxAnisotropy renderer.capabilities.getMaxAnisotropy()
 */
export function loadReelTexture(
  maxAnisotropy: number,
  c: StripConfig = config,
): Promise<THREE.Texture> {
  return new Promise((resolve) => {
    const loader = new THREE.TextureLoader();
    loader.load(
      c.reelSrc,
      (tex) => resolve(configureTexture(tex, maxAnisotropy)),
      undefined,
      () => {
        // No baked art on disk — generate the placeholder so the demo still runs.
        console.info(
          `[strip-effect] ${c.reelSrc} not found — generating placeholder reel. ` +
            `Run \`node scripts/generate-brand-reel.mjs\` or drop your own PNG there.`,
        );
        resolve(generateFallbackTexture(c, maxAnisotropy));
      },
    );
  });
}
