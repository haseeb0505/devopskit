export interface ModelSpec {
  id: string;
  name: string;
  parametersB: number; // e.g. 70 for 70B
  numLayers: number;
  hiddenSize: number;
  numAttentionHeads: number;
  numKeyValueHeads: number; // for GQA (Grouped Query Attention)
  defaultContextWindow: number;
  recommendedTP: number[]; // Tensor parallel sizes supported
}

export interface GpuSpec {
  id: string;
  name: string;
  vramGiB: number;
  memoryBandwidthTBps: number;
  fp16Tflops: number;
  hourlyRateOnDemand: number;
  hourlyRateSpot: number;
  cloudProvider: string;
}

export const POPULAR_MODELS: ModelSpec[] = [
  {
    id: "deepseek-r1-distill-8b",
    name: "DeepSeek R1 Distill / Llama 3.1 (8B)",
    parametersB: 8,
    numLayers: 32,
    hiddenSize: 4096,
    numAttentionHeads: 32,
    numKeyValueHeads: 8,
    defaultContextWindow: 8192,
    recommendedTP: [1],
  },
  {
    id: "qwen-2.5-14b",
    name: "Qwen 2.5 (14B)",
    parametersB: 14.7,
    numLayers: 48,
    hiddenSize: 5120,
    numAttentionHeads: 40,
    numKeyValueHeads: 8,
    defaultContextWindow: 32768,
    recommendedTP: [1, 2],
  },
  {
    id: "qwen-2.5-32b",
    name: "Qwen 2.5 (32B)",
    parametersB: 32.5,
    numLayers: 64,
    hiddenSize: 5120,
    numAttentionHeads: 40,
    numKeyValueHeads: 8,
    defaultContextWindow: 32768,
    recommendedTP: [1, 2, 4],
  },
  {
    id: "llama-3.3-70b",
    name: "Llama 3.3 (70B) / DeepSeek R1 70B",
    parametersB: 70.6,
    numLayers: 80,
    hiddenSize: 8192,
    numAttentionHeads: 64,
    numKeyValueHeads: 8,
    defaultContextWindow: 32768,
    recommendedTP: [2, 4, 8],
  },
  {
    id: "deepseek-v3-moe",
    name: "DeepSeek V3 / R1 671B MoE (37B active)",
    parametersB: 671,
    numLayers: 61,
    hiddenSize: 7168,
    numAttentionHeads: 128,
    numKeyValueHeads: 128, // MLA architecture
    defaultContextWindow: 32768,
    recommendedTP: [8, 16],
  },
];

export const GPUS: GpuSpec[] = [
  {
    id: "rtx-4090",
    name: "NVIDIA RTX 4090 (24GB)",
    vramGiB: 24,
    memoryBandwidthTBps: 1.0,
    fp16Tflops: 82.6,
    hourlyRateOnDemand: 0.74,
    hourlyRateSpot: 0.45,
    cloudProvider: "RunPod / Vast.ai",
  },
  {
    id: "l40s",
    name: "NVIDIA L40S (48GB)",
    vramGiB: 48,
    memoryBandwidthTBps: 0.86,
    fp16Tflops: 91.6,
    hourlyRateOnDemand: 1.35,
    hourlyRateSpot: 0.95,
    cloudProvider: "Lambda Labs / AWS G6e",
  },
  {
    id: "a100-80gb",
    name: "NVIDIA A100 SXM (80GB)",
    vramGiB: 80,
    memoryBandwidthTBps: 2.0,
    fp16Tflops: 312.0,
    hourlyRateOnDemand: 2.10,
    hourlyRateSpot: 1.45,
    cloudProvider: "AWS p4de / Lambda Labs",
  },
  {
    id: "h100-80gb",
    name: "NVIDIA H100 SXM (80GB)",
    vramGiB: 80,
    memoryBandwidthTBps: 3.35,
    fp16Tflops: 989.0,
    hourlyRateOnDemand: 3.25,
    hourlyRateSpot: 2.30,
    cloudProvider: "AWS p5 / Lambda Labs",
  },
];

export type PrecisionFormat = "fp16" | "fp8" | "awq-4bit" | "gptq-4bit";

export interface VramCalculationParams {
  modelId: string;
  precision: PrecisionFormat;
  contextWindow: number;
  concurrency: number;
  gpuId: string;
  tensorParallel: number;
  kvCacheQuantization: "fp16" | "fp8";
  vllmCacheFraction: number; // e.g. 0.90
}

export interface VramBreakdown {
  modelWeightsGiB: number;
  kvCachePerReqGiB: number;
  totalKvCacheGiB: number;
  cudaOverheadGiB: number;
  totalVramRequiredGiB: number;
  vramPerGpuGiB: number;
  gpuCapacityGiB: number;
  isOOM: boolean;
  maxSupportedConcurrency: number;
  estimatedTokensPerSec: number;
  monthlyGpuCostOnDemand: number;
  monthlyGpuCostSpot: number;
  apiBreakEvenTokensPerDay: number; // vs OpenAI/DeepSeek API (~$1.50/1M tokens avg)
  recommendedFix?: {
    action: string;
    details: string;
    newVramGiB: number;
    newMaxConcurrency: number;
  };
}

export function calculateVllmRequirements(params: VramCalculationParams): VramBreakdown {
  const model = POPULAR_MODELS.find((m) => m.id === params.modelId) || POPULAR_MODELS[0];
  const gpu = GPUS.find((g) => g.id === params.gpuId) || GPUS[2];

  // 1. Model Weights Memory (GiB)
  // Bytes per parameter based on precision
  let bytesPerParam = 2.0; // fp16
  if (params.precision === "fp8") bytesPerParam = 1.0;
  if (params.precision === "awq-4bit" || params.precision === "gptq-4bit") bytesPerParam = 0.55; // 4-bit plus scale factor metadata

  const modelWeightsGiB = (model.parametersB * 1e9 * bytesPerParam) / (1024 * 1024 * 1024);

  // 2. KV Cache per token calculation
  // Formula for standard MHA / GQA: 2 * num_layers * num_key_value_heads * head_dim * bytes_per_element
  const headDim = model.hiddenSize / model.numAttentionHeads;
  const kvBytesPerElem = params.kvCacheQuantization === "fp8" ? 1 : 2;
  // Key bytes + Value bytes = 2
  const bytesPerToken = 2 * model.numLayers * model.numKeyValueHeads * headDim * kvBytesPerElem;

  // Total KV Cache per concurrent request at given context window
  const kvCachePerReqGiB = (bytesPerToken * params.contextWindow) / (1024 * 1024 * 1024);
  const totalKvCacheGiB = kvCachePerReqGiB * params.concurrency;

  // 3. CUDA Runtime & Activation Buffer overhead (usually ~1.5 - 2.5 GiB per GPU)
  const cudaOverheadGiB = 2.0 * params.tensorParallel;

  // Total system VRAM
  const totalVramRequiredGiB = modelWeightsGiB + totalKvCacheGiB + cudaOverheadGiB;

  // Distribution across Tensor Parallel GPUs
  const totalClusterVramCapacity = gpu.vramGiB * params.tensorParallel;
  const vramPerGpuGiB = totalVramRequiredGiB / params.tensorParallel;
  const isOOM = totalVramRequiredGiB > totalClusterVramCapacity * params.vllmCacheFraction;

  // Maximum concurrency that fits in remaining available VRAM
  const availableVramForKv = Math.max(
    0,
    totalClusterVramCapacity * params.vllmCacheFraction - modelWeightsGiB - cudaOverheadGiB
  );
  const maxSupportedConcurrency = kvCachePerReqGiB > 0 ? Math.floor(availableVramForKv / kvCachePerReqGiB) : 0;

  // Bandwidth-based token generation speed (Memory-bound autoregressive decoding)
  // TPS roughly = (Total Memory Bandwidth in TB/s * 1024) / (modelWeightsGiB)
  const totalBandwidthTB = gpu.memoryBandwidthTBps * params.tensorParallel;
  const memoryPerTokenRead = Math.max(modelWeightsGiB, 1);
  const estimatedTokensPerSec = Math.round((totalBandwidthTB * 1024 * 0.65) / memoryPerTokenRead);

  // Monthly Cloud GPU Cost
  const monthlyGpuCostOnDemand = gpu.hourlyRateOnDemand * params.tensorParallel * 730;
  const monthlyGpuCostSpot = gpu.hourlyRateSpot * params.tensorParallel * 730;

  // Commercial API cost baseline (average $1.00 - $2.00 per 1M blended input/output tokens)
  // Breakeven: (Monthly Cost / 1.50) * 1M / 30 days
  const apiBreakEvenTokensPerDay = Math.round((monthlyGpuCostOnDemand / 1.5) * (1000000 / 30));

  // Compute "Smallest Change That Fits" recommendation if in OOM state
  let recommendedFix: VramBreakdown["recommendedFix"] = undefined;
  if (isOOM) {
    // Option A: Try switching to FP8 (if currently fp16)
    if (params.precision === "fp16") {
      const fp8WeightsGiB = (model.parametersB * 1e9 * 1.0) / (1024 * 1024 * 1024);
      const fp8TotalVram = fp8WeightsGiB + totalKvCacheGiB + cudaOverheadGiB;
      const clusterBudget = totalClusterVramCapacity * params.vllmCacheFraction;
      if (fp8TotalVram <= clusterBudget) {
        const remainingKv = Math.max(0, clusterBudget - fp8WeightsGiB - cudaOverheadGiB);
        const maxStreams = kvCachePerReqGiB > 0 ? Math.floor(remainingKv / kvCachePerReqGiB) : 0;
        recommendedFix = {
          action: "Switch Precision to FP8",
          details: `Reduces model weights to ${(fp8WeightsGiB).toFixed(1)} GiB, bringing total cluster VRAM to ${(fp8TotalVram).toFixed(1)} GiB.`,
          newVramGiB: parseFloat(fp8TotalVram.toFixed(1)),
          newMaxConcurrency: maxStreams,
        };
      }
    }

    // Option B: If not fixed by FP8, try next Tensor Parallelism (e.g. 2 -> 4 or 4 -> 8)
    if (!recommendedFix) {
      const nextTp = params.tensorParallel * 2;
      if (nextTp <= 8) {
        const nextCapacity = gpu.vramGiB * nextTp;
        const nextCudaOverhead = 2.0 * nextTp;
        const nextTotalVram = modelWeightsGiB + totalKvCacheGiB + nextCudaOverhead;
        if (nextTotalVram <= nextCapacity * params.vllmCacheFraction) {
          const remainingKv = Math.max(0, nextCapacity * params.vllmCacheFraction - modelWeightsGiB - nextCudaOverhead);
          const maxStreams = kvCachePerReqGiB > 0 ? Math.floor(remainingKv / kvCachePerReqGiB) : 0;
          recommendedFix = {
            action: `Scale Tensor Parallelism to TP=${nextTp}`,
            details: `Expands cluster to ${nextTp}x ${gpu.name} (${nextCapacity} GiB VRAM), fitting current workload with headroom.`,
            newVramGiB: parseFloat(nextTotalVram.toFixed(1)),
            newMaxConcurrency: maxStreams,
          };
        }
      }
    }

    // Option C: If hardware cannot be easily changed, suggest lowering concurrency or context
    if (!recommendedFix && maxSupportedConcurrency > 0) {
      recommendedFix = {
        action: `Reduce Concurrency to ${maxSupportedConcurrency} parallel streams`,
        details: `Fits within the current ${totalClusterVramCapacity} GiB capacity without changing model precision or GPU count.`,
        newVramGiB: parseFloat((modelWeightsGiB + (kvCachePerReqGiB * maxSupportedConcurrency) + cudaOverheadGiB).toFixed(1)),
        newMaxConcurrency: maxSupportedConcurrency,
      };
    } else if (!recommendedFix) {
      // Suggest AWQ 4-bit as fallback
      const awqWeightsGiB = (model.parametersB * 1e9 * 0.55) / (1024 * 1024 * 1024);
      const awqTotalVram = awqWeightsGiB + totalKvCacheGiB + cudaOverheadGiB;
      const clusterBudget = totalClusterVramCapacity * params.vllmCacheFraction;
      const remainingKv = Math.max(0, clusterBudget - awqWeightsGiB - cudaOverheadGiB);
      const maxStreams = kvCachePerReqGiB > 0 ? Math.floor(remainingKv / kvCachePerReqGiB) : 0;
      recommendedFix = {
        action: "Quantize weights to AWQ 4-bit",
        details: `Shrinks weights to ${(awqWeightsGiB).toFixed(1)} GiB, leaving substantial VRAM headroom for KV cache.`,
        newVramGiB: parseFloat(awqTotalVram.toFixed(1)),
        newMaxConcurrency: maxStreams,
      };
    }
  }

  return {
    modelWeightsGiB: parseFloat(modelWeightsGiB.toFixed(2)),
    kvCachePerReqGiB: parseFloat(kvCachePerReqGiB.toFixed(3)),
    totalKvCacheGiB: parseFloat(totalKvCacheGiB.toFixed(2)),
    cudaOverheadGiB: parseFloat(cudaOverheadGiB.toFixed(2)),
    totalVramRequiredGiB: parseFloat(totalVramRequiredGiB.toFixed(2)),
    vramPerGpuGiB: parseFloat(vramPerGpuGiB.toFixed(2)),
    gpuCapacityGiB: totalClusterVramCapacity,
    isOOM,
    maxSupportedConcurrency,
    estimatedTokensPerSec,
    monthlyGpuCostOnDemand: Math.round(monthlyGpuCostOnDemand),
    monthlyGpuCostSpot: Math.round(monthlyGpuCostSpot),
    apiBreakEvenTokensPerDay,
    recommendedFix,
  };
}
