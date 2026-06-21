/**
 * scene — renderer / camera / animation loop
 * ------------------------------------------
 * Boots the whole effect into a given <canvas>:
 *   - transparent WebGL renderer (the DOM type layers show through)
 *   - perspective camera (the foreshortening blur as panels curl is REAL, from
 *     this camera + texture anisotropy — never a blur filter)
 *   - the ribbon mesh (geometry + unified material), plus the contact shadow
 *   - a delta-time loop that: auto-scrolls the UV offset, couples page scroll
 *     into the offset (smoothed, framerate-independent), and adds a subtle idle
 *     camera drift so it's never fully static.
 *
 * Returns a disposer; call it on unmount to stop the loop and free GPU memory.
 */
import * as THREE from "three";
import { config, type StripConfig } from "./config";
import { buildRibbonGeometry } from "./ribbon-geometry";
import { createRibbonMaterial } from "./ribbon-material";
import { loadReelTexture } from "./reel-texture";
import { createContactShadow } from "./shadow";

const MOBILE_QUERY = "(max-width: 768px)";

export function initStripEffect(
  canvas: HTMLCanvasElement,
  c: StripConfig = config,
): () => void {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isMobile = window.matchMedia(MOBILE_QUERY).matches;
  const sampleCount = isMobile ? c.sampleCountMobile : c.sampleCount;

  // --- Renderer (transparent) --------------------------------------------
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

  // --- Scene + camera -----------------------------------------------------
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(c.cameraFov, 1, 0.1, 100);
  const [cx, cy, cz] = c.cameraPosition;
  camera.position.set(cx, cy, cz);
  camera.lookAt(0, 0, 0);

  // --- Ribbon -------------------------------------------------------------
  const { geometry, curve } = buildRibbonGeometry(c, sampleCount);
  const material = createRibbonMaterial(null, c);
  const ribbon = new THREE.Mesh(geometry, material);
  scene.add(ribbon);

  // Soft contact shadow tracking the flat section.
  const shadow = createContactShadow(curve, c);
  scene.add(shadow);

  // Baked mode: load the reel texture asynchronously (falls back to the live
  // placeholder reel if the PNG is missing). Procedural mode needs no texture.
  if (c.textureMode === "baked") {
    loadReelTexture(maxAnisotropy, c).then((tex) => {
      material.uniforms.uMap.value = tex;
      material.needsUpdate = true;
    });
  }

  // --- Sizing -------------------------------------------------------------
  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  // --- Animation state ----------------------------------------------------
  const clock = new THREE.Clock();
  let offset = 0;
  let smoothedScrollSpeed = 0;
  let lastScrollY = window.scrollY;
  const autoSpeed = reducedMotion ? c.scrollSpeed * 0.4 : c.scrollSpeed;
  const driftAmp = reducedMotion ? 0 : c.idleDrift;
  let frame = 0;

  function tick() {
    frame = requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 0.05); // clamp huge tab-switch deltas
    const elapsed = clock.elapsedTime;

    // Scroll coupling: convert page-scroll velocity into extra UV speed, then
    // smooth it so there's no jank. dt-based => framerate independent.
    const scrollY = window.scrollY;
    const scrollVel = dt > 0 ? (scrollY - lastScrollY) / dt : 0;
    lastScrollY = scrollY;
    const desired = scrollVel * c.scrollCoupling;
    const k = 1 - Math.exp(-c.scrollLerp * dt);
    smoothedScrollSpeed += (desired - smoothedScrollSpeed) * k;

    // Advance the UV offset (auto + scroll-coupled). This is what scrolls each
    // brand panel through the flat front and off into the curl.
    offset += (autoSpeed + smoothedScrollSpeed) * dt;
    material.uniforms.uOffset.value = offset;
    material.uniforms.uTime.value = elapsed;

    // Idle camera drift so the surface is never fully static.
    camera.position.x = cx + Math.sin(elapsed * 0.25) * driftAmp;
    camera.position.y = cy + Math.cos(elapsed * 0.19) * driftAmp * 0.6;
    camera.lookAt(0, 0, 0);
    material.uniforms.uCameraPos.value.copy(camera.position);

    renderer.render(scene, camera);
  }
  tick();

  // --- Disposer -----------------------------------------------------------
  return () => {
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    geometry.dispose();
    material.dispose();
    shadow.geometry.dispose();
    (shadow.material as THREE.Material).dispose();
    const map = material.uniforms.uMap.value as THREE.Texture | null;
    map?.dispose();
    renderer.dispose();
  };
}
