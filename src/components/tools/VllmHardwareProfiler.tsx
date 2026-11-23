"use client";

import { useState } from "react";
import {
  POPULAR_MODELS,
  GPUS,
  PrecisionFormat,
  calculateVllmRequirements,
} from "@/lib/calculators/vllmHardware";
import { Copy, Check, Download, AlertTriangle, Cpu, HardDrive, DollarSign, Zap } from "lucide-react";
import { downloadCSV } from "@/lib/export";
import ShareBar from "./ShareBar";

export default function VllmHardwareProfiler() {
  const [modelId, setModelId] = useState<string>("llama-3.3-70b");
  const [precision, setPrecision] = useState<PrecisionFormat>("awq-4bit");
  const [contextWindow, setContextWindow] = useState<number>(16384);
  const [concurrency, setConcurrency] = useState<number>(16);
  const [gpuId, setGpuId] = useState<string>("a100-80gb");
  const [tensorParallel, setTensorParallel] = useState<number>(2);
  const [kvQuant, setKvQuant] = useState<"fp16" | "fp8">("fp8");
  const [copied, setCopied] = useState<boolean>(false);

  const results = calculateVllmRequirements({
    modelId,
    precision,
    contextWindow,
    concurrency,
    gpuId,
    tensorParallel,
    kvCacheQuantization: kvQuant,
    vllmCacheFraction: 0.9,
  });

  const selectedModel = POPULAR_MODELS.find((m) => m.id === modelId) || POPULAR_MODELS[3];
  const selectedGpu = GPUS.find((g) => g.id === gpuId) || GPUS[2];

  const handleCopy = () => {
    const text = [
      `🖥️ vLLM / Self-Hosted GPU Hardware Sizing Estimate`,
      `Model: ${selectedModel.name} (${precision})`,
      `Cluster: ${tensorParallel}x ${selectedGpu.name} (${results.gpuCapacityGiB} GiB Total VRAM)`,
      `Context: ${contextWindow.toLocaleString()} tokens | Concurrency: ${concurrency} parallel streams`,
      `Total VRAM Required: ${results.totalVramRequiredGiB} GiB (${results.isOOM ? "⚠️ OOM Crash" : "✅ Fits comfortably"})`,
      `Estimated Output Speed: ~${results.estimatedTokensPerSec} tokens/sec`,
      `Monthly Cloud Cost: $${results.monthlyGpuCostOnDemand.toLocaleString()}/mo (On-Demand) | $${results.monthlyGpuCostSpot.toLocaleString()}/mo (Spot)`,
      `API Break-Even Point: >${(results.apiBreakEvenTokensPerDay / 1e6).toFixed(1)}M tokens/day`,
    ].join("\n");

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const vramPercent = Math.min(100, Math.round((results.totalVramRequiredGiB / results.gpuCapacityGiB) * 100));

  return (
    <div className="space-y-8">
      <ShareBar
        title="vLLM GPU sizing & VRAM breakdown"
        markdownSnippet={`### 🖥️ vLLM Hardware Sizing: ${selectedModel.name}\n- **Cluster:** ${tensorParallel}x ${selectedGpu.name} (${results.gpuCapacityGiB} GB VRAM)\n- **Status:** ${results.isOOM ? "⚠️ OOM" : "✅ Fits in VRAM"}\n- **Max Concurrency:** ${results.maxSupportedConcurrency} streams\n- **Monthly Cost:** $${results.monthlyGpuCostOnDemand.toLocaleString()}/mo`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Panel */}
        <div className="lg:col-span-6 space-y-6 bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900 text-base">Model & Workload Profile</h3>
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-mono font-medium">
              vLLM v0.6+ Architecture
            </span>
          </div>

          {/* Model Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Target Open Weights Model
            </label>
            <select
              value={modelId}
              onChange={(e) => {
                const m = POPULAR_MODELS.find((mod) => mod.id === e.target.value);
                setModelId(e.target.value);
                if (m && !m.recommendedTP.includes(tensorParallel)) {
                  setTensorParallel(m.recommendedTP[0]);
                }
              }}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 font-medium focus:bg-white focus:border-blue-500 focus:outline-none"
            >
              {POPULAR_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.parametersB}B Params)
                </option>
              ))}
            </select>
          </div>

          {/* Quantization & Weight Precision */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Model Weight Precision
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: "fp16", label: "FP16 / BF16", sub: "16-bit (Lossless)" },
                { id: "fp8", label: "FP8", sub: "8-bit (Native H100)" },
                { id: "awq-4bit", label: "AWQ 4-Bit", sub: "4-bit (Fastest)" },
                { id: "gptq-4bit", label: "GPTQ 4-Bit", sub: "4-bit (High VRAM save)" },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPrecision(p.id as PrecisionFormat)}
                  className={`p-2 text-left rounded-lg border text-xs transition-all ${
                    precision === p.id
                      ? "border-blue-600 bg-blue-50/80 text-blue-900 font-semibold ring-1 ring-blue-500"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="text-xs">{p.label}</div>
                  <div className="text-[10px] text-slate-400 leading-tight">{p.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Context Window Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-700 font-medium">Context Window per Request</span>
              <span className="text-blue-600 font-mono font-semibold">{contextWindow.toLocaleString()} tokens</span>
            </div>
            <input
              type="range"
              min="2048"
              max="65536"
              step="2048"
              value={contextWindow}
              onChange={(e) => setContextWindow(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          {/* Target Concurrency */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-700 font-medium">Target Concurrent Streams</span>
              <span className="text-blue-600 font-mono font-semibold">{concurrency} parallel requests</span>
            </div>
            <input
              type="range"
              min="1"
              max="128"
              step="1"
              value={concurrency}
              onChange={(e) => setConcurrency(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          {/* Hardware Configuration Header */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Cluster GPU Selection & Parallelism
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-600 mb-1">GPU Accelerator Type</label>
                <select
                  value={gpuId}
                  onChange={(e) => setGpuId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-medium focus:bg-white focus:outline-none"
                >
                  {GPUS.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name} (${g.hourlyRateOnDemand}/hr)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-600 mb-1">Tensor Parallelism (TP Count)</label>
                <select
                  value={tensorParallel}
                  onChange={(e) => setTensorParallel(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 font-medium focus:bg-white focus:outline-none"
                >
                  {[1, 2, 4, 8, 16].map((tp) => (
                    <option key={tp} value={tp}>
                      {tp}x GPUs ({tp * selectedGpu.vramGiB} GiB VRAM)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-600 mb-1">KV Cache Quantization</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setKvQuant("fp16")}
                  className={`p-2 text-xs rounded-lg border ${
                    kvQuant === "fp16" ? "border-blue-600 bg-blue-50 font-semibold" : "border-slate-200"
                  }`}
                >
                  FP16 KV Cache (Standard)
                </button>
                <button
                  type="button"
                  onClick={() => setKvQuant("fp8")}
                  className={`p-2 text-xs rounded-lg border ${
                    kvQuant === "fp8" ? "border-blue-600 bg-blue-50 font-semibold" : "border-slate-200"
                  }`}
                >
                  FP8 KV Cache (50% RAM savings)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Panel */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Status Hero Card */}
          <div
            className={`border rounded-2xl p-6 shadow-sm ${
              results.isOOM
                ? "bg-rose-50 border-rose-200 text-rose-950"
                : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200/60">
              <div className="flex items-center gap-2">
                {results.isOOM ? (
                  <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0" />
                ) : (
                  <Cpu className="h-5 w-5 text-emerald-600 shrink-0" />
                )}
                <h3 className="font-bold text-base">
                  {results.isOOM ? "Out Of Memory (OOM) Crash Risk" : "Cluster Sizing: Valid & Production Ready"}
                </h3>
              </div>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-bold ${
                  results.isOOM ? "bg-rose-200 text-rose-900" : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {results.isOOM ? "OOM" : `${vramPercent}% VRAM Used`}
              </span>
            </div>

            {/* VRAM Visual Stack Bar */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-xs text-slate-600 font-mono">
                <span>
                  Allocated: <strong>{results.totalVramRequiredGiB} GiB</strong>
                </span>
                <span>
                  Total Capacity: <strong>{results.gpuCapacityGiB} GiB</strong>
                </span>
              </div>
              <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${(results.modelWeightsGiB / results.gpuCapacityGiB) * 100}%` }}
                  className="bg-blue-600 h-full"
                  title={`Weights: ${results.modelWeightsGiB} GiB`}
                />
                <div
                  style={{ width: `${(results.totalKvCacheGiB / results.gpuCapacityGiB) * 100}%` }}
                  className="bg-purple-500 h-full"
                  title={`KV Cache: ${results.totalKvCacheGiB} GiB`}
                />
                <div
                  style={{ width: `${(results.cudaOverheadGiB / results.gpuCapacityGiB) * 100}%` }}
                  className="bg-amber-400 h-full"
                  title={`CUDA & Activations: ${results.cudaOverheadGiB} GiB`}
                />
              </div>
              <div className="flex flex-wrap gap-4 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  Weights: {results.modelWeightsGiB} GiB
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  KV Cache: {results.totalKvCacheGiB} GiB
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  Overhead: {results.cudaOverheadGiB} GiB
                </span>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
                <div className="text-[11px] text-slate-500 font-medium">Max Stable Concurrency</div>
                <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                  {results.maxSupportedConcurrency} streams
                </div>
                <div className="text-[10px] text-slate-400">at {contextWindow.toLocaleString()} ctx window</div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
                <div className="text-[11px] text-slate-500 font-medium">Est. Generation Throughput</div>
                <div className="text-xl font-bold font-mono text-emerald-600 mt-0.5">
                  ~{results.estimatedTokensPerSec} tok/s
                </div>
                <div className="text-[10px] text-slate-400">cluster memory bandwidth</div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
                <div className="text-[11px] text-slate-500 font-medium">Monthly GPU Cost (On-Demand)</div>
                <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">
                  ${results.monthlyGpuCostOnDemand.toLocaleString()}
                </div>
                <div className="text-[10px] text-emerald-600">${results.monthlyGpuCostSpot.toLocaleString()} on Spot</div>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3">
                <div className="text-[11px] text-slate-500 font-medium">API TCO Break-Even Vol</div>
                <div className="text-xl font-bold font-mono text-blue-600 mt-0.5">
                  &gt;{(results.apiBreakEvenTokensPerDay / 1e6).toFixed(1)}M tok/day
                </div>
                <div className="text-[10px] text-slate-400">cheaper than OpenAI/DeepSeek API</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2.5 mt-6 pt-4 border-t border-slate-200/80">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors shadow-2xs"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied Sizing Spec" : "Copy Cluster Spec"}
              </button>
              <button
                type="button"
                onClick={() =>
                  downloadCSV(`vllm-sizing-${modelId}.csv`, [
                    {
                      Model: selectedModel.name,
                      Precision: precision,
                      "Context Window": contextWindow,
                      Concurrency: concurrency,
                      "GPU Accelerator": selectedGpu.name,
                      "Tensor Parallel": tensorParallel,
                      "Total VRAM (GB)": results.totalVramRequiredGiB,
                      "VRAM Capacity (GB)": results.gpuCapacityGiB,
                      "Is OOM": results.isOOM ? "YES" : "NO",
                      "Monthly On-Demand ($)": results.monthlyGpuCostOnDemand,
                      "Monthly Spot ($)": results.monthlyGpuCostSpot,
                    },
                  ])
                }
                className="p-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                title="Export CSV"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
