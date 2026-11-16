import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import LLMCostCalculator from "@/components/tools/LLMCostCalculator";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "LLM API Cost Calculator — Compare OpenAI, Gemini & Anthropic Rates",
  "Calculate and compare daily, monthly, and annual token costs across GPT-4o, Gemini 2.5 Flash, and Claude 3.7. Free client-side calculator with prompt caching.",
  "llm-api-cost-calculator"
);

const faqs = [
  {
    question: "How is LLM API pricing calculated?",
    answer:
      "LLM APIs bill based on tokens processed. Total cost equals (Uncached Input Tokens / 1,000,000 * Input Rate) + (Cached Input Tokens / 1,000,000 * Cached Rate) + (Output Tokens / 1,000,000 * Output Rate).",
  },
  {
    question: "What is prompt caching discount?",
    answer:
      "Major providers like OpenAI and Anthropic offer 50% to 90% discounts on prompt tokens that are reused across repeated calls within a short time window (typically 5 to 60 minutes).",
  },
  {
    question: "Why do reasoning models like o1 or o3-mini cost more?",
    answer:
      "Reasoning models generate internal hidden reasoning tokens before outputting their final response. You are billed for both visible output tokens and internal thinking tokens at the output rate.",
  },
];

export default function LLMCostPage() {
  const structuredData = generateStructuredData(
    "LLM API Cost Calculator",
    "Calculate and compare daily and monthly token pricing across major LLM providers.",
    "llm-api-cost-calculator",
    faqs
  );

  return (
    <ToolShell
      title="LLM API Cost Calculator"
      description="Estimate daily, monthly, and annual token expenses across OpenAI, Google Gemini, and Anthropic. Adjust input volume, output length, cached context, and request frequency."
      category="AI & LLM"
      categoryHref="/#ai-calculators"
      badge="Multi-Model 2026"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredData}
      />

      <LLMCostCalculator />

      {/* 800+ Word Authoritative Technical Guide */}
      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Understanding LLM API Pricing Dynamics in 2026
          </h2>
          <p>
            As generative AI transitions from experimental prototypes to
            production architectures, API token consumption frequently emerges
            as the single largest line item on cloud bills. While initial testing
            at a few hundred requests per day might appear trivial, scaling an
            AI-driven SaaS product to hundreds of thousands of daily interactions
            can quickly escalate costs from a few dollars to tens of thousands of
            dollars per month.
          </p>
          <p className="mt-3">
            Modern foundation models are billed on a granular, per-token basis,
            typically quoted per million (1M) tokens. However, calculating the
            effective monthly expense requires factoring in distinct pricing tiers
            for standard input tokens, cached prompt tokens, output completion
            tokens, and invisible internal reasoning steps.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            The Fundamental Token Economics Formula
          </h3>
          <p>
            Every LLM API call evaluates an input context window and generates an
            output completion. The exact pricing formula implemented in this
            calculator reflects real billing engine calculations:
          </p>
          <div className="my-4 p-4 rounded-xl bg-slate-900 text-sky-300 font-mono text-xs overflow-x-auto">
            Total Cost = [(Uncached Input / 1,000,000) × Input Rate] +
            [(Cached Input / 1,000,000) × Cached Rate] + [(Output / 1,000,000) ×
            Output Rate]
          </div>
          <p>
            Notice that output tokens are systematically priced 3× to 5× higher
            than input tokens across virtually every provider. This asymmetry
            occurs because input tokens can be processed in parallel across modern
            GPU tensor cores (such as NVIDIA H100s or Google TPUs), whereas
            output tokens must be generated auto-regressively, one token at a
            time, requiring a distinct forward inference pass for each generated
            word fragment.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            Top 4 Cost Traps in Production LLM Architectures
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
              <h4 className="font-semibold text-slate-900 text-base mb-1">
                1. System Prompt Bloat
              </h4>
              <p className="text-xs text-slate-600">
                Large system instructions, zero-shot few-shot examples, and
                excessive schema definitions are re-sent on every single turn.
                Without prompt caching, a 4,000-token system prompt repeated 10,000
                times per day consumes 40 million input tokens daily.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
              <h4 className="font-semibold text-slate-900 text-base mb-1">
                2. Verbose Output Generation
              </h4>
              <p className="text-xs text-slate-600">
                Because output tokens cost dramatically more than inputs,
                allowing models to generate verbose preambles (&quot;Sure! Here is the
                answer to your question...&quot;) inflates bills by 20% to 35% with
                zero incremental user value.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
              <h4 className="font-semibold text-slate-900 text-base mb-1">
                3. Over-Engineering with Reasoning Models
              </h4>
              <p className="text-xs text-slate-600">
                Deploying models like OpenAI o1 or o3-mini for simple extraction,
                classification, or translation tasks is a massive FinOps blunder.
                Reasoning tokens count as billable output tokens and can multiply
                the cost of a simple query by 10× to 30×.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
              <h4 className="font-semibold text-slate-900 text-base mb-1">
                4. Unbounded Multi-Turn History
              </h4>
              <p className="text-xs text-slate-600">
                Failing to prune or summarize conversation histories causes the
                input context to grow quadratically with each user exchange. By turn
                10, users are paying for the accumulated context of all previous 9
                turns.
              </p>
            </div>
          </div>
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
