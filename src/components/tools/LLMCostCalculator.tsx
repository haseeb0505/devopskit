"use client";

import { useState, useEffect } from "react";
import { calculateLLMCosts, ModelCostBreakdown } from "@/lib/calculators";
import { Copy, Check, Download } from "lucide-react";
import { downloadCSV } from "@/lib/export";
import ShareBar from "./ShareBar";

export default function LLMCostCalculator() {
  const [inputTokens, setInputTokens] = useState<number>(1000);
  const [outputTokens, setOutputTokens] = useState<number>(400);
  const [cachedTokens, setCachedTokens] = useState<number>(0);
  const [requestsPerDay, setRequestsPerDay] = useState<number>(5000);
  const [copied, setCopied] = useState<boolean>(false);

  // Read URL query params on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const inTok = params.get("in");
    const outTok = params.get("out");
    const cached = params.get("cached");
    const reqs = params.get("reqs");

    if (inTok && !isNaN(Number(inTok))) setInputTokens(Number(inTok));
    if (outTok && !isNaN(Number(outTok))) setOutputTokens(Number(outTok));
    if (cached && !isNaN(Number(cached))) setCachedTokens(Number(cached));
    if (reqs && !isNaN(Number(reqs))) setRequestsPerDay(Number(reqs));
  }, []);

  // Sync state to URL search params (debounced / on change)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    params.set("in", inputTokens.toString());
    params.set("out", outputTokens.toString());
    if (cachedTokens > 0) params.set("cached", cachedTokens.toString());
    params.set("reqs", requestsPerDay.toString());
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [inputTokens, outputTokens, cachedTokens, requestsPerDay]);

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

  const markdownSnippet = [
    `### 🤖 LLM Cost Comparison Estimate`,
    `**Inputs:** ${inputTokens.toLocaleString()} In | ${outputTokens.toLocaleString()} Out | ${cachedTokens.toLocaleString()} Cached | ${requestsPerDay.toLocaleString()} Reqs/day\n`,
    `| Model | Daily Cost | Monthly (30d) |`,
    `| :--- | :--- | :--- |`,
    ...results.slice(0, 5).map((r) => `| **${r.name}** (${r.provider}) | $${r.costPerDay.toFixed(2)} | $${r.costPerMonth.toFixed(2)} |`),
  ].join("\n");

  return (
    <div className="space-y-8">
      {/* 1-Click Share & Export Bar */}
      <ShareBar title="LLM cost breakdown" markdownSnippet={markdownSnippet} />

      {/* Interactive Controls & Live Readouts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-6 bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900 text-base">Usage Parameters</h3>
            <span className="text-xs text-slate-500 font-mono">Real-Time Reactive</span>
          </div>

          {/* 1-Click Startup Archetypes */}
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              ⚡ 1-Click Real-World Archetypes
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => applyPreset(1500, 400, 800, 4000)}
                className="px-2.5 py-2 text-left rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-xs"
              >
                <div className="font-semibold text-slate-800">Seed AI Wrapper</div>
                <div className="text-[10px] text-slate-500">1.5k ctx • 4k reqs</div>
              </button>
              <button
                type="button"
                onClick={() => applyPreset(8000, 800, 5000, 12000)}
                className="px-2.5 py-2 text-left rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-xs"
              >
                <div className="font-semibold text-slate-800">Production RAG</div>
                <div className="text-[10px] text-slate-500">8k ctx • 12k reqs</div>
              </button>
              <button
                type="button"
                onClick={() => applyPreset(20000, 1500, 14000, 25000)}
                className="px-2.5 py-2 text-left rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-xs"
              >
                <div className="font-semibold text-slate-800">Enterprise Chatbot</div>
                <div className="text-[10px] text-slate-500">20k ctx • 25k reqs</div>
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
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 text-base">Cost Comparison</h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  downloadCSV(
                    `llm-cost-estimate-${new Date().toISOString().slice(0, 10)}.csv`,
                    results.map((r) => ({
                      Model: r.name,
                      Provider: r.provider,
                      "Cost per 1k Reqs ($)": parseFloat((r.costPerRequest * 1000).toFixed(6)),
                      "Daily Cost ($)": parseFloat(r.costPerDay.toFixed(4)),
                      "Monthly Cost ($)": parseFloat(r.costPerMonth.toFixed(2)),
                    }))
                  )
                }
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export CSV</span>
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-medium transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copied!" : "Copy Breakdown"}</span>
              </button>
            </div>
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
