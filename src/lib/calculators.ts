import pricingData from "../data/pricing.json" with { type: "json" };

export interface LLMCostInputs {
  inputTokens: number;
  outputTokens: number;
  cachedTokens: number;
  requestsPerDay: number;
}

export interface ModelCostBreakdown {
  modelId: string;
  name: string;
  provider: string;
  costPerRequest: number;
  costPerDay: number;
  costPerMonth: number;
  costPerYear: number;
  inputCostPerMillion: number;
  outputCostPerMillion: number;
}

export function calculateLLMCosts(inputs: LLMCostInputs): ModelCostBreakdown[] {
  const { inputTokens, outputTokens, cachedTokens, requestsPerDay } = inputs;
  const safeReqs = Math.max(0, requestsPerDay);
  const safeIn = Math.max(0, inputTokens);
  const safeOut = Math.max(0, outputTokens);
  const safeCached = Math.min(safeIn, Math.max(0, cachedTokens));
  const uncachedIn = safeIn - safeCached;

  const results: ModelCostBreakdown[] = [];

  // OpenAI
  pricingData.llm.openai.forEach((m) => {
    const costPerReq =
      (uncachedIn / 1_000_000) * m.inputPer1M +
      (safeCached / 1_000_000) * m.cachedInputPer1M +
      (safeOut / 1_000_000) * m.outputPer1M;

    results.push({
      modelId: m.id,
      name: m.name,
      provider: "OpenAI",
      costPerRequest: costPerReq,
      costPerDay: costPerReq * safeReqs,
      costPerMonth: costPerReq * safeReqs * 30,
      costPerYear: costPerReq * safeReqs * 365,
      inputCostPerMillion: m.inputPer1M,
      outputCostPerMillion: m.outputPer1M,
    });
  });

  // Gemini
  pricingData.llm.gemini.forEach((m) => {
    const costPerReq =
      (uncachedIn / 1_000_000) * m.inputPer1M +
      (safeCached / 1_000_000) * m.cachedInputPer1M +
      (safeOut / 1_000_000) * m.outputPer1M;

    results.push({
      modelId: m.id,
      name: m.name,
      provider: "Google Gemini",
      costPerRequest: costPerReq,
      costPerDay: costPerReq * safeReqs,
      costPerMonth: costPerReq * safeReqs * 30,
      costPerYear: costPerReq * safeReqs * 365,
      inputCostPerMillion: m.inputPer1M,
      outputCostPerMillion: m.outputPer1M,
    });
  });

  // Anthropic
  pricingData.llm.anthropic.forEach((m) => {
    const costPerReq =
      (uncachedIn / 1_000_000) * m.inputPer1M +
      (safeCached / 1_000_000) * m.cachedInputPer1M +
      (safeOut / 1_000_000) * m.outputPer1M;

    results.push({
      modelId: m.id,
      name: m.name,
      provider: "Anthropic",
      costPerRequest: costPerReq,
      costPerDay: costPerReq * safeReqs,
      costPerMonth: costPerReq * safeReqs * 30,
      costPerYear: costPerReq * safeReqs * 365,
      inputCostPerMillion: m.inputPer1M,
      outputCostPerMillion: m.outputPer1M,
    });
  });

  return results;
}

// Prompt Caching Calculator
export interface PromptCachingInputs {
  systemPromptTokens: number;
  dailyRequests: number;
  cacheHitRatePercent: number; // 0 to 100
  inputPricePerMillion: number;
  cachedPricePerMillion: number;
}

export interface PromptCachingResult {
  monthlyWithoutCache: number;
  monthlyWithCache: number;
  monthlySavings: number;
  savingsPercentage: number;
  annualSavings: number;
}

export function calculatePromptCaching(inputs: PromptCachingInputs): PromptCachingResult {
  const {
    systemPromptTokens,
    dailyRequests,
    cacheHitRatePercent,
    inputPricePerMillion,
    cachedPricePerMillion,
  } = inputs;

  const hitRate = Math.min(100, Math.max(0, cacheHitRatePercent)) / 100;
  const safeReqs = Math.max(0, dailyRequests);
  const monthlyReqs = safeReqs * 30;
  const tokens = Math.max(0, systemPromptTokens);

  const monthlyTokens = (tokens * monthlyReqs) / 1_000_000;
  const monthlyWithoutCache = monthlyTokens * inputPricePerMillion;

  const cachedTokens = monthlyTokens * hitRate;
  const uncachedTokens = monthlyTokens * (1 - hitRate);

  const monthlyWithCache =
    uncachedTokens * inputPricePerMillion + cachedTokens * cachedPricePerMillion;

  const monthlySavings = Math.max(0, monthlyWithoutCache - monthlyWithCache);
  const savingsPercentage =
    monthlyWithoutCache > 0 ? (monthlySavings / monthlyWithoutCache) * 100 : 0;

  return {
    monthlyWithoutCache,
    monthlyWithCache,
    monthlySavings,
    savingsPercentage,
    annualSavings: monthlySavings * 12,
  };
}

// RAG Embedding Cost
export interface RAGInputs {
  totalDocuments: number;
  avgTokensPerDoc: number;
  chunkSize: number;
  chunkOverlapPercent: number;
  embeddingCostPer1M: number;
  vectorDimensions: number;
}

export interface RAGResult {
  totalChunks: number;
  totalTokensIndexed: number;
  embeddingCost: number;
  estimatedVectorStorageMB: number;
  estimatedMemoryGB: number;
}

export function calculateRAGCost(inputs: RAGInputs): RAGResult {
  const {
    totalDocuments,
    avgTokensPerDoc,
    chunkSize,
    chunkOverlapPercent,
    embeddingCostPer1M,
    vectorDimensions,
  } = inputs;

  const effectiveChunkStep = Math.max(50, chunkSize * (1 - chunkOverlapPercent / 100));
  const chunksPerDoc = Math.max(1, Math.ceil(avgTokensPerDoc / effectiveChunkStep));
  const totalChunks = totalDocuments * chunksPerDoc;
  const totalTokensIndexed = totalChunks * chunkSize;
  const embeddingCost = (totalTokensIndexed / 1_000_000) * embeddingCostPer1M;

  // Float32 = 4 bytes per dimension + ~300 bytes metadata/HNSW index overhead
  const bytesPerVector = vectorDimensions * 4 + 300;
  const totalBytes = totalChunks * bytesPerVector;
  const estimatedVectorStorageMB = totalBytes / (1024 * 1024);
  const estimatedMemoryGB = (estimatedVectorStorageMB * 1.5) / 1024; // ~1.5x RAM for HNSW graph

  return {
    totalChunks,
    totalTokensIndexed,
    embeddingCost,
    estimatedVectorStorageMB,
    estimatedMemoryGB,
  };
}

// AI Agent Cost Estimator
export interface AIAgentInputs {
  initialPromptTokens: number;
  avgStepsPerRun: number;
  toolResultTokensPerStep: number;
  outputTokensPerStep: number;
  monthlyRuns: number;
  modelInputPer1M: number;
  modelOutputPer1M: number;
}

export interface AIAgentResult {
  tokensPerRun: number;
  costPerRun: number;
  monthlyCost: number;
  annualCost: number;
}

export function calculateAIAgentCost(inputs: AIAgentInputs): AIAgentResult {
  const {
    initialPromptTokens,
    avgStepsPerRun,
    toolResultTokensPerStep,
    outputTokensPerStep,
    monthlyRuns,
    modelInputPer1M,
    modelOutputPer1M,
  } = inputs;

  let totalInputTokensThisRun = 0;
  let totalOutputTokensThisRun = 0;
  let accumulatedContext = initialPromptTokens;

  for (let step = 1; step <= avgStepsPerRun; step++) {
    totalInputTokensThisRun += accumulatedContext;
    totalOutputTokensThisRun += outputTokensPerStep;
    accumulatedContext += outputTokensPerStep + toolResultTokensPerStep;
  }

  const costPerRun =
    (totalInputTokensThisRun / 1_000_000) * modelInputPer1M +
    (totalOutputTokensThisRun / 1_000_000) * modelOutputPer1M;

  const totalTokensPerRun = totalInputTokensThisRun + totalOutputTokensThisRun;

  return {
    tokensPerRun: totalTokensPerRun,
    costPerRun,
    monthlyCost: costPerRun * monthlyRuns,
    annualCost: costPerRun * monthlyRuns * 12,
  };
}

// Cloud Run vs AWS Lambda
export interface ServerlessInputs {
  monthlyRequests: number;
  avgDurationMs: number;
  memoryMB: number;
  vcpuCount: number;
  concurrencyPerInstance: number;
}

export interface ServerlessResult {
  cloudRunMonthly: number;
  lambdaMonthly: number;
  cheaperProvider: "Google Cloud Run" | "AWS Lambda" | "Tie";
  monthlyDifference: number;
}

export function calculateServerless(inputs: ServerlessInputs): ServerlessResult {
  const {
    monthlyRequests,
    avgDurationMs,
    memoryMB,
    vcpuCount,
    concurrencyPerInstance,
  } = inputs;

  const durationSec = avgDurationMs / 1000;
  const memoryGB = memoryMB / 1024;

  // AWS Lambda calculation
  const lambdaFreeReqs = pricingData.cloud.awsLambda.freeTier.requests;
  const lambdaFreeGbSec = pricingData.cloud.awsLambda.freeTier.gbSeconds;

  const billableLambdaReqs = Math.max(0, monthlyRequests - lambdaFreeReqs);
  const totalLambdaGbSec = monthlyRequests * durationSec * memoryGB;
  const billableLambdaGbSec = Math.max(0, totalLambdaGbSec - lambdaFreeGbSec);

  const lambdaComputeCost =
    billableLambdaGbSec * pricingData.cloud.awsLambda.gbSecondRate;
  const lambdaRequestCost =
    (billableLambdaReqs / 1_000_000) * pricingData.cloud.awsLambda.requestPerMillion;
  const lambdaMonthly = Math.max(0, lambdaComputeCost + lambdaRequestCost);

  // Cloud Run calculation (concurrency scales down active instance time)
  const effectiveConcurrency = Math.max(1, concurrencyPerInstance);
  const activeInstanceSeconds = (monthlyRequests * durationSec) / effectiveConcurrency;

  const cloudRunFreeVcpu = pricingData.cloud.cloudRun.freeTier.vcpuSec;
  const cloudRunFreeGib = pricingData.cloud.cloudRun.freeTier.gibSec;
  const cloudRunFreeReq = pricingData.cloud.cloudRun.freeTier.requests;

  const totalVcpuSec = activeInstanceSeconds * vcpuCount;
  const totalGibSec = activeInstanceSeconds * memoryGB;

  const billableVcpuSec = Math.max(0, totalVcpuSec - cloudRunFreeVcpu);
  const billableGibSec = Math.max(0, totalGibSec - cloudRunFreeGib);
  const billableCloudRunReq = Math.max(0, monthlyRequests - cloudRunFreeReq);

  const cloudRunComputeCost =
    billableVcpuSec * pricingData.cloud.cloudRun.cpuPerSecond +
    billableGibSec * pricingData.cloud.cloudRun.memGiBPerSecond;
  const cloudRunRequestCost =
    (billableCloudRunReq / 1_000_000) * pricingData.cloud.cloudRun.requestPerMillion;
  const cloudRunMonthly = Math.max(0, cloudRunComputeCost + cloudRunRequestCost);

  const diff = Math.abs(cloudRunMonthly - lambdaMonthly);
  let cheaper: "Google Cloud Run" | "AWS Lambda" | "Tie" = "Tie";
  if (cloudRunMonthly < lambdaMonthly - 0.01) {
    cheaper = "Google Cloud Run";
  } else if (lambdaMonthly < cloudRunMonthly - 0.01) {
    cheaper = "AWS Lambda";
  }

  return {
    cloudRunMonthly,
    lambdaMonthly,
    cheaperProvider: cheaper,
    monthlyDifference: diff,
  };
}

// Cloud Egress Cost
export interface EgressInputs {
  monthlyTransferGB: number;
  cdnCacheHitPercent: number;
  cloudProvider: "aws" | "gcp" | "azure";
}

export interface EgressResult {
  originCostWithoutCDN: number;
  costWithCDN: number;
  monthlySavings: number;
  cloudflareR2Cost: number;
}

export function calculateEgress(inputs: EgressInputs): EgressResult {
  const { monthlyTransferGB, cdnCacheHitPercent, cloudProvider } = inputs;
  const hitRatio = Math.min(100, Math.max(0, cdnCacheHitPercent)) / 100;

  const rates = pricingData.cloud.egress[cloudProvider];
  const originRate = rates.standardInternetPerGB;
  const cdnRate =
    cloudProvider === "aws"
      ? (rates as { cloudfrontPerGB: number }).cloudfrontPerGB
      : cloudProvider === "gcp"
      ? (rates as { cloudCDNPerGB: number }).cloudCDNPerGB
      : (rates as { azureCDNPerGB: number }).azureCDNPerGB;

  const originCostWithoutCDN = monthlyTransferGB * originRate;

  const cachedGB = monthlyTransferGB * hitRatio;
  const originGB = monthlyTransferGB * (1 - hitRatio);

  const costWithCDN = cachedGB * cdnRate + originGB * originRate;
  const monthlySavings = Math.max(0, originCostWithoutCDN - costWithCDN);

  // Cloudflare R2 has $0 egress
  const cloudflareR2Cost = 0;

  return {
    originCostWithoutCDN,
    costWithCDN,
    monthlySavings,
    cloudflareR2Cost,
  };
}

// Managed Postgres / Cloud SQL Storage
export interface CloudSqlInputs {
  initialStorageGB: number;
  monthlyGrowthGB: number;
  backupRetentionDays: number;
  highAvailability: boolean;
}

export interface CloudSqlResult {
  month1Cost: number;
  month12Cost: number;
  year1TotalCost: number;
  storageGBAtMonth12: number;
  backupGBAtMonth12: number;
}

export function calculateCloudSql(inputs: CloudSqlInputs): CloudSqlResult {
  const {
    initialStorageGB,
    monthlyGrowthGB,
    backupRetentionDays,
    highAvailability,
  } = inputs;

  const storageRate = pricingData.cloud.cloudSql.storagePerGBMonth;
  const backupRate = pricingData.cloud.cloudSql.backupPerGBMonth;
  const haMultiplier = highAvailability ? 2.0 : 1.0;

  let totalAnnualCost = 0;
  let month1Cost = 0;
  let month12Cost = 0;
  let finalStorage = 0;
  let finalBackup = 0;

  for (let month = 1; month <= 12; month++) {
    const currentStorage = initialStorageGB + monthlyGrowthGB * (month - 1);
    // Estimated backup footprint based on 30-day retention and WAL changes
    const estimatedBackupGB = (currentStorage * backupRetentionDays) / 30;

    const monthlyCost =
      currentStorage * storageRate * haMultiplier +
      estimatedBackupGB * backupRate;

    if (month === 1) month1Cost = monthlyCost;
    if (month === 12) {
      month12Cost = monthlyCost;
      finalStorage = currentStorage;
      finalBackup = estimatedBackupGB;
    }
    totalAnnualCost += monthlyCost;
  }

  return {
    month1Cost,
    month12Cost,
    year1TotalCost: totalAnnualCost,
    storageGBAtMonth12: finalStorage,
    backupGBAtMonth12: finalBackup,
  };
}

// K8s Node Bin-Packing
export interface K8sInputs {
  podCpuCores: number;
  podMemoryGiB: number;
  replicaCount: number;
  nodeCpuCores: number;
  nodeMemoryGiB: number;
  systemOverheadPercent: number;
}

export interface K8sResult {
  podsPerNode: number;
  nodesRequired: number;
  totalAllocatedCpu: number;
  totalAllocatedMemory: number;
  cpuUtilizationPercent: number;
  memUtilizationPercent: number;
  wastedCpuCores: number;
  wastedMemoryGiB: number;
}

export function calculateK8sBinPacking(inputs: K8sInputs): K8sResult {
  const {
    podCpuCores,
    podMemoryGiB,
    replicaCount,
    nodeCpuCores,
    nodeMemoryGiB,
    systemOverheadPercent,
  } = inputs;

  const allocatableCpu = nodeCpuCores * (1 - systemOverheadPercent / 100);
  const allocatableMemory = nodeMemoryGiB * (1 - systemOverheadPercent / 100);

  const maxPodsByCpu = Math.floor(allocatableCpu / Math.max(0.01, podCpuCores));
  const maxPodsByMem = Math.floor(allocatableMemory / Math.max(0.01, podMemoryGiB));
  const podsPerNode = Math.max(1, Math.min(maxPodsByCpu, maxPodsByMem));

  const nodesRequired = Math.ceil(replicaCount / podsPerNode);

  const totalClusterCpu = nodesRequired * nodeCpuCores;
  const totalClusterMemory = nodesRequired * nodeMemoryGiB;

  const totalUsedCpu = replicaCount * podCpuCores;
  const totalUsedMemory = replicaCount * podMemoryGiB;

  const cpuUtilizationPercent =
    totalClusterCpu > 0 ? (totalUsedCpu / totalClusterCpu) * 100 : 0;
  const memUtilizationPercent =
    totalClusterMemory > 0 ? (totalUsedMemory / totalClusterMemory) * 100 : 0;

  return {
    podsPerNode,
    nodesRequired,
    totalAllocatedCpu: totalClusterCpu,
    totalAllocatedMemory: totalClusterMemory,
    cpuUtilizationPercent,
    memUtilizationPercent,
    wastedCpuCores: Math.max(0, totalClusterCpu - totalUsedCpu),
    wastedMemoryGiB: Math.max(0, totalClusterMemory - totalUsedMemory),
  };
}

// API Rate Limit Calculator
export interface RateLimitInputs {
  targetRPS: number;
  p95LatencyMs: number;
  burstMultiplier: number;
}

export interface RateLimitResult {
  bucketCapacity: number;
  refillRatePerSec: number;
  concurrentConnectionsRequired: number;
  recommendedBackoffSeconds: number;
}

export function calculateRateLimit(inputs: RateLimitInputs): RateLimitResult {
  const { targetRPS, p95LatencyMs, burstMultiplier } = inputs;
  const refillRatePerSec = Math.max(1, targetRPS);
  const bucketCapacity = Math.ceil(refillRatePerSec * Math.max(1, burstMultiplier));
  const concurrency = Math.ceil(targetRPS * (p95LatencyMs / 1000));
  const backoff = Math.max(1, Math.ceil(p95LatencyMs / 500));

  return {
    bucketCapacity,
    refillRatePerSec,
    concurrentConnectionsRequired: concurrency,
    recommendedBackoffSeconds: backoff,
  };
}
