import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import VllmHardwareProfiler from "@/components/tools/VllmHardwareProfiler";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "vLLM & Self-Hosted LLM GPU Sizing / VRAM Profiler — Llama 3.3, DeepSeek R1 & Qwen 2.5",
  "Calculate exact VRAM requirements, KV cache allocation, Tensor Parallelism, token throughput, and cloud GPU costs for self-hosting open-weights LLMs with vLLM.",
  "vllm-gpu-hardware-profiler"
);

const faqs = [
  {
    question: "How do you calculate KV Cache VRAM in vLLM?",
    answer:
      "KV cache memory per token equals: 2 * num_layers * num_key_value_heads * (hidden_size / num_attention_heads) * bytes_per_element. In Grouped Query Attention (GQA) like Llama 3.3, KV heads are reduced (e.g., 8 heads vs 64 attention heads), drastically lowering VRAM usage compared to older architectures.",
  },
  {
    question: "When is self-hosting an LLM cheaper than using the OpenAI or DeepSeek API?",
    answer:
      "Self-hosting becomes cost-effective once daily token consumption exceeds the breakeven threshold (typically 3M to 8M tokens/day for a 70B model running on a dual-A100/L40S node). Below that volume, serverless pay-per-token APIs are significantly cheaper due to zero idle compute overhead.",
  },
  {
    question: "What is the difference between AWQ 4-bit and FP8 quantization in vLLM?",
    answer:
      "AWQ (Activation-aware Weight Quantization) compresses model weights to 4-bit integers with minimal accuracy loss, allowing 70B models to fit on two 24GB GPUs (e.g. RTX 4090 or L4). FP8 uses 8-bit floating point natively supported on NVIDIA Ada Lovelace and Hopper (H100/L40S) architectures for near-zero degradation and maximum decoding speed.",
  },
];

export default function VllmProfilerPage() {
  const structuredData = generateStructuredData(
    "vLLM & Self-Hosted LLM GPU Sizing Profiler",
    "Calculate VRAM, KV Cache, Tensor Parallelism and cluster hardware sizing for self-hosted LLM deployments.",
    "vllm-gpu-hardware-profiler",
    faqs
  );

  return (
    <ToolShell
      title="vLLM GPU Sizing & VRAM Hardware Profiler"
      description="Estimate exact VRAM allocation, KV cache compounding, Tensor Parallelism count, tokens/sec generation speed, and monthly cloud GPU expenses for self-hosting Llama 3.3, DeepSeek R1, and Qwen 2.5."
      category="AI & LLM"
      categoryHref="/#ai-calculators"
      badge="vLLM v0.6+ Profiler"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredData}
      />

      <VllmHardwareProfiler />

      {/* Deep Technical Engineering Guide & Methodology */}
      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            The Physics of LLM Serving: Why Naive VRAM Calculators Cause OOM Crashes
          </h2>
          <p className="mb-4">
            Most developers estimate GPU memory simply by multiplying model parameter count by precision bytes:
            for instance, a 70B parameter model in FP16 weighs approximately 140 GiB. However, deploying that model
            on two 80GB A100 GPUs (160 GiB total VRAM) will immediately crash with an Out-of-Memory (OOM) error the moment
            real user traffic arrives.
          </p>
          <p>
            In production LLM inference engines like <strong>vLLM</strong>, <strong>TGI</strong>, and <strong>TensorRT-LLM</strong>,
            VRAM is divided into three distinct arenas:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <h3 className="font-bold text-slate-900 mb-1 text-sm">1. Static Weight Memory</h3>
            <p className="text-xs text-slate-600">
              Fixed memory footprint determined by parameter count and quantization format (16-bit = 2.0 B/param, 8-bit = 1.0 B/param, 4-bit = ~0.55 B/param).
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <h3 className="font-bold text-slate-900 mb-1 text-sm">2. Dynamic KV Cache</h3>
            <p className="text-xs text-slate-600">
              The Key-Value tensor cache grows linearly with context length and concurrent streams:
              <code>2 × Layers × KV_Heads × Head_Dim × Precision × Context × Concurrency</code>.
            </p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <h3 className="font-bold text-slate-900 mb-1 text-sm">3. CUDA Runtime & PagedAttention</h3>
            <p className="text-xs text-slate-600">
              PyTorch runtime, CUDA kernels, scratchpad intermediate activations, and KV block allocation tables reserve 1.5 to 2.5 GiB per GPU device.
            </p>
          </div>
        </div>

        {/* Real-World Production Architecture Scenarios */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Production Architectural Guidelines</h3>
          <ul className="space-y-3 text-xs text-slate-600">
            <li className="flex gap-2">
              <span className="font-bold text-slate-800">Llama 3.3 70B (AWQ 4-Bit) on 2x L40S (96 GB):</span>
              <span>Fits model weights (~40 GB) + leaves over 48 GB dedicated entirely to KV cache, supporting up to 32 concurrent 16k context streams.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-slate-800">DeepSeek R1 671B MoE on 8x H100 (640 GB):</span>
              <span>Requires FP8 quantization and Tensor Parallelism = 8. Uses DeepSeek MLA (Multi-head Latent Attention) to drastically compress KV cache dimensions.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-slate-800">High-Concurrency API Servers:</span>
              <span>Always enable <code>--kv-cache-dtype fp8</code> in vLLM to double the concurrent request capacity without degrading generation perplexity.</span>
            </li>
          </ul>
        </div>
      </article>
    </ToolShell>
  );
}
