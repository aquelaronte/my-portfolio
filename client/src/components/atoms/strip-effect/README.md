# strip-effect — 3D curling "tape" hero

A long flat strip wrapped onto a 3D curve. It sweeps in from the lower-left and
receding, flattens to face the camera in the middle (the readable panel), then
curls back and away. The surface shows a repeating multicolour **brand reel**
styled as 90s–2000s industrial retro-futurism, sitting **between two DOM type
layers** so a giant headline weaves over and under it. As it animates, the
texture scrolls along the ribbon's length, so each brand panel reads sharply at
the flat front and foreshortens/blurs as it curls away.

> The foreshortening blur is **real** — it comes from the perspective camera plus
> texture anisotropy as panels turn away from the viewer. There is no blur filter.

## Quick start

```astro
---
import StripEffect from "@/components/atoms/strip-effect.astro";
---
<StripEffect headline={"RETRO\nFUTURE"} kicker="Industrial Reel — Vol. 01" />
```

Open `/strip-demo` in dev (`bun run dev`) to see it running immediately with the
**live placeholder reel** — zero art required.

## Files

| File | Role |
| --- | --- |
| `config.ts` | **Every tunable.** Curve, width, samples, animation, camera, shadow, colourways. |
| `ribbon-geometry.ts` | The core mechanism: Catmull-Rom spine → sampled, parallel-transported strip `BufferGeometry`. |
| `ribbon-material.ts` | Unified `ShaderMaterial` — baked (A) + procedural (B), scanline/grain overlay, fresnel gloss. |
| `reel-texture.ts` | Mode A loader: baked PNG, with live canvas fallback. |
| `reel-draw.mjs` | The placeholder reel artwork (shared by runtime fallback **and** the Node baker). |
| `shadow.ts` | Soft blurred contact shadow tracking the flat section. |
| `scene.ts` | Renderer, camera, animation loop, scroll coupling, idle drift, resize, mobile degrade. |
| `../strip-effect.astro` | DOM layering (type layers + canvas) and boot. |
| `../../../../scripts/generate-brand-reel.mjs` | Optional: bake the demo reel to `public/brand-reel.png`. |

## Implementation note: vanilla three.js, not R3F

The brief mentioned `@react-three/fiber` / `drei`, but this project is **pure
Astro + vanilla three.js** (there is no React anywhere — see `ascii-globe.astro`).
The core mechanism (a hand-built `BufferGeometry` from a `CatmullRomCurve3` with
a parallel-transport frame) is plain three.js regardless, so it's implemented
with vanilla three to match the codebase. Porting to R3F would mean wrapping
`scene.ts` in a `<Canvas>` and the geometry/material in components — the math is
unchanged.

## Brand surface — two modes

Set `textureMode` in `config.ts`.

### A) Baked reel (default)

A wide PNG at `public/brand-reel.png`, divided into `panelCount` equal panels
laid side by side. Panel _k_ spans `u = [k/panelCount, (k+1)/panelCount]`. The
ribbon maps `u` 0..1 once along its length, so each panel becomes one readable
face as it passes the flat front; `texture.offset.x` scrolls them through.

**If the PNG is missing, the effect still runs** — `reel-texture.ts` draws the
demo reel onto an offscreen canvas (via `reel-draw.mjs`) and uses that. So you
get a working hero with zero supplied art.

### B) Procedural shader

Set `textureMode: "procedural"`. `ribbon-material.ts` draws the panels in the
fragment shader: repeating cells along `u`, per-cell colourway, chrome ramp,
blueprint grid, warning stripes, an abstract wordmark block, and a CMYK
mis-registration fringe. No art, no texture upload.

Both modes get the animated scanline + grain overlay and the fresnel gloss.

## Swapping in your own art

1. **Drop a file.** Replace `public/brand-reel.png` with a wide PNG (recommended
   `8192×1024`, very wide aspect). Lay it out as `panelCount` equal-width panels
   side by side, each a different colourway. For a seamless wrap, make the left
   and right edges line up.
2. **Match the panel count.** Set `config.panelCount` to the number of panels in
   your image.
3. **(Optional) Re-bake the placeholder.** `node scripts/generate-brand-reel.mjs`
   writes a fresh demo PNG (needs the optional `canvas` package — see the script
   header). You don't need this if you supply your own art.

To restyle the **demo** art itself, edit `reel-draw.mjs` (gradients, stripes,
halftone, wordmark, crop marks all live there) — changes show up in both the live
fallback and the baked PNG.

## Retuning the curve

The ribbon shape is just the `controlPoints` in `config.ts` — six `[x, y, z]`
points ordered **tail → head**:

- The camera looks at the origin from `cameraPosition` (`+z` is toward the
  viewer). Visible area is roughly `x ∈ [-8, 8]`, `y ∈ [-4.5, 4.5]`.
- Point 0 is the off-screen tail (lower-left, negative `z` = receding).
- The **middle** points (indices 2–3) form the flat, camera-facing readable panel
  — keep their `z` near the front and their `y` close together so that section
  stays flat and legible.
- The last point is the off-screen head (upper area, negative `z` = curling away).

Tips:
- Want a longer flat front? Move points 2 and 3 farther apart in `x` at similar
  `y`/`z`.
- Curl harder at the ends? Push the tail/head points more negative in `z`.
- The spine uses **centripetal** Catmull-Rom, which avoids cusps on sharp control
  polygons — you can place points fairly aggressively without kinks.
- `ribbonWidth` sets the strip's short-axis size; `sampleCount` its smoothness.

### Twist

`rollEnabled` / `rollAmount` add a subtle Möbius roll that ramps toward the ends
while keeping the centre flat (so the front panel stays readable). Set
`rollAmount: 0` to disable.

## Animation & performance

- **Auto-scroll:** `scrollSpeed` (UV units/sec), framerate-independent.
- **Scroll coupling:** page-scroll velocity nudges the offset, smoothed by
  `scrollLerp` (no jank). Strength = `scrollCoupling`.
- **Idle drift:** `idleDrift` gives a gentle camera sway so it's never static.
- **Mobile:** `sampleCountMobile` replaces `sampleCount` below 768px.
- **Reduced motion:** `prefers-reduced-motion` slows the auto-scroll and disables
  drift.
- Geometry is ~`2 × sampleCount` vertices (trivial); 60fps on a normal laptop.

## Layering (how the weave works)

One stacking context inside `strip-effect.astro`:

```
z-0   back type layer   — the full headline
z-10  <canvas>          — transparent WebGL ribbon
z-20  front type layer  — clipped copy of the SAME headline (lower portion only)
```

The front copy is `clip-path: inset(52% 0 0 0)`, so the ribbon passes **behind**
the tops of the letters and **in front of** their feet → a woven look. Both type
layers are positioned identically so they register exactly; tune the inset in the
component `<style>`.
