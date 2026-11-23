"use client";

import { useState } from "react";
import { Copy, Check, ArrowRightLeft, DollarSign, Zap, Download } from "lucide-react";
import { downloadCSV } from "@/lib/export";
import ShareBar from "./ShareBar";

interface ComparisonItem {
  name: string;
  provider: string;
  inputPer1M: number;
  cachedInputPer1M: number;
  outputPer1M: number;
  contextWindow: number;
  cacheTtl: string;
  badge: string;
}

const GPT_4O: ComparisonItem = {
  name: "GPT-4o",
  provider: "OpenAI",
  inputPer1M: 2.50,
  cachedInputPer1M: 1.25,
  outputPer1M: 10.00,
  contextWindow: 128000,
  cacheTtl: "Automatic (5 to 10 mins)",
  badge: "Multimodal Leader",
};

const CLAUDE_SONNET: ComparisonItem = {
  name: "Claude 3.7 Sonnet",
  provider: "Anthropic",
  inputPer1M: 3.00,
  cachedInputPer1M: 0.30,
  outputPer1M: 15.00,
  contextWindow: 200000,
  cacheTtl: "Explicit Cache Control (5 mins)",
  badge: "Coding & Reasoning Leader",
};

export default function Gpt4oVsClaudeSonnetCalculator() {
  const [inputTokens, setInputTokens] = useState<number>(3000);
  const [outputTokens, setOutputTokens] = useState<number>(800);
  const [cacheHitRate, setCacheHitRate] = useState<number>(60);
  const [dailyRequests, setDailyRequests] = useState<number>(25000);
  const [copied, setCopied] = useState<boolean>(false);

  // Math calculation
  const cachedTokensPerReq = Math.round(inputTokens * (cacheHitRate / 100));
  const uncachedTokensPerReq = inputTokens - cachedTokensPerReq;

  const calculateCost = (m: ComparisonItem) => {
    const costPerReq =
      (uncachedTokensPerReq / 1e6) * m.inputPer1M +
      (cachedTokensPerReq / 1e6) * m.cachedInputPer1M +
      (outputTokens / 1e6) * m.outputPer1M;
    const dailyCost = costPerReq * dailyRequests;
    const monthlyCost = dailyCost * 30;
    return {
      costPer1k: costPerReq * 1000,
      dailyCost,
      monthlyCost,
    };
  };

  const gptCost = calculateCost(GPT_4O);
  const claudeCost = calculateCost(CLAUDE_SONNET);
  const monthlyDiff = Math.abs(gptCost.monthlyCost - claudeCost.monthlyCost);
  const cheaperModel = gptCost.monthlyCost < claudeCost.monthlyCost ? "GPT-4o" : "Claude 3.7 Sonnet";

  const handleCopy = () => {
    const text = [
      `⚔️ GPT-4o vs Claude 3.7 Sonnet API Pricing Breakdown`,
      `Inputs: ${inputTokens.toLocaleString()} in (${cacheHitRate}% cached) | ${outputTokens.toLocaleString()} out | ${dailyRequests.toLocaleString()} reqs/day`,
      `GPT-4o: $${gptCost.monthlyCost.toFixed(2)}/mo ($${gptCost.dailyCost.toFixed(2)}/day)`,
      `Claude 3.7 Sonnet: $${claudeCost.monthlyCost.toFixed(2)}/mo ($${claudeCost.dailyCost.toFixed(2)}/day)`,
      `Cheaper Option: ${cheaperModel} saves $${monthlyDiff.toFixed(2)}/mo`,
    ].join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <ShareBar
        title="GPT-4o vs Claude 3.7 Sonnet Cost Comparison"
        markdownSnippet={`### ⚔️ GPT-4o vs Claude 3.7 Sonnet\n- **GPT-4o:** $${gptCost.monthlyCost.toFixed(2)}/mo\n- **Claude 3.7 Sonnet:** $${claudeCost.monthlyCost.toFixed(2)}/mo\n- **Cheaper:** ${cheaperModel} saves $${monthlyDiff.toFixed(2)}/mo`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-6 bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900 text-base">Workload Parameters</h3>
            <span className="text-xs text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded font-mono font-medium">
              Verified 2026 Rates
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Input Tokens Per Request</span>
                <span className="text-blue-600 font-mono font-semibold">{inputTokens.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="200"
                max="50000"
                step="200"
                value={inputTokens}
                onChange={(e) => setInputTokens(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Output Tokens Per Request</span>
                <span className="text-blue-600 font-mono font-semibold">{outputTokens.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="50"
                max="8000"
                step="50"
                value={outputTokens}
                onChange={(e) => setOutputTokens(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Prompt Cache Hit Rate (%)</span>
                <span className="text-emerald-600 font-mono font-semibold">{cacheHitRate}% cached</span>
              </div>
              <input
                type="range"
                min="0"
                max="95"
                step="5"
                value={cacheHitRate}
                onChange={(e) => setCacheHitRate(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Anthropic gives 90% prompt caching discount ($0.30/1M) vs OpenAI 50% discount ($1.25/1M).
              </p>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Daily API Requests</span>
                <span className="text-blue-600 font-mono font-semibold">{dailyRequests.toLocaleString()} reqs/day</span>
              </div>
              <input
                type="range"
                min="500"
                max="200000"
                step="500"
                value={dailyRequests}
                onChange={(e) => setDailyRequests(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Right Head-to-Head Card */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Cost Verdict</h3>
              <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800">
                {cheaperModel} is cheaper
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* GPT-4o */}
              <div
                className={`p-4 rounded-xl border space-y-2 ${
                  cheaperModel === "GPT-4o"
                    ? "bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-400"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">GPT-4o</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-medium">OpenAI</span>
                </div>
                <div className="text-2xl font-extrabold font-mono text-slate-900">
                  ${gptCost.monthlyCost.toFixed(2)}
                  <span className="text-xs font-normal text-slate-400">/mo</span>
                </div>
                <div className="text-xs text-slate-600 font-mono">
                  ${gptCost.dailyCost.toFixed(2)} / day • ${gptCost.costPer1k.toFixed(3)}/1k reqs
                </div>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                  $2.50 in • $1.25 cached • $10.00 out
                </div>
              </div>

              {/* Claude 3.7 Sonnet */}
              <div
                className={`p-4 rounded-xl border space-y-2 ${
                  cheaperModel === "Claude 3.7 Sonnet"
                    ? "bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-400"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Claude 3.7</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">Anthropic</span>
                </div>
                <div className="text-2xl font-extrabold font-mono text-slate-900">
                  ${claudeCost.monthlyCost.toFixed(2)}
                  <span className="text-xs font-normal text-slate-400">/mo</span>
                </div>
                <div className="text-xs text-slate-600 font-mono">
                  ${claudeCost.dailyCost.toFixed(2)} / day • ${claudeCost.costPer1k.toFixed(3)}/1k reqs
                </div>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                  $3.00 in • $0.30 cached • $15.00 out
                </div>
              </div>
            </div>

            {/* Architectural Key Difference Notice */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-700">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-amber-500" />
                <span>The Prompt Caching Flip Point:</span>
              </div>
              <p className="leading-relaxed">
                While Claude 3.7 Sonnet has higher un-cached input ($3.00 vs $2.50) and output rates ($15.00 vs $10.00),
                Anthropic offers a <strong>90% prompt caching discount ($0.30/1M)</strong> compared to OpenAI's{" "}
                <strong>50% discount ($1.25/1M)</strong>. In high-context RAG and agent architectures with &gt;75% cache hits,
                Claude 3.7 can match or beat GPT-4o total monthly costs.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied Breakdown" : "Copy Comparison Spec"}
              </button>
              <button
                type="button"
                onClick={() =>
                  downloadCSV("gpt4o-vs-claude37-comparison.csv", [
                    {
                      Metric: "Monthly Spend",
                      "GPT-4o ($)": gptCost.monthlyCost.toFixed(2),
                      "Claude 3.7 Sonnet ($)": claudeCost.monthlyCost.toFixed(2),
                    },
                    {
                      Metric: "Daily Spend",
                      "GPT-4o ($)": gptCost.dailyCost.toFixed(2),
                      "Claude 3.7 Sonnet ($)": claudeCost.dailyCost.toFixed(2),
                    },
                  ])
                }
                className="p-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                title="Download CSV"
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
