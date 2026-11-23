import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import Gpt4oVsClaudeSonnetCalculator from "@/components/tools/Gpt4oVsClaudeSonnetCalculator";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "GPT-4o vs Claude 3.7 Sonnet API Cost Calculator",
  "Compare GPT-4o vs Claude 3.7 Sonnet API costs side-by-side factoring in input tokens, output rates, and Anthropic's 90% prompt caching discount.",
  "gpt-4o-vs-claude-3-7-sonnet-cost"
);

const faqs = [
  {
    question: "Is GPT-4o cheaper than Claude 3.7 Sonnet?",
    answer:
      "For standard short-context queries, GPT-4o is generally cheaper ($2.50/1M input and $10.00/1M output vs Claude's $3.00/1M input and $15.00/1M output). However, for high-context applications (like large system prompts or agent loops), Anthropic's 90% prompt caching discount ($0.30/1M) can make Claude 3.7 more cost-effective than GPT-4o ($1.25/1M cached).",
  },
  {
    question: "How does prompt caching differ between OpenAI and Anthropic?",
    answer:
      "OpenAI automatically applies a 50% discount to prompt tokens cached beyond 1,024 tokens without explicit headers. Anthropic requires setting explicit cache control breakpoints in the API request, but rewards you with a massive 90% discount on cached reads.",
  },
];

export default function Gpt4oVsClaudePage() {
  const structuredData = generateStructuredData(
    "GPT-4o vs Claude 3.7 Sonnet Cost Calculator",
    "Compare OpenAI GPT-4o and Anthropic Claude 3.7 Sonnet API prices across context windows, output volume, and prompt caching discounts.",
    "gpt-4o-vs-claude-3-7-sonnet-cost",
    faqs
  );

  return (
    <ToolShell
      title="GPT-4o vs Claude 3.7 Sonnet Cost Calculator"
      description="Compare API token expenses side-by-side between OpenAI's GPT-4o and Anthropic's Claude 3.7 Sonnet. Model input volume, output length, and evaluate the 90% caching discount crossover point."
      category="AI & LLM"
      categoryHref="/#ai-calculators"
      badge="Model Comparison 2026"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredData}
      />

      <Gpt4oVsClaudeSonnetCalculator />

      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Architectural Trade-offs: GPT-4o vs Claude 3.7 Sonnet
          </h2>
          <p className="mb-4">
            When choosing between flagship models for production architectures, raw token price is only half the equation.
            Anthropic's pricing model is heavily biased toward caching: if your application has long, stable context
            (e.g., codebase repositories, API documentation, or complex agent instructions), the 90% cache discount drastically
            reduces blended input cost to $0.30 per million tokens.
          </p>
        </div>
      </article>
    </ToolShell>
  );
}
