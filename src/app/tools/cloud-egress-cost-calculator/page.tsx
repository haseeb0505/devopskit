import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import CloudEgressCalculator from "@/components/tools/CloudEgressCalculator";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "Cloud Egress Cost Calculator — AWS, GCP, Azure Bandwidth & CDN Savings",
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

      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
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
    </ToolShell>
  );
}
