import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import PromptCachingCalculator from "@/components/tools/PromptCachingCalculator";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "Prompt Caching Cost Calculator — Calculate LLM Cache Savings & ROI",
  "Determine exact dollar savings and break-even hit rate when utilizing prompt caching on OpenAI, Anthropic, and Gemini. Free FinOps tool.",
  "prompt-caching-calculator"
);

const faqs = [
  {
    question: "How does prompt caching save money?",
    answer:
      "When you send repetitive prompt prefixes (like system instructions or documents), providers keep the parsed KV cache in GPU memory. Re-queries that match the exact prefix avoid recomputation and are billed at a 50% to 90% discount.",
  },
  {
    question: "What minimum token count is required for prompt caching?",
    answer:
      "Anthropic requires at least 1,024 tokens for Claude 3.5/3.7 to trigger prompt caching. OpenAI automatically caches prompts over 1,024 tokens in 128-token increments.",
  },
  {
    question: "What happens if a single character in the prefix changes?",
    answer:
      "Prompt caching relies on exact sequential prefix matching. If you alter a single character near the beginning of the prompt (such as injecting dynamic timestamps or user IDs at the top), the entire subsequent cache is invalidated.",
  },
];

export default function PromptCachingPage() {
  const structuredData = generateStructuredData(
    "Prompt Caching Cost Calculator",
    "Calculate prompt caching savings and return on investment for foundation model architectures.",
    "prompt-caching-calculator",
    faqs
  );

  return (
    <ToolShell
      title="Prompt Caching Cost Calculator"
      description="Evaluate financial savings from prompt caching across OpenAI, Anthropic, and Google Gemini. Model cache hit rate, token volume, and net monthly ROI."
      category="AI & LLM"
      categoryHref="/#ai-calculators"
      badge="Cache ROI Engine"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredData}
      />

      <PromptCachingCalculator />

      {/* Authoritative Technical Guide */}
      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            The Mechanics of LLM Prompt Caching
          </h2>
          <p>
            In traditional transformer inference, every token in a request
            requires computing Key-Value (KV) attention matrices across all
            previous tokens. When applications send large system instructions,
            API schemas, or reference documents on every turn, the LLM cluster is
            forced to re-compute identical attention weights repeatedly.
          </p>
          <p className="mt-3">
            Prompt caching allows foundation model providers to store the
            pre-computed KV cache directly in high-bandwidth GPU memory (HBM).
            When a new API call begins with the exact same prefix tokens, the
            inference engine resumes execution from the cached state, bypassing
            quadratic attention computation and slashing latency by up to 80%.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            Architectural Rules for Maximizing Cache Hit Rates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
              <h4 className="font-semibold text-slate-900 text-base mb-1">
                Static Prefix Ordering
              </h4>
              <p className="text-xs text-slate-600">
                Always place completely static content (system instructions,
                tool schemas, few-shot examples) at the top of the context
                window. Dynamic values (current timestamp, user question) must
                always be placed at the very end.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
              <h4 className="font-semibold text-slate-900 text-base mb-1">
                Mind the Minimum Thresholds
              </h4>
              <p className="text-xs text-slate-600">
                Most providers do not cache short prompts. OpenAI and Anthropic
                both require a minimum of 1,024 prefix tokens. If your system
                prompt is only 400 tokens, you will pay full price unless you
                combine it with reference context.
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
