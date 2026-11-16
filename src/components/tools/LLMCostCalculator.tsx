"use client";

import { useState } from "react";
import { calculateLLMCosts, ModelCostBreakdown } from "@/lib/calculators";
import { Copy, Check } from "lucide-react";

export default function LLMCostCalculator() {
  const [inputTokens, setInputTokens] = useState<number>(1000);
  const [outputTokens, setOutputTokens] = useState<number>(400);
  const [cachedTokens, setCachedTokens] = useState<number>(0);
  const [requestsPerDay, setRequestsPerDay] = useState<number>(5000);
  const [copied, setCopied] = useState<boolean>(false);

  const results: ModelCostBreakdown[] = calculateLLMCosts({
    inputTokens,
    outputTokens,
    cachedTokens,
    requestsPerDay,
  });

  const handleCopy = () => {
    const text = results
      .map(
        (r) =>
          `${r.name} (${r.provider}): $${r.costPerDay.toFixed(2)}/day | $${r.costPerMonth.toFixed(2)}/mo`
      )
      .join("\n");
    navigator.clipboard.writeText(
      `DevOpsKit LLM Cost Breakdown:\nInputs: ${inputTokens} In, ${outputTokens} Out, ${cachedTokens} Cached, ${requestsPerDay} Req/day\n\n${text}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyPreset = (inTok: number, outTok: number, cachedTok: number, reqs: number) => {
    setInputTokens(inTok);
    setOutputTokens(outTok);
    setCachedTokens(cachedTok);
    setRequestsPerDay(reqs);
  };

  return (
    <div className="space-y-8">
      {/* Interactive Controls & Live Readouts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-5 space-y-6 bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900 text-base">Usage Parameters</h3>
            <span className="text-xs text-slate-500 font-mono">Real-Time Reactive</span>
          </div>

          {/* Quick Presets */}
          <div>
            <label className="text-slate-700 font-medium text-xs block mb-2">
              Preset Scenarios
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => applyPreset(500, 150, 0, 2000)}
                className="px-2.5 py-1.5 text-xs rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
              >
                Chat Bot
              </button>
              <button
                type="button"
                onClick={() => applyPreset(12000, 800, 8000, 5000)}
                className="px-2.5 py-1.5 text-xs rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
              >
                RAG Pipeline
              </button>
              <button
                type="button"
                onClick={() => applyPreset(25000, 2500, 15000, 1000)}
                className="px-2.5 py-1.5 text-xs rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
              >
                Agent Loop
              </button>
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Input Tokens / Req</span>
                <span className="text-blue-600 font-mono font-semibold">{inputTokens.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="50"
                max="100000"
                step="50"
                value={inputTokens}
                onChange={(e) => setInputTokens(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <input
                type="number"
                min="0"
                value={inputTokens}
                onChange={(e) => setInputTokens(Number(e.target.value))}
                className="mt-1.5 w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Output Tokens / Req</span>
                <span className="text-blue-600 font-mono font-semibold">{outputTokens.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10"
                max="8000"
                step="10"
                value={outputTokens}
                onChange={(e) => setOutputTokens(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <input
                type="number"
                min="0"
                value={outputTokens}
                onChange={(e) => setOutputTokens(Number(e.target.value))}
                className="mt-1.5 w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Cached Input Tokens / Req</span>
                <span className="text-emerald-600 font-mono font-semibold">{cachedTokens.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max={inputTokens}
                step="50"
                value={cachedTokens}
                onChange={(e) => setCachedTokens(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Up to {inputTokens.toLocaleString()} tokens discounted by provider prompt caching
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Daily Requests</span>
                <span className="text-blue-600 font-mono font-semibold">{requestsPerDay.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="100"
                max="500000"
                step="500"
                value={requestsPerDay}
                onChange={(e) => setRequestsPerDay(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <input
                type="number"
                min="1"
                value={requestsPerDay}
                onChange={(e) => setRequestsPerDay(Number(e.target.value))}
                className="mt-1.5 w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Output Comparison Table */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 text-base">Cost Comparison</h3>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-medium transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied!" : "Copy Breakdown"}</span>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 text-[11px] font-semibold">
                  <tr>
                    <th className="py-3 px-4">Model &amp; Provider</th>
                    <th className="py-3 px-4">Per 1k Reqs</th>
                    <th className="py-3 px-4">Daily Cost</th>
                    <th className="py-3 px-4 text-right">Monthly (30d)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {results.map((r) => (
                    <tr key={r.modelId} className="hover:bg-slate-50/80 border-b border-slate-100 text-slate-700 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900 font-sans text-sm">{r.name}</div>
                        <div className="text-[11px] text-slate-500 font-sans">{r.provider}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        ${(r.costPerRequest * 1000).toFixed(4)}
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        ${r.costPerDay.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-blue-600 text-sm">
                        ${r.costPerMonth.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
