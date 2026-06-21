/**
 * shadow — soft contact shadow under the ribbon's flat section
 * ------------------------------------------------------------
 * Not a hard drop shadow: a blurred dark radial blob drawn to a CanvasTexture
 * and mapped onto a plane that sits just behind the ribbon, centred on the
 * readable flat mid-section (curve t = 0.5). Because the canvas/scene background
 * is transparent over the light DOM page, the dark-with-alpha blob composites as
 * a soft contact shadow on the "page".
 */
import * as THREE from "three";
import { config, type StripConfig } from "./config";

function radialShadowTexture(): THREE.Texture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  g.addColorStop(0.0, "rgba(0,0,0,1)");
  g.addColorStop(0.5, "rgba(0,0,0,0.5)");
  g.addColorStop(1.0, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createContactShadow(
  curve: THREE.CatmullRomCurve3,
  c: StripConfig = config,
): THREE.Mesh {
  const tex = radialShadowTexture();
  const mat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    opacity: c.shadowOpacity,
    depthWrite: false, // never occlude the ribbon
    color: 0x1a1014, // slightly warm shadow rather than pure black
  });

  // Wide, squashed plane — a contact smudge, not a circle.
  const geo = new THREE.PlaneGeometry(c.ribbonWidth * 2.6, c.ribbonWidth * 1.2);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.renderOrder = -1;

  // Track the flat readable section, pushed back and down a touch.
  const flat = curve.getPointAt(0.5);
  mesh.position.set(flat.x, flat.y - c.ribbonWidth * 0.55, flat.z - 1.2);

  return mesh;
}
