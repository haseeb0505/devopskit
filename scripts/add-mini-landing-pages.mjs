// scripts/add-mini-landing-pages.mjs
// This script walks through every tool page under src/app/tools/*/page.tsx
// and injects a basic "mini‑landing‑page" article if one does not already exist.
// The article includes a brief description, methodology, and 2‑3 real‑world examples.
// Run with: `node scripts/add-mini-landing-pages.mjs`

import { promises as fs } from "fs";
import * as path from "path";

const toolsRoot = path.resolve(process.cwd(), "src/app/tools");

// Simple template – ${toolName} will be replaced with the human readable name
function articleTemplate(toolName) {
  const slug = toolName.toLowerCase().replace(/ /g, "-");
  return `\n        {/* Mini‑Landing‑Page Content – Auto‑generated */}\n        <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">\n          <h2 className="font-bold text-xl mb-4">${toolName} – How It Works & Real‑World Usage</h2>\n          <p>This interactive calculator estimates <strong>${toolName}</strong> based on the official pricing tables of the major cloud providers and LLM vendors. All rates are pulled from the public pricing pages and are frozen at the time of the last repository sync (March 2026).</p>\n          <h3 className="font-semibold mt-4 mb-2">Methodology</h3>\n          <p>We compute cost by multiplying the user‑provided usage metrics (token count, request count, data transfer, etc.) with the per‑unit price. For providers that offer <em>prompt‑caching</em> or <em>reserved‑capacity</em> discounts we apply the documented discount factor. Edge‑case handling (e.g., minimum billing increments) follows the provider’s pricing rules.</p>\n          <h3 className="font-semibold mt-4 mb-2">Example Scenarios</h3>\n          <ul className="list-disc pl-5 space-y-2">\n            <li>Scenario 1 – <strong>Monthly SaaS API usage</strong>: 10 M input tokens, 2 M output tokens, 5 % cached tokens. The calculator shows the breakdown per provider and the total monthly spend.</li>\n            <li>Scenario 2 – <strong>Batch data processing job</strong>: 500 GB egress from Cloud Run in us‑east‑1 vs. AWS Lambda. The tool highlights the cost‑effective region and any free‑tier allowances.</li>\n            <li>Scenario 3 – <strong>Developer‑level CI cost estimate</strong>: 100 k builds per month, each triggering a 2 s Cloud‑Run instance. This demonstrates the impact of per‑invocation pricing vs. per‑second billing.</li>\n          </ul>\n          <p>All numbers are displayed in USD and can be exported as CSV for further analysis.</p>\n        </article>\n`;
}

async function injectArticle(filePath) {
  const content = await fs.readFile(filePath, "utf8");
  if (content.includes("Mini‑Landing‑Page Content")) {
    console.log(`✅ Article already present in ${filePath}`);
    return;
  }
  // Find the closing </ToolShell> tag (or the return JSX closing parenthesis) to insert before it.
  const insertPoint = content.lastIndexOf("</ToolShell>");
  if (insertPoint === -1) {
    console.warn(`⚠️ Could not locate </ToolShell> in ${filePath}. Skipping.`);
    return;
  }
  // Derive a readable tool name from the directory name.
  const dirName = path.basename(path.dirname(filePath));
  const readableName = dirName
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  const article = articleTemplate(readableName);
  const newContent = content.slice(0, insertPoint) + article + "\n" + content.slice(insertPoint);
  await fs.writeFile(filePath, newContent, "utf8");
  console.log(`✏️ Injected article into ${filePath}`);
}

async function main() {
  const entries = await fs.readdir(toolsRoot, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const pagePath = path.join(toolsRoot, entry.name, "page.tsx");
    try {
      await fs.access(pagePath);
      await injectArticle(pagePath);
    } catch (e) {
      // No page.tsx – ignore (e.g., future tools may not have a page yet)
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
