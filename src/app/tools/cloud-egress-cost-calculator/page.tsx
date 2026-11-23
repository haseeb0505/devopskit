import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import CloudEgressCalculator from "@/components/tools/CloudEgressCalculator";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "Cloud Egress Cost Calculator — AWS, GCP & Azure",
  "Model standard internet egress across AWS, GCP, and Azure vs. Cloudflare CDN and zero-egress R2 storage. Free FinOps tool.",
  "cloud-egress-cost-calculator"
);

const faqs = [
  {
    question: "What is cloud egress bandwidth?",
    answer:
      "Cloud egress refers to data transferred out of a cloud provider's network (e.g. AWS S3 or EC2 to the public internet). Hyperscalers typically charge $0.08 to $0.12 per GB for internet egress.",
  },
  {
    question: "How does a CDN reduce cloud egress costs?",
    answer:
      "A Content Delivery Network caches static assets at edge servers globally. When a user requests an asset, it is served from the CDN cache (at lower rates or via Bandwidth Alliance discounts) rather than pulling data from the expensive cloud origin.",
  },
  {
    question: "What is Cloudflare R2 zero-egress storage?",
    answer:
      "Cloudflare R2 is an S3-compatible object storage service that charges zero egress fees regardless of how many gigabytes are downloaded, eliminating data transfer penalties entirely.",
  },
];

export default function CloudEgressPage() {
  const structuredData = generateStructuredData(
    "Cloud Egress Cost Calculator",
    "Model cloud bandwidth egress bills and evaluate CDN cache-hit cost reductions.",
    "cloud-egress-cost-calculator",
    faqs
  );

  return (
    <ToolShell
      title="Cloud Egress & Bandwidth Cost Calculator"
      description="Calculate data transfer bills across AWS, Google Cloud, and Microsoft Azure. Model CDN cache hit rates and zero-egress object storage alternatives."
      category="Cloud FinOps"
      categoryHref="/#cloud-finops"
      badge="CDN Arbitrage"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredData}
      />

      <CloudEgressCalculator />

      {/* Authoritative Technical Guide & Princeton GEO Benchmark Table */}
      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
        {/* Static HTML Table for Zero-JS AI Bot Extraction (PerplexityBot / GPTBot / ClaudeBot) */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Cloud Egress & Data Transfer Benchmark Matrix (2026)
              </h3>
              <p className="text-xs text-slate-500">
                Data verified against official pricing documentation from AWS S3, Google Cloud, Microsoft Azure, and Cloudflare R2.
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
                  <th className="py-2 pr-3">Storage Provider</th>
                  <th className="py-2 px-3">Direct Internet Egress</th>
                  <th className="py-2 px-3">Origin to CDN Egress</th>
                  <th className="py-2 px-3">CDN Egress Rate</th>
                  <th className="py-2 px-3">Free Egress Tier</th>
                  <th className="py-2 pl-3">Official Docs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">AWS S3 / EC2</td>
                  <td className="py-2.5 px-3 font-mono text-amber-900 font-semibold">$0.090 / GB</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-700 font-semibold">$0.000 / GB (CloudFront)</td>
                  <td className="py-2.5 px-3 font-mono">$0.085 / GB</td>
                  <td className="py-2.5 px-3">100 GB / month free</td>
                  <td className="py-2.5 pl-3">
                    <a
                      href="https://aws.amazon.com/s3/pricing/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      AWS S3 Docs ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">Google Cloud Storage</td>
                  <td className="py-2.5 px-3 font-mono text-amber-900 font-semibold">$0.120 / GB</td>
                  <td className="py-2.5 px-3 font-mono text-blue-700 font-semibold">$0.080 / GB (Cloud CDN)</td>
                  <td className="py-2.5 px-3 font-mono">$0.080 / GB</td>
                  <td className="py-2.5 px-3">100 GB / month (Americas/EU)</td>
                  <td className="py-2.5 pl-3">
                    <a
                      href="https://cloud.google.com/storage/pricing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      GCP Storage Docs ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">Microsoft Azure Blob</td>
                  <td className="py-2.5 px-3 font-mono text-amber-900 font-semibold">$0.087 / GB</td>
                  <td className="py-2.5 px-3 font-mono text-indigo-700 font-semibold">$0.081 / GB (Azure CDN)</td>
                  <td className="py-2.5 px-3 font-mono">$0.081 / GB</td>
                  <td className="py-2.5 px-3">100 GB / month free</td>
                  <td className="py-2.5 pl-3">
                    <a
                      href="https://azure.microsoft.com/en-us/pricing/details/bandwidth/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Azure Bandwidth Docs ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">Cloudflare R2</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-700 font-bold">$0.000 / GB (Zero Egress)</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-700 font-bold">$0.000 / GB</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-700 font-bold">$0.000 / GB</td>
                  <td className="py-2.5 px-3 text-emerald-700 font-semibold">Unlimited Free Egress</td>
                  <td className="py-2.5 pl-3">
                    <a
                      href="https://www.cloudflare.com/developer-platform/r2/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Cloudflare R2 Docs ↗
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Demystifying Cloud Egress Fees
          </h2>
          <p>
            In cloud computing economics, bandwidth entering a cloud provider
            (ingress) is almost universally free, while data leaving the cloud
            (egress) is heavily monetized. Hyperscalers charge anywhere from
            $0.08 to $0.12 per gigabyte for standard internet data transfer,
            creating severe financial friction for media delivery, API responses,
            and database replication.
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
          <h2 className="font-bold text-xl mb-4">Cloud Egress Cost Calculator – How It Works & Real‑World Usage</h2>
          <p>This interactive calculator estimates <strong>Cloud Egress Cost Calculator</strong> based on the official pricing tables of the major cloud providers and LLM vendors. All rates are pulled from the public pricing pages and are frozen at the time of the last repository sync (March 2026).</p>
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
