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

      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
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
