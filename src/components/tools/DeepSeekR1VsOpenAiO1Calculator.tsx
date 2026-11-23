"use client";

import { useState } from "react";
import { Copy, Check, Download, Zap, AlertTriangle } from "lucide-react";
import { downloadCSV } from "@/lib/export";
import ShareBar from "./ShareBar";

interface ReasoningModel {
  name: string;
  provider: string;
  inputPer1M: number;
  cachedInputPer1M: number;
  outputPer1M: number; // Includes reasoning / thinking tokens
  architecture: string;
}

const DEEPSEEK_R1: ReasoningModel = {
  name: "DeepSeek R1",
  provider: "DeepSeek API",
  inputPer1M: 0.55,
  cachedInputPer1M: 0.14,
  outputPer1M: 2.19,
  architecture: "671B MoE (37B active)",
};

const OPENAI_O1: ReasoningModel = {
  name: "OpenAI o1",
  provider: "OpenAI",
  inputPer1M: 15.00,
  cachedInputPer1M: 7.50,
  outputPer1M: 60.00,
  architecture: "Dense Frontier Reasoning",
};

export default function DeepSeekR1VsOpenAiO1Calculator() {
  const [inputTokens, setInputTokens] = useState<number>(4000);
  const [visibleOutputTokens, setVisibleOutputTokens] = useState<number>(1000);
  const [reasoningTokens, setReasoningTokens] = useState<number>(3000);
  const [dailyRequests, setDailyRequests] = useState<number>(5000);
  const [copied, setCopied] = useState<boolean>(false);

  const totalOutputTokens = visibleOutputTokens + reasoningTokens;

  const calculateCost = (m: ReasoningModel) => {
    const costPerReq = (inputTokens / 1e6) * m.inputPer1M + (totalOutputTokens / 1e6) * m.outputPer1M;
    const dailyCost = costPerReq * dailyRequests;
    const monthlyCost = dailyCost * 30;
    return { costPer1k: costPerReq * 1000, dailyCost, monthlyCost };
  };

  const r1Cost = calculateCost(DEEPSEEK_R1);
  const o1Cost = calculateCost(OPENAI_O1);
  const monthlySavings = o1Cost.monthlyCost - r1Cost.monthlyCost;
  const ratio = Math.round(o1Cost.monthlyCost / Math.max(1, r1Cost.monthlyCost));

  const handleCopy = () => {
    const text = [
      `🧠 DeepSeek R1 vs OpenAI o1 Reasoning Model Pricing`,
      `Inputs: ${inputTokens.toLocaleString()} in | ${visibleOutputTokens.toLocaleString()} visible out + ${reasoningTokens.toLocaleString()} reasoning out`,
      `Daily Volume: ${dailyRequests.toLocaleString()} reqs/day`,
      `DeepSeek R1: $${r1Cost.monthlyCost.toFixed(2)}/mo ($${r1Cost.dailyCost.toFixed(2)}/day)`,
      `OpenAI o1: $${o1Cost.monthlyCost.toFixed(2)}/mo ($${o1Cost.dailyCost.toFixed(2)}/day)`,
      `Savings: DeepSeek R1 is ~${ratio}x cheaper, saving $${monthlySavings.toFixed(2)}/month`,
    ].join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <ShareBar
        title="DeepSeek R1 vs OpenAI o1 Cost Calculator"
        markdownSnippet={`### 🧠 DeepSeek R1 vs OpenAI o1\n- **DeepSeek R1:** $${r1Cost.monthlyCost.toFixed(2)}/mo\n- **OpenAI o1:** $${o1Cost.monthlyCost.toFixed(2)}/mo\n- **Cost Difference:** DeepSeek R1 is ${ratio}x cheaper (saves $${monthlySavings.toFixed(2)}/mo)`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-6 bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900 text-base">Reasoning & Token Volume</h3>
            <span className="text-xs text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded font-mono font-medium">
              Verified 2026 Rates
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Input Prompt Tokens</span>
                <span className="text-blue-600 font-mono font-semibold">{inputTokens.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={inputTokens}
                onChange={(e) => setInputTokens(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Visible Response Output Tokens</span>
                <span className="text-blue-600 font-mono font-semibold">{visibleOutputTokens.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="200"
                max="8000"
                step="100"
                value={visibleOutputTokens}
                onChange={(e) => setVisibleOutputTokens(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Internal Reasoning Tokens ("Thinking")</span>
                <span className="text-purple-600 font-mono font-semibold">{reasoningTokens.toLocaleString()} tokens</span>
              </div>
              <input
                type="range"
                min="500"
                max="16000"
                step="500"
                value={reasoningTokens}
                onChange={(e) => setReasoningTokens(Number(e.target.value))}
                className="w-full accent-purple-600"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Both OpenAI and DeepSeek bill internal reasoning tokens at standard output rates.
              </p>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Daily Invocations</span>
                <span className="text-blue-600 font-mono font-semibold">{dailyRequests.toLocaleString()} reqs/day</span>
              </div>
              <input
                type="range"
                min="100"
                max="50000"
                step="100"
                value={dailyRequests}
                onChange={(e) => setDailyRequests(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Reasoning Model Comparison</h3>
              <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800">
                DeepSeek is ~{ratio}x Cheaper
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* DeepSeek R1 */}
              <div className="p-4 bg-emerald-50/60 border border-emerald-300 ring-1 ring-emerald-400 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">DeepSeek R1</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-medium">DeepSeek</span>
                </div>
                <div className="text-2xl font-extrabold font-mono text-emerald-700">
                  ${r1Cost.monthlyCost.toFixed(2)}
                  <span className="text-xs font-normal text-slate-400">/mo</span>
                </div>
                <div className="text-xs text-slate-600 font-mono">
                  ${r1Cost.dailyCost.toFixed(2)} / day • ${r1Cost.costPer1k.toFixed(3)}/1k reqs
                </div>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                  $0.55 in • $2.19 out
                </div>
              </div>

              {/* OpenAI o1 */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">OpenAI o1</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-medium">OpenAI</span>
                </div>
                <div className="text-2xl font-extrabold font-mono text-slate-900">
                  ${o1Cost.monthlyCost.toFixed(2)}
                  <span className="text-xs font-normal text-slate-400">/mo</span>
                </div>
                <div className="text-xs text-slate-600 font-mono">
                  ${o1Cost.dailyCost.toFixed(2)} / day • ${o1Cost.costPer1k.toFixed(3)}/1k reqs
                </div>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                  $15.00 in • $60.00 out
                </div>
              </div>
            </div>

            {/* Price Delta Highlights */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-700">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-emerald-600" />
                <span>The MoE Architecture Price Advantage:</span>
              </div>
              <p className="leading-relaxed">
                DeepSeek R1 leverages a 671B Mixture-of-Experts architecture that only activates 37B parameters per token.
                This enables DeepSeek to price output and reasoning tokens at <strong>$2.19/1M</strong> vs OpenAI o1's{" "}
                <strong>$60.00/1M</strong> (a ~27x price reduction on reasoning tokens).
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
                {copied ? "Copied" : "Copy Comparison Spec"}
              </button>
              <button
                type="button"
                onClick={() =>
                  downloadCSV("deepseek-r1-vs-openai-o1.csv", [
                    {
                      Metric: "Monthly Cost ($)",
                      "DeepSeek R1": r1Cost.monthlyCost.toFixed(2),
                      "OpenAI o1": o1Cost.monthlyCost.toFixed(2),
                    },
                    {
                      Metric: "Cost Per 1,000 Reqs ($)",
                      "DeepSeek R1": r1Cost.costPer1k.toFixed(3),
                      "OpenAI o1": o1Cost.costPer1k.toFixed(3),
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
