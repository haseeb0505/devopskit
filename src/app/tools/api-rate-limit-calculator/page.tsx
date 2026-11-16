import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import ApiRateLimitCalculator from "@/components/tools/ApiRateLimitCalculator";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "API Rate Limit & Burst Calculator — Token Bucket & Concurrency Sizer",
  "Calculate token bucket capacities, refill rates, and retry backoff headroom from target RPS and P95 latencies. Free developer tool.",
  "api-rate-limit-calculator"
);

const faqs = [
  {
    question: "How does the token bucket algorithm work?",
    answer:
      "A token bucket holds up to a maximum capacity of tokens and refills at a steady rate per second. Each API request consumes one token. If the bucket is empty, incoming requests are rejected with HTTP 429 Too Many Requests.",
  },
  {
    question: "How do you calculate concurrent connections from RPS and latency?",
    answer:
      "Using Little's Law: Concurrent Connections = Throughput (RPS) × Average Latency (seconds). For example, 500 RPS with a 200ms latency requires 100 concurrent open connections.",
  },
  {
    question: "Why should clients implement exponential backoff with jitter?",
    answer:
      "When hundreds of clients retry immediately upon receiving a 429 status code at the same fixed interval, they create a 'thundering herd' that repeatedly knocks over the upstream service. Adding randomized jitter spreads out retry attempts smoothly.",
  },
];

export default function ApiRateLimitPage() {
  const structuredData = generateStructuredData(
    "API Rate Limit & Burst Calculator",
    "Calculate token bucket capacity, refill rates, and connection concurrency.",
    "api-rate-limit-calculator",
    faqs
  );

  return (
    <ToolShell
      title="API Rate Limit & Burst Calculator"
      description="Size token-bucket rate limiters (Redis, Envoy, Kong, Cloudflare) and estimate required socket concurrency using Little's Law."
      category="Developer Utilities"
      categoryHref="/#developer-utilities"
      badge="Token-Bucket Sizer"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredData}
      />

      <ApiRateLimitCalculator />

      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Token-Bucket Algorithms &amp; Little&apos;s Law Concurrency
          </h2>
          <p>
            Rate limiting is the first line of defense for protecting backend
            microservices and database pools from cascading failures and traffic
            surges. The Token Bucket algorithm is the industry standard (employed
            by Redis, Envoy, NGINX, and Cloudflare) because it naturally permits
            controlled traffic bursts while strictly enforcing sustained throughput
            ceilings.
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
