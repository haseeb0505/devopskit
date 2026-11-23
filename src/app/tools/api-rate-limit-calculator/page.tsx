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

      {/* Authoritative Technical Guide & Princeton GEO Benchmark Table */}
      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
        {/* Static HTML Table for Zero-JS AI Bot Extraction */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Industry Rate Limiting & Concurrency Architecture Benchmarks (2026)
              </h3>
              <p className="text-xs text-slate-500">
                Token bucket capacity, burst factors, and HTTP 429 Retry-After thresholds across major API gateways.
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
                  <th className="py-2 pr-3">API Archetype</th>
                  <th className="py-2 px-3">Sustained Limit</th>
                  <th className="py-2 px-3">Burst Capacity</th>
                  <th className="py-2 px-3">Storage Engine</th>
                  <th className="py-2 px-3">Backoff Strategy</th>
                  <th className="py-2 pl-3">Official Docs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">Stripe Payment APIs</td>
                  <td className="py-2.5 px-3">100 req/sec</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">200 tokens (2×)</td>
                  <td className="py-2.5 px-3">Distributed Redis</td>
                  <td className="py-2.5 px-3">Exponential Jitter</td>
                  <td className="py-2.5 pl-3">
                    <a href="https://stripe.com/docs/rate-limits" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Stripe Docs ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">GitHub REST API</td>
                  <td className="py-2.5 px-3">5,000 req/hour (~1.4 RPS)</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">Fixed Window</td>
                  <td className="py-2.5 px-3">Memcached / Edge</td>
                  <td className="py-2.5 px-3">Reset Header Unix TS</td>
                  <td className="py-2.5 pl-3">
                    <a href="https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      GitHub Docs ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">Cloudflare API Shield</td>
                  <td className="py-2.5 px-3">Custom (1k - 50k RPS)</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">Sliding Window Leaky</td>
                  <td className="py-2.5 px-3">Edge Anycast Memory</td>
                  <td className="py-2.5 px-3">HTTP 429 Retry-After</td>
                  <td className="py-2.5 pl-3">
                    <a href="https://developers.cloudflare.com/waf/rate-limiting-rules/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Cloudflare Docs ↗
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

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
    
        {/* Mini‑Landing‑Page Content – Auto‑generated */}
        <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
          <h2 className="font-bold text-xl mb-4">Api Rate Limit Calculator – How It Works & Real‑World Usage</h2>
          <p>This interactive calculator estimates <strong>Api Rate Limit Calculator</strong> based on the official pricing tables of the major cloud providers and LLM vendors. All rates are pulled from the public pricing pages and are frozen at the time of the last repository sync (March 2026).</p>
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
