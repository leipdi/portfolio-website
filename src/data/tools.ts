// Software shown in the skill hub and the Projekte facts: every tool gets a logo (sources in
// src/assets/logos/LICENSES.md). `mono` is a monogram tile rendered as a marked logo placeholder,
// for a new tool until its logo is found; since 2026-10-20 no tool uses it.
import powerbi from "../assets/logos/powerbi.svg?raw";
import excel from "../assets/logos/excel.svg?raw";
import sap from "../assets/logos/sap.svg?raw";
import claude from "../assets/logos/claude.svg?raw";
import mssql from "../assets/logos/mssql.svg?raw";
import autodesk from "../assets/logos/autodesk.svg?raw";
import astro from "../assets/logos/astro.svg?raw";
import tailwind from "../assets/logos/tailwind.svg?raw";
import threejs from "../assets/logos/threejs.svg?raw";
import playwright from "../assets/logos/playwright.svg?raw";
import githubpages from "../assets/logos/githubpages.svg?raw";
import timebutler from "../assets/logos/timebutler.svg?raw";
import copilot from "../assets/logos/copilot.svg?raw";
import infor from "../assets/logos/infor.svg?raw";
import costing24 from "../assets/logos/costing24.svg?raw";
import witness from "../assets/logos/witness.svg?raw";

export type Tool = { name: string; svg?: string; mono?: string };

export const tools: Record<string, Tool> = {
  "Power BI": { name: "Power BI", svg: powerbi },
  Excel: { name: "Excel", svg: excel },
  // no free Inventor logo exists: the Autodesk mark, captioned with the product name
  "Autodesk Inventor": { name: "Autodesk Inventor", svg: autodesk },
  SAP: { name: "SAP", svg: sap },
  Claude: { name: "Claude", svg: claude },
  // same name as the CV self-rating in Kenntnisse
  MSSQL: { name: "MSSQL", svg: mssql },
  Timebutler: { name: "Timebutler", svg: timebutler },
  // non-breaking space: wraps as "Copilot in / Power BI", never leaves "BI" alone
  "Copilot in Power BI": { name: "Copilot in Power BI", svg: copilot },
  // the Projekte facts (2026-10-15); keys as in cv.ts `projects[].tools`
  "Infor (ERP)": { name: "Infor (ERP)", svg: infor },
  Costing24: { name: "Costing24", svg: costing24 },
  // Witness belongs to Twinn by Haskoning today: its star, captioned with the product name
  Witness: { name: "Witness", svg: witness },
  "Claude Code": { name: "Claude Code", svg: claude },
  Astro: { name: "Astro", svg: astro },
  "Tailwind CSS": { name: "Tailwind CSS", svg: tailwind },
  "three.js": { name: "three.js", svg: threejs },
  Playwright: { name: "Playwright", svg: playwright },
  "GitHub Pages": { name: "GitHub Pages", svg: githubpages },
};

// Inlined SVGs carry fixed gradient/mask ids; the same logo in two boxes would duplicate
// them. Suffix every id (and its url(#…) / href="#…" references) per usage.
export function uniqueSvg(svg: string, suffix: string): string {
  const ids = [...svg.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  let out = svg;
  for (const id of ids) {
    const esc = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    out = out
      .replace(new RegExp(`id="${esc}"`, "g"), `id="${id}-${suffix}"`)
      .replace(new RegExp(`#${esc}(?=[)"'])`, "g"), `#${id}-${suffix}`);
  }
  return out;
}

export function tool(key: string): Tool {
  const t = tools[key];
  if (!t) throw new Error(`Unbekannte Software: ${key} (in src/data/tools.ts ergänzen)`);
  return t;
}
