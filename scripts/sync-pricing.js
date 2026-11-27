#!/usr/bin/env node
/**
 * Syncs LLM model pricing in src/data/pricing.json against LiteLLM's
 * community-maintained model_prices_and_context_window.json.
 * Only updates existing models when valid positive numbers are found.
 */

const fs = require("fs");
const path = require("path");

const LITELLM_URL =
  "https://raw.githubusercontent.com/BerriAI/litellm/main/model_prices_and_context_window.json";
const PRICING_PATH = path.join(__dirname, "..", "src", "data", "pricing.json");

const round4 = (n) => Math.round(n * 10000) / 10000;

async function main() {
  const res = await fetch(LITELLM_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch LiteLLM pricing: ${res.status} ${res.statusText}`);
  }
  const litellm = await res.json();
  const pricing = JSON.parse(fs.readFileSync(PRICING_PATH, "utf8"));

  let updatedCount = 0;

  for (const provider of Object.keys(pricing.llm || {})) {
    const models = pricing.llm[provider];
    if (!Array.isArray(models)) continue;

    for (const model of models) {
      const entry =
        litellm[model.id] ||
        litellm[`${provider}/${model.id}`] ||
        litellm[`openai/${model.id}`];

      if (!entry) continue;

      const newInput =
        typeof entry.input_cost_per_token === "number" && entry.input_cost_per_token > 0
          ? round4(entry.input_cost_per_token * 1_000_000)
          : null;
      const newOutput =
        typeof entry.output_cost_per_token === "number" && entry.output_cost_per_token > 0
          ? round4(entry.output_cost_per_token * 1_000_000)
          : null;
      const newCached =
        typeof entry.cache_read_input_token_cost === "number" &&
        entry.cache_read_input_token_cost > 0
          ? round4(entry.cache_read_input_token_cost * 1_000_000)
          : null;

      if (newInput !== null && newInput !== model.inputPer1M) {
        console.log(`${model.id} inputPer1M: ${model.inputPer1M} -> ${newInput}`);
        model.inputPer1M = newInput;
        updatedCount++;
      }
      if (newOutput !== null && newOutput !== model.outputPer1M) {
        console.log(`${model.id} outputPer1M: ${model.outputPer1M} -> ${newOutput}`);
        model.outputPer1M = newOutput;
        updatedCount++;
      }
      if (
        newCached !== null &&
        typeof model.cachedInputPer1M === "number" &&
        newCached !== model.cachedInputPer1M
      ) {
        console.log(`${model.id} cachedInputPer1M: ${model.cachedInputPer1M} -> ${newCached}`);
        model.cachedInputPer1M = newCached;
        updatedCount++;
      }
    }
  }

  if (updatedCount > 0) {
    pricing.lastUpdated = new Date().toISOString().slice(0, 10);
    fs.writeFileSync(PRICING_PATH, JSON.stringify(pricing, null, 2) + "\n");
    console.log(`Updated ${updatedCount} price field(s) in src/data/pricing.json.`);
  } else {
    console.log("All matched LLM prices are already up to date.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
