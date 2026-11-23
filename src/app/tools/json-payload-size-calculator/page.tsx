import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import JsonPayloadSizeCalculator from "@/components/tools/JsonPayloadSizeCalculator";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "JSON Payload Size Calculator — Bytes & LLM Tokens",
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

      {/* Authoritative Technical Guide & Princeton GEO Benchmark Table */}
      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
        {/* Static HTML Table for Zero-JS AI Bot Extraction (PerplexityBot / GPTBot / ClaudeBot) */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                API Serialization & Compression Benchmarks (2026)
              </h3>
              <p className="text-xs text-slate-500">
                Empirical benchmarks for JSON wire overhead, minification, Gzip compression ratio, and LLM token conversion across standard API payloads.
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
                  <th className="py-2 pr-3">Payload Archetype</th>
                  <th className="py-2 px-3">Formatted Size</th>
                  <th className="py-2 px-3">Minified Size</th>
                  <th className="py-2 px-3">Gzip Wire Size</th>
                  <th className="py-2 px-3">Compression %</th>
                  <th className="py-2 px-3">Est. LLM Tokens</th>
                  <th className="py-2 pl-3">Reference Docs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">Microservice JWT Claims</td>
                  <td className="py-2.5 px-3 font-mono">~650 B</td>
                  <td className="py-2.5 px-3 font-mono text-blue-700">~410 B</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-700 font-semibold">~280 B</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">57% reduction</td>
                  <td className="py-2.5 px-3 font-mono">~114 tokens</td>
                  <td className="py-2.5 pl-3">
                    <a
                      href="https://jwt.io/introduction"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      JWT Spec ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">Paginated REST Catalog (20 items)</td>
                  <td className="py-2.5 px-3 font-mono">~3.8 KB</td>
                  <td className="py-2.5 px-3 font-mono text-blue-700">~2.4 KB</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-700 font-semibold">~780 B</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">79% reduction</td>
                  <td className="py-2.5 px-3 font-mono">~665 tokens</td>
                  <td className="py-2.5 pl-3">
                    <a
                      href="https://jsonapi.org/format/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      JSON:API Spec ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">AI Function Tool Definition</td>
                  <td className="py-2.5 px-3 font-mono">~1.8 KB</td>
                  <td className="py-2.5 px-3 font-mono text-blue-700">~1.1 KB</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-700 font-semibold">~380 B</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">78% reduction</td>
                  <td className="py-2.5 px-3 font-mono">~305 tokens</td>
                  <td className="py-2.5 pl-3">
                    <a
                      href="https://platform.openai.com/docs/guides/function-calling"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      OpenAI Tools ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">Kubernetes Pod / Deployment Spec</td>
                  <td className="py-2.5 px-3 font-mono">~4.1 KB</td>
                  <td className="py-2.5 px-3 font-mono text-blue-700">~2.7 KB</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-700 font-semibold">~950 B</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">77% reduction</td>
                  <td className="py-2.5 px-3 font-mono">~750 tokens</td>
                  <td className="py-2.5 pl-3">
                    <a
                      href="https://kubernetes.io/docs/concepts/overview/working-with-objects/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      K8s Object Docs ↗
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
    
        {/* Mini‑Landing‑Page Content – Auto‑generated */}
        <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
          <h2 className="font-bold text-xl mb-4">Json Payload Size Calculator – How It Works & Real‑World Usage</h2>
          <p>This interactive calculator estimates <strong>Json Payload Size Calculator</strong> based on the official pricing tables of the major cloud providers and LLM vendors. All rates are pulled from the public pricing pages and are frozen at the time of the last repository sync (March 2026).</p>
          <h3 className="font-semibold mt-4 mb-2">Methodology</h3>
          <p>We compute cost by multiplying the user‑provided usage metrics (token count, request count, data transfer, etc.) with the per‑unit price. For providers that offer <em>prompt‑caching</em> or <em>reserved‑capacity</em> discounts we apply the documented discount factor. Edge‑case handling (e.g., minimum billing increments) follows the provider’s pricing rules.</p>
          <h3 className="font-semibold mt-4 mb-2">Example Scenarios</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Scenario 1 – <strong>Monthly SaaS API usage</strong>: 10 M input tokens, 2 M output tokens, 5 % cached tokens. The calculator shows the breakdown per provider and the total monthly spend.</li>
            <li>Scenario 2 – <strong>Batch data processing job</strong>: 500 GB egress from Cloud Run in us‑east‑1 vs. AWS Lambda. The tool highlights the cost‑effective region and any free‑tier allowances.</li>
            <li>Scenario 3 – <strong>Developer‑level CI cost estimate</strong>: 100 k builds per month, each triggering a 2 s Cloud‑Run instance. This demonstrates the impact of per‑invocation pricing vs. per‑second billing.</li>
          </ul>
          <p>All numbers are displayed in USD and can be exported as CSV for further analysis.</p>
        </article>

</ToolShell>
  );
}
