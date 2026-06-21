/**
 * ribbon-geometry — the core mechanism
 * ------------------------------------
 * Wraps a flat strip onto a 3D curve.
 *
 *   1. Build the spine as a THREE.CatmullRomCurve3 through the config control
 *      points.
 *   2. Sample the curve at N points. At each sample t:
 *        - tangent  T = curve.getTangentAt(t)
 *        - frame    sideDir = normalize(cross(T, up));
 *                   up      = normalize(cross(sideDir, T))   (re-orthogonalise)
 *      The `up` vector is carried forward sample-to-sample (parallel transport /
 *      rotation-minimising frame) so the ribbon never flips or pinches the way a
 *      raw Frenet frame does at inflection points.
 *        - optional roll(t): rotate sideDir around T by a ramping angle for a
 *          subtle Möbius twist.
 *        - emit two vertices: pos ± (ribbonWidth/2) * sideDir
 *        - UVs: u = t (0..1 along length), v = side (0 across width, 1 other edge)
 *   3. Index consecutive rows as a triangle strip and compute normals.
 *
 * The geometry is rebuilt only when the curve or width changes; the texture
 * scroll is animated separately via UV offset (see ribbon-material.ts), which is
 * what makes each brand panel read sharply at the flat front and foreshorten as
 * it curls away.
 */
import * as THREE from "three";
import type { StripConfig, Vec3 } from "./config";

export interface RibbonBuild {
  geometry: THREE.BufferGeometry;
  curve: THREE.CatmullRomCurve3;
}

function toVector3(p: Vec3): THREE.Vector3 {
  return new THREE.Vector3(p[0], p[1], p[2]);
}

/** Build the Catmull-Rom spine from the configured control points. */
export function buildSpine(config: StripConfig): THREE.CatmullRomCurve3 {
  const points = config.controlPoints.map(toVector3);
  // `centripetal` parameterisation avoids the cusps/overshoot that the default
  // `catmullrom` type produces on sharp control polygons.
  const curve = new THREE.CatmullRomCurve3(points, false, "centripetal", 0.5);
  return curve;
}

/**
 * Build the ribbon BufferGeometry by sampling the spine and emitting a 2-wide
 * strip of vertices with a parallel-transported frame.
 *
 * @param sampleCount Number of samples along the curve (>= 2). Pass the mobile
 *                    value on small screens to degrade gracefully.
 */
export function buildRibbonGeometry(
  config: StripConfig,
  sampleCount: number,
): RibbonBuild {
  const curve = buildSpine(config);
  const N = Math.max(2, Math.floor(sampleCount));
  const halfWidth = config.ribbonWidth * 0.5;

  const positions = new Float32Array(N * 2 * 3);
  const uvs = new Float32Array(N * 2 * 2);

  // --- Parallel-transport frame setup -------------------------------------
  // Seed `up` with world-up, unless the first tangent is ~parallel to it, in
  // which case fall back to world-right so the first cross product is stable.
  const T0 = curve.getTangentAt(0).normalize();
  let up = new THREE.Vector3(0, 1, 0);
  if (Math.abs(T0.dot(up)) > 0.95) up.set(1, 0, 0);

  const tangent = new THREE.Vector3();
  const sideDir = new THREE.Vector3();
  const point = new THREE.Vector3();
  const left = new THREE.Vector3();
  const right = new THREE.Vector3();
  const quat = new THREE.Quaternion();

  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);

    curve.getPointAt(t, point);
    curve.getTangentAt(t, tangent).normalize();

    // sideDir = normalize(cross(T, up)); then re-orthogonalise up so the frame
    // stays right-handed and carries no accumulated skew.
    sideDir.crossVectors(tangent, up).normalize();
    up.crossVectors(sideDir, tangent).normalize(); // transported up for next step

    // Optional roll: rotate sideDir around the tangent by a ramping angle.
    if (config.rollEnabled && config.rollAmount !== 0) {
      const roll = rollAt(t) * config.rollAmount;
      quat.setFromAxisAngle(tangent, roll);
      sideDir.applyQuaternion(quat).normalize();
    }

    left.copy(point).addScaledVector(sideDir, halfWidth);
    right.copy(point).addScaledVector(sideDir, -halfWidth);

    const vi = i * 2 * 3;
    positions[vi + 0] = left.x;
    positions[vi + 1] = left.y;
    positions[vi + 2] = left.z;
    positions[vi + 3] = right.x;
    positions[vi + 4] = right.y;
    positions[vi + 5] = right.z;

    const ui = i * 2 * 2;
    uvs[ui + 0] = t; // u along length
    uvs[ui + 1] = 0; // v = left edge
    uvs[ui + 2] = t;
    uvs[ui + 3] = 1; // v = right edge
  }

  // --- Index the triangle strip between consecutive rows ------------------
  // Row i has vertices (2i)=left, (2i+1)=right. Each segment forms a quad.
  const indices = new Uint32Array((N - 1) * 6);
  for (let i = 0; i < N - 1; i++) {
    const a = i * 2; // left  this row
    const b = i * 2 + 1; // right this row
    const c = (i + 1) * 2; // left  next row
    const d = (i + 1) * 2 + 1; // right next row
    const o = i * 6;
    // Winding chosen so computeVertexNormals points the front face outward.
    indices[o + 0] = a;
    indices[o + 1] = c;
    indices[o + 2] = b;
    indices[o + 3] = b;
    indices[o + 4] = c;
    indices[o + 5] = d;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();

  return { geometry, curve };
}

/**
 * Roll ramp along the ribbon: 0 at the tail, eases up toward the head, with the
 * flat readable mid-section kept near-untwisted so the brand panel stays
 * legible. A smooth ease keeps the twist from looking mechanical.
 */
function rollAt(t: number): number {
  // Keep the centre flat (window ~0.35..0.6), ramp toward the head.
  const head = THREE.MathUtils.smoothstep(t, 0.55, 1.0);
  const tail = -THREE.MathUtils.smoothstep(1 - t, 0.6, 1.0);
  return head + tail;
}
