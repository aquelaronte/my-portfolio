import type { Colorway } from "./config";

export interface DrawReelOptions {
  width: number;
  height: number;
  panelCount: number;
  colorways: Colorway[];
  labels?: string[];
  grain?: number;
}

export function drawDemoReel(
  ctx: CanvasRenderingContext2D,
  opts: DrawReelOptions,
): void;
