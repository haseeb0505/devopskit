const fs = require("fs");
const path = require("path");

function validatePricing(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Pricing data must be an object");
  }

  if (typeof data.lastUpdated !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data.lastUpdated)) {
    throw new Error("lastUpdated must be a valid ISO YYYY-MM-DD date");
  }

  if (!data.llm || typeof data.llm !== "object") {
    throw new Error("Missing 'llm' provider pricing mapping");
  }

  for (const [provider, models] of Object.entries(data.llm)) {
    if (!Array.isArray(models) || models.length === 0) {
      throw new Error(`Provider '${provider}' has no valid models defined`);
    }

    if (provider === "embeddings") {
      for (const emb of models) {
        if (!emb.provider || !emb.model) {
          throw new Error("Embedding entry missing provider or model");
        }
        if (typeof emb.costPer1M !== "number" || isNaN(emb.costPer1M) || emb.costPer1M < 0) {
          throw new Error(`Invalid costPer1M for embedding '${emb.model}'`);
        }
      }
      continue;
    }

    for (const model of models) {
      if (typeof model.id !== "string" || !model.id) {
        throw new Error(`Invalid model ID in provider '${provider}'`);
      }
      if (typeof model.inputPer1M !== "number" || isNaN(model.inputPer1M) || model.inputPer1M < 0) {
        throw new Error(`Invalid inputPer1M for model '${model.id}' in '${provider}'`);
      }
      if (typeof model.outputPer1M !== "number" || isNaN(model.outputPer1M) || model.outputPer1M < 0) {
        throw new Error(`Invalid outputPer1M for model '${model.id}' in '${provider}'`);
      }
      if (typeof model.contextWindow !== "number" || model.contextWindow <= 0) {
        throw new Error(`Invalid contextWindow for model '${model.id}' in '${provider}'`);
      }
    }
  }

  // Validate Cloud pricing structures
  if (data.cloud) {
    if (!data.cloud.egress || typeof data.cloud.egress !== "object") {
      throw new Error("Missing cloud.egress configuration");
    }
    if (!data.cloud.cloudRun || !data.cloud.awsLambda) {
      throw new Error("Missing serverless pricing models in cloud section");
    }
  }

  return true;
}

const filePath = path.resolve(process.cwd(), "src/data/pricing.json");
try {
  const raw = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(raw);
  validatePricing(json);
  console.log("✅ Pricing validation passed successfully: src/data/pricing.json is structurally sound.");
} catch (err) {
  console.error("❌ Pricing validation error:", err.message);
  process.exit(1);
}
