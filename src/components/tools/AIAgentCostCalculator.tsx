"use client";

import { useState } from "react";
import { calculateAIAgentCost, AIAgentResult } from "@/lib/calculators";
import { Copy, Check } from "lucide-react";

export default function AIAgentCostCalculator() {
  const [initialPromptTokens, setInitialPromptTokens] = useState<number>(2000);
  const [avgStepsPerRun, setAvgStepsPerRun] = useState<number>(5);
  const [toolResultTokensPerStep, setToolResultTokensPerStep] = useState<number>(500);
  const [outputTokensPerStep, setOutputTokensPerStep] = useState<number>(350);
  const [monthlyRuns, setMonthlyRuns] = useState<number>(10000);
  const [modelInputPer1M, setModelInputPer1M] = useState<number>(2.50);
  const [modelOutputPer1M, setModelOutputPer1M] = useState<number>(10.00);
  const [copied, setCopied] = useState<boolean>(false);

  const result: AIAgentResult = calculateAIAgentCost({
    initialPromptTokens,
    avgStepsPerRun,
    toolResultTokensPerStep,
    outputTokensPerStep,
    monthlyRuns,
    modelInputPer1M,
    modelOutputPer1M,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `DevOpsKit AI Agent Cost Simulation:\nSteps: ${avgStepsPerRun}\nTokens/Run: ${result.tokensPerRun.toLocaleString()}\nCost/Run: $${result.costPerRun.toFixed(4)}\nMonthly Spend: $${result.monthlyCost.toFixed(2)} (${monthlyRuns.toLocaleString()} runs)\nAnnual Spend: $${result.annualCost.toFixed(2)}`
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
            <h3 className="font-semibold text-slate-900 text-base">Agent Loop Parameters</h3>
            <span className="text-xs text-blue-600 font-mono font-medium">Compounding Window</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Initial System &amp; Task Tokens</span>
                <span className="text-blue-600 font-mono font-semibold">{initialPromptTokens.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={initialPromptTokens}
                onChange={(e) => setInitialPromptTokens(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Avg Execution Steps / Run</span>
                <span className="text-blue-600 font-mono font-semibold">{avgStepsPerRun} steps</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={avgStepsPerRun}
                onChange={(e) => setAvgStepsPerRun(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Each step appends thought + tool outputs back into the conversation context
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-700 font-medium text-xs block mb-1">Tool Output / Step</label>
                <input
                  type="number"
                  value={toolResultTokensPerStep}
                  onChange={(e) => setToolResultTokensPerStep(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-700 font-medium text-xs block mb-1">Agent Output / Step</label>
                <input
                  type="number"
                  value={outputTokensPerStep}
                  onChange={(e) => setOutputTokensPerStep(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Monthly Agent Runs</span>
                <span className="text-blue-600 font-mono font-semibold">{monthlyRuns.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="100"
                max="200000"
                step="500"
                value={monthlyRuns}
                onChange={(e) => setMonthlyRuns(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-slate-700 font-medium text-xs block mb-1">Input $/1M</label>
                <input
                  type="number"
                  step="0.1"
                  value={modelInputPer1M}
                  onChange={(e) => setModelInputPer1M(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-700 font-medium text-xs block mb-1">Output $/1M</label>
                <input
                  type="number"
                  step="0.5"
                  value={modelOutputPer1M}
                  onChange={(e) => setModelOutputPer1M(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Readouts */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 text-base">Cost &amp; Context Escalation</h3>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-medium transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied!" : "Copy Report"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-5">
              <span className="text-xs font-medium text-slate-500 block mb-1">Total Tokens per Run</span>
              <div className="text-2xl font-bold text-slate-900 font-mono">
                {result.tokensPerRun.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">Compounded over {avgStepsPerRun} steps</span>
            </div>

            <div className="bg-blue-50/60 border border-blue-200 text-blue-900 rounded-xl p-5">
              <span className="text-xs font-semibold text-blue-700 block mb-1">Cost per Agent Run</span>
              <div className="text-2xl font-bold text-blue-950 font-mono">
                ${result.costPerRun.toFixed(4)}
              </div>
              <span className="text-[11px] text-blue-800/80 mt-1 block">Per full task completion</span>
            </div>
          </div>

          <div className="bg-blue-50/60 border border-blue-200 text-blue-900 rounded-2xl p-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block mb-1">
              Monthly Operational Spend
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-950 font-mono">
              ${result.monthlyCost.toFixed(2)}
              <span className="text-sm font-normal text-slate-600 ml-2">/ month</span>
            </div>
            <p className="text-xs text-blue-800 mt-2">
              Annualized total: <strong className="font-semibold text-blue-950">${result.annualCost.toFixed(2)}/year</strong> for {monthlyRuns.toLocaleString()} monthly workflow runs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
