"use client";

import { useState } from "react";
import { calculatePromptCaching, PromptCachingResult } from "@/lib/calculators";
import { Copy, Check } from "lucide-react";

export default function PromptCachingCalculator() {
  const [systemPromptTokens, setSystemPromptTokens] = useState<number>(8000);
  const [dailyRequests, setDailyRequests] = useState<number>(10000);
  const [cacheHitRatePercent, setCacheHitRatePercent] = useState<number>(75);
  const [inputPricePerMillion, setInputPricePerMillion] = useState<number>(2.50);
  const [cachedPricePerMillion, setCachedPricePerMillion] = useState<number>(1.25);
  const [copied, setCopied] = useState<boolean>(false);

  const result: PromptCachingResult = calculatePromptCaching({
    systemPromptTokens,
    dailyRequests,
    cacheHitRatePercent,
    inputPricePerMillion,
    cachedPricePerMillion,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `DevOpsKit Prompt Caching Savings Breakdown:\nSystem Tokens: ${systemPromptTokens}\nDaily Reqs: ${dailyRequests}\nHit Rate: ${cacheHitRatePercent}%\nStandard Bill: $${result.monthlyWithoutCache.toFixed(2)}/mo\nCached Bill: $${result.monthlyWithCache.toFixed(2)}/mo\nNet Savings: $${result.monthlySavings.toFixed(2)}/mo (${result.savingsPercentage.toFixed(1)}% saved)\nAnnual Savings: $${result.annualSavings.toFixed(2)}/yr`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-6 bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900 text-base">Cache Parameters</h3>
            <span className="text-xs text-emerald-600 font-mono font-medium">50% - 90% Discount</span>
          </div>

          {/* 1-Click Startup Archetypes */}
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              ⚡ 1-Click Real-World Archetypes
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSystemPromptTokens(12000);
                  setDailyRequests(5000);
                  setCacheHitRatePercent(80);
                  setInputPricePerMillion(3.00);
                  setCachedPricePerMillion(0.30);
                }}
                className="px-2.5 py-2 text-left rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-xs"
              >
                <div className="font-semibold text-slate-800">Claude Coding Agent</div>
                <div className="text-[10px] text-slate-500">12k ctx • 80% hit</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSystemPromptTokens(6000);
                  setDailyRequests(30000);
                  setCacheHitRatePercent(65);
                  setInputPricePerMillion(2.50);
                  setCachedPricePerMillion(1.25);
                }}
                className="px-2.5 py-2 text-left rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-xs"
              >
                <div className="font-semibold text-slate-800">Support RAG Bot</div>
                <div className="text-[10px] text-slate-500">6k ctx • 30k reqs</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSystemPromptTokens(45000);
                  setDailyRequests(1000);
                  setCacheHitRatePercent(90);
                  setInputPricePerMillion(0.075);
                  setCachedPricePerMillion(0.01875);
                }}
                className="px-2.5 py-2 text-left rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-xs"
              >
                <div className="font-semibold text-slate-800">Doc Analysis</div>
                <div className="text-[10px] text-slate-500">45k ctx • Gemini</div>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">System Prompt Tokens</span>
                <span className="text-blue-600 font-mono font-semibold">{systemPromptTokens.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="500"
                value={systemPromptTokens}
                onChange={(e) => setSystemPromptTokens(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <input
                type="number"
                min="0"
                value={systemPromptTokens}
                onChange={(e) => setSystemPromptTokens(Number(e.target.value))}
                className="mt-1.5 w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Cache Hit Rate</span>
                <span className="text-emerald-600 font-mono font-semibold">{cacheHitRatePercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={cacheHitRatePercent}
                onChange={(e) => setCacheHitRatePercent(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Percentage of requests that successfully read from memory cache
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Daily Requests</span>
                <span className="text-blue-600 font-mono font-semibold">{dailyRequests.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="500000"
                step="500"
                value={dailyRequests}
                onChange={(e) => setDailyRequests(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-slate-700 font-medium text-xs block mb-1">Input $/1M Tokens</label>
                <input
                  type="number"
                  step="0.05"
                  value={inputPricePerMillion}
                  onChange={(e) => setInputPricePerMillion(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-700 font-medium text-xs block mb-1">Cached $/1M Tokens</label>
                <input
                  type="number"
                  step="0.05"
                  value={cachedPricePerMillion}
                  onChange={(e) => setCachedPricePerMillion(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Output KPI Cards */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 text-base">Savings Breakdown</h3>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 text-xs font-medium transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied!" : "Copy Report"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-5">
              <span className="text-xs font-medium text-slate-500 block mb-1">Monthly Bill (No Cache)</span>
              <div className="text-2xl font-bold text-slate-900 font-mono">
                ${result.monthlyWithoutCache.toFixed(2)}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">Full rate on all tokens</span>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-200 text-emerald-900 rounded-xl p-5">
              <span className="text-xs font-medium text-emerald-700 block mb-1">Monthly Bill (With Cache)</span>
              <div className="text-2xl font-bold text-emerald-900 font-mono">
                ${result.monthlyWithCache.toFixed(2)}
              </div>
              <span className="text-[11px] text-emerald-700/80 mt-1 block">Factoring {cacheHitRatePercent}% hit rate</span>
            </div>
          </div>

          <div className="bg-blue-50/60 border border-blue-200 text-blue-900 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block mb-1">
                Net Monthly Savings
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-950 font-mono">
                ${result.monthlySavings.toFixed(2)}
                <span className="text-sm font-normal text-slate-600 ml-2">/ month</span>
              </div>
              <p className="text-xs text-blue-800 mt-2">
                Equivalent to <strong className="font-semibold text-blue-950">${result.annualSavings.toFixed(2)}</strong> saved annually ({result.savingsPercentage.toFixed(1)}% reduction).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
