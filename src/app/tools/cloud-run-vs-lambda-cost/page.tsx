import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import CloudRunVsLambdaCalculator from "@/components/tools/CloudRunVsLambdaCalculator";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "Cloud Run vs AWS Lambda Pricing Calculator — Compare Serverless Costs",
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

      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
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
    </ToolShell>
  );
}
