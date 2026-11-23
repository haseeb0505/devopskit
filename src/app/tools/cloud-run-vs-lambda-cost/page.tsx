import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import CloudRunVsLambdaCalculator from "@/components/tools/CloudRunVsLambdaCalculator";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "Cloud Run vs AWS Lambda Pricing Cost Calculator",
  "Side-by-side serverless compute cost comparison factoring in concurrency, vCPU seconds, and official free tiers. Free FinOps tool.",
  "cloud-run-vs-lambda-cost"
);

const faqs = [
  {
    question: "Why is Cloud Run often cheaper for high-concurrency web apps?",
    answer:
      "Cloud Run allows a single container instance to process up to 1,000 concurrent requests simultaneously. AWS Lambda spins up a dedicated execution environment for each concurrent request, multiplying compute bills during traffic spikes.",
  },
  {
    question: "Do Cloud Run and AWS Lambda have free tiers?",
    answer:
      "Yes. Google Cloud Run provides 2 million free requests and 180,000 vCPU-seconds monthly. AWS Lambda provides 1 million free requests and 400,000 GB-seconds monthly.",
  },
  {
    question: "When is AWS Lambda more cost-effective?",
    answer:
      "AWS Lambda excels for intermittent, event-driven workloads (S3 triggers, SQS queues, cron tasks) where requests arrive sparsely and container startup overhead would be wasted.",
  },
];

export default function CloudRunVsLambdaPage() {
  const structuredData = generateStructuredData(
    "Cloud Run vs AWS Lambda Pricing Calculator",
    "Calculate and compare serverless hosting bills between Google Cloud Run and AWS Lambda.",
    "cloud-run-vs-lambda-cost",
    faqs
  );

  return (
    <ToolShell
      title="Cloud Run vs AWS Lambda Pricing Calculator"
      description="Compare serverless compute costs side-by-side. Model request volume, execution latency, memory sizing, and concurrency factors."
      category="Cloud FinOps"
      categoryHref="/#cloud-finops"
      badge="Free-Tier Factored"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredData}
      />

      <CloudRunVsLambdaCalculator />

      {/* Authoritative Technical Guide & Princeton GEO Benchmark Table */}
      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
        {/* Static HTML Table for Zero-JS AI Bot Extraction (PerplexityBot / GPTBot / ClaudeBot) */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Serverless Compute Pricing & Free Tier Rates (2026)
              </h3>
              <p className="text-xs text-slate-500">
                Official compute and memory rates for Google Cloud Run vs AWS Lambda (Tier 1 / us-east-1).
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
                  <th className="py-2 pr-3">Platform</th>
                  <th className="py-2 px-3">Compute Rate</th>
                  <th className="py-2 px-3">Memory Rate</th>
                  <th className="py-2 px-3">Requests / 1M</th>
                  <th className="py-2 px-3">Monthly Free Tier</th>
                  <th className="py-2 px-3">Concurrency Model</th>
                  <th className="py-2 pl-3">Official Docs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">Google Cloud Run (Tier 1)</td>
                  <td className="py-2.5 px-3 font-mono">$0.00002400 / vCPU-s</td>
                  <td className="py-2.5 px-3 font-mono">$0.00000250 / GiB-s</td>
                  <td className="py-2.5 px-3">$0.40</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-semibold">2M reqs, 180k vCPU-s, 360k GiB-s</td>
                  <td className="py-2.5 px-3">Multi-concurrency (up to 1,000 / instance)</td>
                  <td className="py-2.5 pl-3">
                    <a
                      href="https://cloud.google.com/run/pricing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Cloud Run Docs ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">AWS Lambda (x86_64)</td>
                  <td className="py-2.5 px-3 text-slate-500 italic">Bundled in GB-s</td>
                  <td className="py-2.5 px-3 font-mono">$0.0000166667 / GB-s</td>
                  <td className="py-2.5 px-3">$0.20</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-semibold">1M reqs, 400k GB-s</td>
                  <td className="py-2.5 px-3">Single-request (1 instance per concurrent req)</td>
                  <td className="py-2.5 pl-3">
                    <a
                      href="https://aws.amazon.com/lambda/pricing/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      AWS Lambda Docs ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">AWS Lambda (Arm / Graviton2)</td>
                  <td className="py-2.5 px-3 text-slate-500 italic">Bundled in GB-s</td>
                  <td className="py-2.5 px-3 font-mono">$0.0000133334 / GB-s</td>
                  <td className="py-2.5 px-3">$0.20</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-semibold">1M reqs, 400k GB-s</td>
                  <td className="py-2.5 px-3">Single-request (1 instance per concurrent req)</td>
                  <td className="py-2.5 pl-3">
                    <a
                      href="https://aws.amazon.com/lambda/pricing/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      AWS Lambda Docs ↗
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Serverless Concurrency Economics: Cloud Run vs AWS Lambda
          </h2>
          <p>
            When architecting serverless applications, choosing between Google
            Cloud Run and AWS Lambda has profound financial ramifications. While
            both abstract away server management and scale to zero, their
            underlying execution models differ fundamentally in how they handle
            concurrent traffic.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            The Concurrency Multiplier Advantage
          </h3>
          <p>
            In AWS Lambda, the execution concurrency model is strictly 1:1. If
            100 requests arrive within the same 200ms window, Lambda initializes
            and bills for 100 distinct execution instances.
          </p>
          <p className="mt-3">
            In contrast, Google Cloud Run allows developers to configure
            multi-request concurrency (up to 1,000 requests per container). If
            your application spends time awaiting database I/O or external API
            calls, a single 1-vCPU Cloud Run container can multiplex dozens of
            requests simultaneously, dramatically reducing billed instance-seconds.
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
          <h2 className="font-bold text-xl mb-4">Cloud Run Vs Lambda Cost – How It Works & Real‑World Usage</h2>
          <p>This interactive calculator estimates <strong>Cloud Run Vs Lambda Cost</strong> based on the official pricing tables of the major cloud providers and LLM vendors. All rates are pulled from the public pricing pages and are frozen at the time of the last repository sync (March 2026).</p>
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
