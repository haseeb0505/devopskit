import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import DeepSeekR1VsOpenAiO1Calculator from "@/components/tools/DeepSeekR1VsOpenAiO1Calculator";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "DeepSeek R1 vs OpenAI o1 Reasoning Cost Calculator",
  "Calculate cost differences between DeepSeek R1 and OpenAI o1 reasoning models factoring in input tokens, internal thinking tokens, and daily volume.",
  "deepseek-r1-vs-openai-o1-cost"
);

const faqs = [
  {
    question: "Why is DeepSeek R1 so much cheaper than OpenAI o1?",
    answer:
      "DeepSeek R1 uses a 671B Mixture-of-Experts (MoE) architecture where only 37B parameters are activated for any single token, lowering hardware compute demands. OpenAI o1 uses dense frontier weights with higher compute overhead, resulting in $60.00/1M output tokens vs DeepSeek's $2.19/1M.",
  },
  {
    question: "Do OpenAI and DeepSeek bill for internal reasoning tokens?",
    answer:
      "Yes. Both providers generate hidden 'thinking' or reasoning tokens before producing the final visible output. You are billed for visible output tokens plus internal reasoning tokens at the standard output rate.",
  },
];

export default function DeepSeekVsOpenAiPage() {
  const structuredData = generateStructuredData(
    "DeepSeek R1 vs OpenAI o1 Cost Calculator",
    "Compare DeepSeek R1 and OpenAI o1 pricing on reasoning tokens, output length, and monthly cost differences.",
    "deepseek-r1-vs-openai-o1-cost",
    faqs
  );

  return (
    <ToolShell
      title="DeepSeek R1 vs OpenAI o1 Reasoning Cost Calculator"
      description="Compare reasoning token expenses side-by-side between DeepSeek R1 and OpenAI o1. Model visible outputs, internal thinking tokens, and identify the exact enterprise cost savings."
      category="AI & LLM"
      categoryHref="/#ai-calculators"
      badge="Reasoning Models 2026"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredData}
      />

      <DeepSeekR1VsOpenAiO1Calculator />

      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Reasoning Token Economics: The Hidden Cost of "Thinking"
          </h2>
          <p className="mb-4">
            Reasoning models like OpenAI o1 and DeepSeek R1 don't just output answers; they engage in internal chain-of-thought
            deliberation before returning the first token. In complex coding, mathematical reasoning, and data analysis tasks,
            internal reasoning tokens frequently outnumber the final user-facing response by a factor of 3x to 5x.
          </p>
        </div>
      </article>
    </ToolShell>
  );
}
