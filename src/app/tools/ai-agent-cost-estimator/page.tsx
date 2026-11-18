import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import AIAgentCostCalculator from "@/components/tools/AIAgentCostCalculator";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "AI Agent Cost Estimator — Multi-Turn Tool Call Loop Calculator",
  "Simulate multi-turn autonomous agent loops, context window compounding, and worst-case runaway costs. Free FinOps tool.",
  "ai-agent-cost-estimator"
);

const faqs = [
  {
    question: "Why do AI agent loops cost so much more than normal LLM calls?",
    answer:
      "Unlike single prompt-response calls, autonomous agents maintain state. Every tool invocation (bash, search, file read) appends its results into the context window, causing input tokens to grow quadratically with every step.",
  },
  {
    question: "What is runaway agent spend?",
    answer:
      "When an agent enters an infinite retry loop or hallucinates repetitive tool calls without making progress, it continues compounding context until it hits either max tokens or an API budget limit, racking up unexpected bills.",
  },
  {
    question: "How can you mitigate agent loop costs?",
    answer:
      "Enforce hard max-iteration caps (e.g., 8-10 turns max), prune historical tool responses after 2 steps, and route simple intermediate sub-tasks to faster, cheaper models like Gemini 2.5 Flash.",
  },
];

export default function AIAgentCostPage() {
  const structuredData = generateStructuredData(
    "AI Agent Cost Estimator",
    "Simulate context window growth and compounding expenses in autonomous AI agent loops.",
    "ai-agent-cost-estimator",
    faqs
  );

  return (
    <ToolShell
      title="AI Agent Cost Estimator"
      description="Simulate multi-turn autonomous agent loops, tool-call context compounding, and forecast monthly production expenses."
      category="AI & LLM"
      categoryHref="/#ai-calculators"
      badge="Multi-Turn Loop Simulator"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredData}
      />

      <AIAgentCostCalculator />

      {/* Authoritative Technical Guide & Princeton GEO Benchmark Table */}
      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
        {/* Static HTML Table for Zero-JS AI Bot Extraction */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Autonomous Agent Multi-Turn Compounding Benchmark (2026)
              </h3>
              <p className="text-xs text-slate-500">
                Mathematical modeling of cumulative tokens per run across common agent architectures.
              </p>
            </div>
            <span className="mt-2 sm:mt-0 inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 self-start sm:self-auto">
              ✓ Verified March 2026
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-300 text-slate-800 font-semibold">
                  <th className="py-2 pr-3">Agent Archetype</th>
                  <th className="py-2 px-3">Base System Prompt</th>
                  <th className="py-2 px-3">Avg Loop Steps</th>
                  <th className="py-2 px-3">Tool Output / Step</th>
                  <th className="py-2 px-3">Total Tokens Incurred</th>
                  <th className="py-2 pl-3">Est. Cost / 1k Runs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">Light Support Bot (GPT-4o mini)</td>
                  <td className="py-2.5 px-3">1,500 tokens</td>
                  <td className="py-2.5 px-3">4 turns</td>
                  <td className="py-2.5 px-3">400 tokens</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">8,400 tokens</td>
                  <td className="py-2.5 pl-3 font-semibold text-emerald-700">$1.68</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">ReAct Coding Assistant (Claude 3.7 Sonnet)</td>
                  <td className="py-2.5 px-3">2,500 tokens</td>
                  <td className="py-2.5 px-3">8 turns</td>
                  <td className="py-2.5 px-3">800 tokens</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">42,400 tokens</td>
                  <td className="py-2.5 pl-3 font-semibold text-emerald-700">$139.20</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">Deep Autonomous Researcher (GPT-4o)</td>
                  <td className="py-2.5 px-3">8,000 tokens</td>
                  <td className="py-2.5 px-3">15 turns</td>
                  <td className="py-2.5 px-3">1,200 tokens</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">246,000 tokens</td>
                  <td className="py-2.5 pl-3 font-semibold text-emerald-700">$639.60</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            The Quadratic Trap of Autonomous Agent Context Windows
          </h2>
          <p>
            Autonomous AI agents—systems that execute loops of Thought, Action,
            and Observation—are fundamentally different from standard chatbots.
            In a multi-turn agent workflow, each tool result (such as a database
            query, bash output, or file diff) is appended to the conversation
            history.
          </p>
          <p className="mt-3">
            If step 1 has 2,000 tokens and adds 800 tokens of tool output, step 2
            sends 2,800 tokens. By step 8, the model is re-reading over 7,000
            tokens on every inference pass. Over thousands of runs per month,
            this non-linear compounding can multiply API expenditure by 5× to 10×
            compared to naive single-call estimations.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-slate-50 border border-slate-200/80 rounded-xl p-4"
              >
                <h4 className="font-semibold text-slate-900 text-sm mb-1.5">
                  {faq.question}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </ToolShell>
  );
}
