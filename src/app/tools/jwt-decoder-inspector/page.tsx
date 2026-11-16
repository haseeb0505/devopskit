import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import JwtDecoder from "@/components/tools/JwtDecoder";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "JWT Token Decoder & Inspector — 100% Client-Side Safe Debugger",
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

      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
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
    </ToolShell>
  );
}
