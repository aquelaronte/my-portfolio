/**
 * ribbon-material — unified surface shader (modes A + B)
 * -----------------------------------------------------
 * A single ShaderMaterial drives both brand-surface modes so the overlay and
 * gloss are shared and consistent:
 *
 *   A) baked   (uMode = 0): samples the wide reel texture (reel-texture.ts).
 *   B) procedural (uMode = 1): draws the brand panels procedurally — repeating
 *      cells along u, per-cell colourway, chrome ramp, warning stripes,
 *      blueprint grid, and a CMYK mis-registration fringe.
 *
 * Both modes then get, on top:
 *   - an animated scanline + film-grain overlay (so even the baked surface feels
 *     alive), and
 *   - a faint fresnel gloss so the strip reads as a glossy printed sample, not
 *     a matte sheet.
 *
 * Foreshortening blur is NOT faked here — it falls out of the perspective camera
 * + texture anisotropy as each panel curls away from the flat front.
 */
import * as THREE from "three";
import { config, type StripConfig } from "./config";

const MAX_PANELS = 8; // GLSL array cap; panelCount is clamped to this

function hexToVec3(hex: string): THREE.Vector3 {
  const c = new THREE.Color(hex);
  return new THREE.Vector3(c.r, c.g, c.b);
}

/** 1×1 white texture so the uMap sampler is always bound (procedural mode and
 *  the frames before the baked reel finishes loading). */
function fallbackTexture(): THREE.DataTexture {
  const tex = new THREE.DataTexture(
    new Uint8Array([255, 255, 255, 255]),
    1,
    1,
    THREE.RGBAFormat,
  );
  tex.needsUpdate = true;
  return tex;
}

function colorwayArrays(c: StripConfig) {
  const top: THREE.Vector3[] = [];
  const bottom: THREE.Vector3[] = [];
  const ink: THREE.Vector3[] = [];
  const accent: THREE.Vector3[] = [];
  for (let i = 0; i < MAX_PANELS; i++) {
    const cw = c.colorways[i % c.colorways.length];
    top.push(hexToVec3(cw.top));
    bottom.push(hexToVec3(cw.bottom));
    ink.push(hexToVec3(cw.ink));
    accent.push(hexToVec3(cw.accent));
  }
  return { top, bottom, ink, accent };
}

export function createRibbonMaterial(
  texture: THREE.Texture | null,
  c: StripConfig = config,
): THREE.ShaderMaterial {
  const cw = colorwayArrays(c);

  return new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    uniforms: {
      uMode: { value: c.textureMode === "procedural" ? 1 : 0 },
      uMap: { value: texture ?? fallbackTexture() },
      uOffset: { value: 0 },
      uTime: { value: 0 },
      uPanelCount: { value: Math.min(c.panelCount, MAX_PANELS) },
      uColorwayCount: { value: Math.min(c.colorways.length, MAX_PANELS) },
      uTop: { value: cw.top },
      uBottom: { value: cw.bottom },
      uInk: { value: cw.ink },
      uAccent: { value: cw.accent },
      uScanline: { value: c.scanlineIntensity },
      uGrain: { value: c.grainIntensity },
      uCmyk: { value: c.cmykFringe },
      uGloss: { value: c.glossStrength },
      uLightDir: { value: new THREE.Vector3(0.3, 0.6, 0.8).normalize() },
      uCameraPos: { value: new THREE.Vector3() },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      varying vec3 vWorldNormal;
      varying vec3 vWorldPos;

      void main() {
        vUv = uv;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;
        vWorldNormal = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;

      varying vec2 vUv;
      varying vec3 vWorldNormal;
      varying vec3 vWorldPos;

      uniform int   uMode;
      uniform sampler2D uMap;
      uniform float uOffset;
      uniform float uTime;
      uniform float uPanelCount;
      uniform int   uColorwayCount;
      uniform vec3  uTop[${MAX_PANELS}];
      uniform vec3  uBottom[${MAX_PANELS}];
      uniform vec3  uInk[${MAX_PANELS}];
      uniform vec3  uAccent[${MAX_PANELS}];
      uniform float uScanline;
      uniform float uGrain;
      uniform float uCmyk;
      uniform float uGloss;
      uniform vec3  uLightDir;
      uniform vec3  uCameraPos;

      // Cheap hash noise for the grain pass.
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      // Pick colourway component for a given (wrapped) panel index. GLSL ES 1.0
      // forbids dynamic uniform-array indexing, so select via a bounded loop.
      vec3 pick(int which, int idx) {
        vec3 r = vec3(0.0);
        for (int i = 0; i < ${MAX_PANELS}; i++) {
          if (i == idx) {
            if (which == 0) r = uTop[i];
            else if (which == 1) r = uBottom[i];
            else if (which == 2) r = uInk[i];
            else r = uAccent[i];
          }
        }
        return r;
      }

      // --- Mode B: procedural brand panel at a given u --------------------
      vec3 proceduralAt(float u, vec2 uv) {
        float cellF = u * uPanelCount;
        int idx = int(mod(floor(cellF), float(uColorwayCount)));
        float cf = fract(cellF); // 0..1 across the panel

        vec3 top = pick(0, idx);
        vec3 bottom = pick(1, idx);
        vec3 ink = pick(2, idx);
        vec3 accent = pick(3, idx);

        // Chrome / aluminium vertical ramp with a bright centre line.
        vec3 col = mix(bottom, top, uv.y);
        col += vec3(smoothstep(0.46, 0.5, uv.y) - smoothstep(0.5, 0.54, uv.y)) * 0.5;

        // Blueprint grid.
        vec2 g = abs(fract(vec2(cf, uv.y) * 12.0) - 0.5);
        float grid = smoothstep(0.0, 0.04, min(g.x, g.y));
        col = mix(col, accent, (1.0 - grid) * 0.18);

        // Warning-stripe diagonals top + bottom.
        float band = step(uv.y, 0.12) + step(0.88, uv.y);
        float stripe = step(0.5, fract((cf * uPanelCount * 4.0 + uv.y) * 6.0));
        col = mix(col, ink, band * stripe * 0.85);

        // Central wordmark bar (abstract glyph block).
        float mark = step(0.30, cf) * step(cf, 0.70) *
                     step(0.40, uv.y) * step(uv.y, 0.60);
        col = mix(col, ink, mark);

        // Registration crosshair near the top.
        vec2 rp = vec2(cf - 0.5, uv.y - 0.18);
        float cross = step(abs(rp.x), 0.004) + step(abs(rp.y), 0.008);
        float ring = smoothstep(0.05, 0.045, length(rp));
        col = mix(col, ink, clamp(cross * step(length(rp), 0.06) + ring, 0.0, 1.0));

        return col;
      }

      // Sample the surface colour with a CMYK mis-registration fringe.
      vec3 surface(float u, vec2 uv) {
        if (uMode == 0) {
          // Mode A: baked reel. Fringe = per-channel u offset.
          float r = texture2D(uMap, vec2(fract(u + uCmyk), uv.y)).r;
          float g = texture2D(uMap, vec2(fract(u), uv.y)).g;
          float b = texture2D(uMap, vec2(fract(u - uCmyk), uv.y)).b;
          return vec3(r, g, b);
        } else {
          // Mode B: procedural, with cyan/magenta plates split off the key.
          vec3 base = proceduralAt(u, uv);
          vec3 cyan = proceduralAt(u + uCmyk, uv);
          vec3 mag  = proceduralAt(u - uCmyk, uv);
          return vec3(mag.r, base.g, cyan.b) * 0.5 + base * 0.5;
        }
      }

      void main() {
        float u = fract(vUv.x + uOffset);
        vec3 color = surface(u, vUv);

        // Lighting: half-lambert + double-sided normal handling.
        vec3 N = normalize(vWorldNormal);
        if (!gl_FrontFacing) N = -N;
        float ndl = dot(N, normalize(uLightDir)) * 0.5 + 0.5;
        color *= mix(0.78, 1.12, ndl);

        // Fresnel gloss — glossy printed strip, not matte.
        vec3 V = normalize(uCameraPos - vWorldPos);
        float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 4.0);
        color += fres * uGloss * vec3(1.0);

        // Scanlines (animated drift).
        float scan = sin((vUv.x * 1600.0) + uTime * 2.0) * 0.5 + 0.5;
        color *= 1.0 - uScanline * scan;

        // Film grain (animated).
        float grain = hash(vUv * 1024.0 + uTime) - 0.5;
        color += grain * uGrain;

        gl_FragColor = vec4(color, 1.0);
      }
    `,
  });
}
