import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateLLMCosts,
  calculatePromptCaching,
  calculateRAGCost,
  calculateAIAgentCost,
  calculateServerless,
  calculateEgress,
  calculateCloudSql,
  calculateK8sBinPacking,
  calculateRateLimit,
  // @ts-expect-error TypeScript path alias extension compatibility
} from "./calculators.ts";

test("calculateLLMCosts computes correctly and handles negative inputs gracefully", () => {
  const results = calculateLLMCosts({
    inputTokens: -100,
    outputTokens: 1000,
    cachedTokens: 0,
    requestsPerDay: 1000,
  });
  assert.ok(results.length > 0);
  const gpt4o = results.find((r) => r.modelId === "gpt-4o");
  assert.ok(gpt4o);
  assert.ok(gpt4o.costPerMonth > 0);
});

test("calculatePromptCaching calculates break-even and savings", () => {
  const result = calculatePromptCaching({
    systemPromptTokens: 20_000,
    dailyRequests: 5000,
    cacheHitRatePercent: 80,
    inputPricePerMillion: 2.5,
    cachedPricePerMillion: 1.25,
  });
  assert.ok(result.savingsPercentage > 0);
  assert.ok(result.monthlySavings > 0);
  assert.ok(result.annualSavings > 0);
});

test("calculateRAGCost handles document chunking edge cases", () => {
  const result = calculateRAGCost({
    totalDocuments: 100,
    avgTokensPerDoc: 2000,
    chunkSize: 500,
    chunkOverlapPercent: 10,
    embeddingCostPer1M: 0.02,
    vectorDimensions: 1536,
  });
  assert.ok(result.totalChunks > 0);
  assert.ok(result.embeddingCost > 0);
  assert.ok(result.estimatedVectorStorageMB > 0);
});

test("calculateAIAgentCost calculates step scaling", () => {
  const result = calculateAIAgentCost({
    initialPromptTokens: 1000,
    avgStepsPerRun: 4,
    toolResultTokensPerStep: 400,
    outputTokensPerStep: 150,
    monthlyRuns: 1000,
    modelInputPer1M: 0.15,
    modelOutputPer1M: 0.6,
  });
  assert.ok(result.monthlyCost > 0);
  assert.ok(result.tokensPerRun > 1000);
});

test("calculateServerless calculates tier bills with free tier", () => {
  const result = calculateServerless({
    monthlyRequests: 1_000_000,
    avgDurationMs: 200,
    memoryMB: 512,
    vcpuCount: 0.5,
    concurrencyPerInstance: 1,
  });
  assert.ok(result.cloudRunMonthly >= 0);
  assert.ok(result.lambdaMonthly >= 0);
  assert.ok(["Google Cloud Run", "AWS Lambda", "Tie"].includes(result.cheaperProvider));
});

test("calculateEgress compares CDN savings", () => {
  const result = calculateEgress({
    monthlyTransferGB: 10_000,
    cdnCacheHitPercent: 80,
    cloudProvider: "aws",
  });
  assert.ok(result.monthlySavings > 0);
  assert.equal(result.cloudflareR2Cost, 0);
});

test("calculateCloudSql projects 12-month storage", () => {
  const result = calculateCloudSql({
    initialStorageGB: 100,
    monthlyGrowthGB: 10,
    backupRetentionDays: 7,
    highAvailability: false,
  });
  assert.equal(result.storageGBAtMonth12, 210);
  assert.ok(result.month12Cost > result.month1Cost);
  assert.ok(result.year1TotalCost > 0);
});

test("calculateK8sBinPacking calculates node count and waste", () => {
  const result = calculateK8sBinPacking({
    podCpuCores: 0.5,
    podMemoryGiB: 1,
    replicaCount: 10,
    nodeCpuCores: 4,
    nodeMemoryGiB: 16,
    systemOverheadPercent: 10,
  });
  assert.ok(result.nodesRequired >= 1);
  assert.ok(result.cpuUtilizationPercent > 0);
  assert.ok(result.wastedCpuCores >= 0);
});

test("calculateRateLimit calculates token bucket capacity and refill rate", () => {
  const result = calculateRateLimit({
    targetRPS: 100,
    p95LatencyMs: 150,
    burstMultiplier: 2,
  });
  assert.equal(result.bucketCapacity, 200);
  assert.equal(result.refillRatePerSec, 100);
});
