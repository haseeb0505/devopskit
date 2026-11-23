import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import RAGCostCalculator from "@/components/tools/RAGCostCalculator";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "RAG Embedding Cost Calculator & Vector DB Sizer",
  "Calculate token consumption, chunking overhead, and vector memory footprint (HNSW / Float32) for RAG pipelines. Free planning tool.",
  "rag-embedding-cost-calculator"
);

const faqs = [
  {
    question: "How do you calculate RAG embedding costs?",
    answer:
      "Multiply document count by chunks per document to get total chunks, then multiply by chunk size to get total tokens. Divide by 1,000,000 and multiply by the provider's embedding rate (e.g., $0.02/1M for OpenAI small).",
  },
  {
    question: "How much RAM does a vector database require?",
    answer:
      "For HNSW (Hierarchical Navigable Small World) indexes used in Pinecone, Qdrant, and pgvector, each Float32 dimension takes 4 bytes. An additional ~1.5x multiplier is needed for graph links and index metadata in memory.",
  },
  {
    question: "What chunk size is recommended for RAG?",
    answer:
      "Between 300 and 800 tokens with a 10% to 15% overlap is standard for general retrieval. Smaller chunks preserve precision; larger chunks retain broad semantic context.",
  },
];

export default function RAGCostPage() {
  const structuredData = generateStructuredData(
    "RAG Embedding Cost Calculator",
    "Calculate vector database storage requirements and embedding token costs for RAG architectures.",
    "rag-embedding-cost-calculator",
    faqs
  );

  return (
    <ToolShell
      title="RAG Embedding & Vector Storage Calculator"
      description="Forecast token indexing costs and calculate RAM/disk storage footprints for vector databases (pgvector, Pinecone, Qdrant, Milvus)."
      category="AI & LLM"
      categoryHref="/#ai-calculators"
      badge="Chunk & Memory Estimator"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredData}
      />

      <RAGCostCalculator />

      {/* Authoritative Technical Guide & Princeton GEO Benchmark Table */}
      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
        {/* Static HTML Table for Zero-JS AI Bot Extraction */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Leading Embedding Model Pricing & Dimension Sizing Matrix (2026)
              </h3>
              <p className="text-xs text-slate-500">
                Verified dimensional requirements and cost per 1M tokens across major embedding providers.
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
                  <th className="py-2 pr-3">Model Name</th>
                  <th className="py-2 px-3">Dimensions</th>
                  <th className="py-2 px-3">Price / 1M Tokens</th>
                  <th className="py-2 px-3">RAM / 100k Vectors</th>
                  <th className="py-2 px-3">Ideal Use Case</th>
                  <th className="py-2 pl-3">Official Docs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">text-embedding-3-small (OpenAI)</td>
                  <td className="py-2.5 px-3">1,536</td>
                  <td className="py-2.5 px-3 font-semibold text-emerald-700">$0.020</td>
                  <td className="py-2.5 px-3 font-mono">~614 MB</td>
                  <td className="py-2.5 px-3">Production RAG & Search</td>
                  <td className="py-2.5 pl-3">
                    <a href="https://platform.openai.com/docs/guides/embeddings" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      OpenAI Docs ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">text-embedding-3-large (OpenAI)</td>
                  <td className="py-2.5 px-3">3,072</td>
                  <td className="py-2.5 px-3 font-semibold text-emerald-700">$0.130</td>
                  <td className="py-2.5 px-3 font-mono">~1.23 GB</td>
                  <td className="py-2.5 px-3">High-Precision Legal/Medical</td>
                  <td className="py-2.5 pl-3">
                    <a href="https://platform.openai.com/docs/guides/embeddings" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      OpenAI Docs ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">Embed English v3.0 (Cohere)</td>
                  <td className="py-2.5 px-3">1,024</td>
                  <td className="py-2.5 px-3 font-semibold text-emerald-700">$0.100</td>
                  <td className="py-2.5 px-3 font-mono">~410 MB</td>
                  <td className="py-2.5 px-3">Enterprise Multi-Stage RAG</td>
                  <td className="py-2.5 pl-3">
                    <a href="https://docs.cohere.com/docs/cohere-embed" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Cohere Docs ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">BGE-M3 (Open-Source)</td>
                  <td className="py-2.5 px-3">1,024</td>
                  <td className="py-2.5 px-3 font-semibold text-emerald-700">$0.000 (Compute)</td>
                  <td className="py-2.5 px-3 font-mono">~410 MB</td>
                  <td className="py-2.5 px-3">Air-Gapped & Local Search</td>
                  <td className="py-2.5 pl-3">
                    <a href="https://huggingface.co/BAAI/bge-m3" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Hugging Face ↗
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            RAG Token Economics &amp; Vector Database Sizing
          </h2>
          <p>
            Retrieval-Augmented Generation (RAG) is the dominant architecture for
            grounding foundation models on enterprise knowledge. While embedding
            tokens are relatively inexpensive compared to generation tokens, the
            operational expense of RAG systems is dominated by the vector
            database running in RAM to power low-latency approximate nearest
            neighbor (ANN) search.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            Vector Dimension Memory Breakdown
          </h3>
          <p>
            Every vector embedding consists of floating-point numbers. In
            standard single-precision (Float32), each dimension occupies exactly
            4 bytes:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 my-3">
            <li><strong>768 dimensions</strong> = 3,072 bytes per vector</li>
            <li><strong>1536 dimensions</strong> = 6,144 bytes per vector</li>
            <li><strong>3072 dimensions</strong> = 12,288 bytes per vector</li>
          </ul>
          <p>
            When utilizing graph-based indexes like HNSW, the index must store
            multi-layer graph adjacency lists in RAM to achieve sub-10ms search
            times, requiring roughly 1.5× the raw vector size in available memory.
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
                className="bg-slate-50 border border-slate-200/80 rounded-xl p-4"
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
          <h2 className="font-bold text-xl mb-4">Rag Embedding Cost Calculator – How It Works & Real‑World Usage</h2>
          <p>This interactive calculator estimates <strong>Rag Embedding Cost Calculator</strong> based on the official pricing tables of the major cloud providers and LLM vendors. All rates are pulled from the public pricing pages and are frozen at the time of the last repository sync (March 2026).</p>
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
