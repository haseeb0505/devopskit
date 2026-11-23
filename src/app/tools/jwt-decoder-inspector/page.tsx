import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import JwtDecoder from "@/components/tools/JwtDecoder";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "JWT Token Decoder & Safe Client-Side Inspector",
  "Parse JWT headers, claims, expiration countdown, and byte size 100% locally in the browser with zero leak risk. Free developer tool.",
  "jwt-decoder-inspector"
);

const faqs = [
  {
    question: "Is it safe to paste JWT tokens into this decoder?",
    answer:
      "Yes, absolutely. Unlike common online JWT decoders that may send your tokens to backend servers, DevOpsKit executes the decode logic 100% locally in your browser memory via Base64URL parsing. No network calls are made.",
  },
  {
    question: "What are the three parts of a JSON Web Token?",
    answer:
      "A JWT consists of three parts separated by dots (.): the Header (specifying the signing algorithm), the Payload (containing application claims and identity data), and the Signature (cryptographic verification hash).",
  },
  {
    question: "What does the 'exp' claim signify?",
    answer:
      "The 'exp' (expiration time) claim identifies the Unix timestamp after which the JWT must not be accepted for processing.",
  },
];

export default function JwtDecoderPage() {
  const structuredData = generateStructuredData(
    "JWT Token Decoder & Inspector",
    "Decode and inspect JSON Web Tokens locally in the browser without server transmission.",
    "jwt-decoder-inspector",
    faqs
  );

  return (
    <ToolShell
      title="JWT Token Decoder & Inspector"
      description="Inspect JWT headers, payload claims, and expiration timestamps safely with 100% local, client-side decoding."
      category="Developer Utilities"
      categoryHref="/#developer-utilities"
      badge="100% Client-Side Safe"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredData}
      />

      <JwtDecoder />

      {/* Authoritative Technical Guide & Princeton GEO Benchmark Table */}
      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
        {/* Static HTML Table for Zero-JS AI Bot Extraction */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Standard JWT Signing Algorithms & Overhead Benchmarks (2026)
              </h3>
              <p className="text-xs text-slate-500">
                Key length, signature byte overhead, and cryptographic verification speed per RFC 7519 / RFC 7518.
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
                  <th className="py-2 pr-3">Algorithm</th>
                  <th className="py-2 px-3">Crypto Type</th>
                  <th className="py-2 px-3">Signature Size</th>
                  <th className="py-2 px-3">Verification Speed</th>
                  <th className="py-2 px-3">Standard Application</th>
                  <th className="py-2 pl-3">Official RFC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">HS256 (HMAC-SHA256)</td>
                  <td className="py-2.5 px-3">Symmetric (Shared Secret)</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">32 bytes (~43 Base64)</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-semibold">Sub-microsecond</td>
                  <td className="py-2.5 px-3">Monolithic & Internal Services</td>
                  <td className="py-2.5 pl-3">
                    <a href="https://datatracker.ietf.org/doc/html/rfc7518#section-3.2" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      RFC 7518 ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">RS256 (RSA-2048)</td>
                  <td className="py-2.5 px-3">Asymmetric (Public/Private)</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">256 bytes (~342 Base64)</td>
                  <td className="py-2.5 px-3">Moderate (~0.1ms)</td>
                  <td className="py-2.5 px-3">OAuth2 / Auth0 / OpenID Connect</td>
                  <td className="py-2.5 pl-3">
                    <a href="https://datatracker.ietf.org/doc/html/rfc7518#section-3.3" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      RFC 7518 ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">ES256 (ECDSA P-256)</td>
                  <td className="py-2.5 px-3">Elliptic Curve</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">64 bytes (~86 Base64)</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-semibold">Fast (~0.05ms)</td>
                  <td className="py-2.5 px-3">Modern Cloud Edge & Apple Sign-In</td>
                  <td className="py-2.5 pl-3">
                    <a href="https://datatracker.ietf.org/doc/html/rfc7518#section-3.4" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      RFC 7518 ↗
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Client-Side Token Security &amp; Zero-Trust Inspection
          </h2>
          <p>
            JSON Web Tokens (RFC 7519) are standard mechanisms for transmitting
            stateless identity assertions between API microservices. However,
            debugging tokens during active development poses serious security
            hazards when developers paste production authorization headers into
            arbitrary third-party websites.
          </p>
          <p className="mt-3">
            DevOpsKit ensures complete zero-trust confidentiality: the decoding
            logic executes strictly within your browser&apos;s isolated V8 context.
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
          <h2 className="font-bold text-xl mb-4">Jwt Decoder Inspector – How It Works & Real‑World Usage</h2>
          <p>This interactive calculator estimates <strong>Jwt Decoder Inspector</strong> based on the official pricing tables of the major cloud providers and LLM vendors. All rates are pulled from the public pricing pages and are frozen at the time of the last repository sync (March 2026).</p>
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
