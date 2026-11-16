import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import JsonPayloadSizeCalculator from "@/components/tools/JsonPayloadSizeCalculator";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "JSON Payload Size Calculator — Raw Bytes, Minified, Gzip & LLM Tokens",
  "Measure raw bytes, minified footprint, estimated Gzip compression, and approximate LLM token count for any JSON. Free developer tool.",
  "json-payload-size-calculator"
);

const faqs = [
  {
    question: "How much bandwidth does minifying JSON save?",
    answer:
      "Minifying formatted JSON typically removes 20% to 40% of the raw byte size by stripping newline characters and indentation spaces.",
  },
  {
    question: "How are LLM tokens estimated from JSON payloads?",
    answer:
      "Structured JSON typically averages 3.5 to 4 characters per token because punctuation symbols (braces, quotes, colons) often tokenize as distinct individual tokens in BPE (Byte-Pair Encoding) tokenizers.",
  },
  {
    question: "How effective is Gzip compression on JSON responses?",
    answer:
      "Because JSON payloads contain repetitive key names and predictable syntax structures, Gzip compression typically achieves 65% to 80% size reductions over the wire.",
  },
];

export default function JsonPayloadSizePage() {
  const structuredData = generateStructuredData(
    "JSON Payload Size Calculator",
    "Calculate JSON byte weight, minification savings, and token impact.",
    "json-payload-size-calculator",
    faqs
  );

  return (
    <ToolShell
      title="JSON Payload Size Calculator"
      description="Calculate raw byte weight, minified size, estimated Gzip wire transfer, and approximate LLM token consumption for API payloads."
      category="Developer Utilities"
      categoryHref="/#developer-utilities"
      badge="Compression & Tokens"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredData}
      />

      <JsonPayloadSizeCalculator />

      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Payload Weight in Microservices and AI Function Calling
          </h2>
          <p>
            In distributed microservice architectures and modern AI agent tool
            calling, JSON is the default serialization protocol. However,
            transmitting verbose JSON objects across network boundaries incurs
            both bandwidth egress costs and substantial token consumption when
            passed into foundation model context windows.
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
                className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs"
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
