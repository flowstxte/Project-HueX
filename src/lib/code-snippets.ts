import type { RGB } from "./types";

const platforms = [
  "CSS",
  "HTML",
  "OpenGL",
  "DirectX",
  "Unreal Engine",
  "Unity",
  "Blender",
  "Android XML",
  "SwiftUI",
  "Flutter",
] as const;

export type Platform = (typeof platforms)[number];

export const platformList: Platform[] = [...platforms];

function formatFloat(n: number): string {
    return n.toFixed(4);
}

export function generateSnippet(platform: Platform, hex: string, rgb: RGB): string {
  const r_norm = rgb.r / 255;
  const g_norm = rgb.g / 255;
  const b_norm = rgb.b / 255;

  switch (platform) {
    case "CSS":
      return `color: ${hex};`;
    case "HTML":
      return `<div style="color:${hex};"></div>`;
    case "OpenGL":
      return `glColor3f(${formatFloat(r_norm)}f, ${formatFloat(g_norm)}f, ${formatFloat(b_norm)}f);`;
    case "DirectX":
        return `D3DXCOLOR color(${formatFloat(r_norm)}f, ${formatFloat(g_norm)}f, ${formatFloat(b_norm)}f, 1.0f);`;
    case "Unreal Engine":
        return `FLinearColor(${formatFloat(r_norm)}, ${formatFloat(g_norm)}, ${formatFloat(b_norm)}, 1.0)`;
    case "Unity":
        return `new Color(${formatFloat(r_norm)}f, ${formatFloat(g_norm)}f, ${formatFloat(b_norm)}f);`;
    case "Blender":
        return `bpy.context.object.active_material.diffuse_color = (${formatFloat(r_norm)}, ${formatFloat(g_norm)}, ${formatFloat(b_norm)}, 1.0)`;
    case "Android XML":
      return `<color name="custom_color">${hex}</color>`;
    case "SwiftUI":
      return `Color(red: ${formatFloat(r_norm)}, green: ${formatFloat(g_norm)}, blue: ${formatFloat(b_norm)})`;
    case "Flutter":
      return `Color(0xFF${hex.substring(1)})`;
    default:
      return "Snippet not available.";
  }
}
