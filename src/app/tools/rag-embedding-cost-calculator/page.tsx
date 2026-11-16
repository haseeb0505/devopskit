import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import RAGCostCalculator from "@/components/tools/RAGCostCalculator";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "RAG Embedding Cost Calculator — Vector DB Storage & Token Sizing",
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

      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
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
    </ToolShell>
  );
}
