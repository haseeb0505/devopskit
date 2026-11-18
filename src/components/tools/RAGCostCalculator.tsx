"use client";

import { useState } from "react";
import { calculateRAGCost, RAGResult } from "@/lib/calculators";
import { Copy, Check } from "lucide-react";

export default function RAGCostCalculator() {
  const [totalDocuments, setTotalDocuments] = useState<number>(5000);
  const [avgTokensPerDoc, setAvgTokensPerDoc] = useState<number>(2000);
  const [chunkSize, setChunkSize] = useState<number>(500);
  const [chunkOverlapPercent, setChunkOverlapPercent] = useState<number>(10);
  const [embeddingCostPer1M, setEmbeddingCostPer1M] = useState<number>(0.02);
  const [vectorDimensions, setVectorDimensions] = useState<number>(1536);
  const [copied, setCopied] = useState<boolean>(false);

  const result: RAGResult = calculateRAGCost({
    totalDocuments,
    avgTokensPerDoc,
    chunkSize,
    chunkOverlapPercent,
    embeddingCostPer1M,
    vectorDimensions,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `DevOpsKit RAG Cost & Capacity Breakdown:\nDocuments: ${totalDocuments}\nTotal Chunks: ${result.totalChunks.toLocaleString()}\nTokens Indexed: ${result.totalTokensIndexed.toLocaleString()}\nEmbedding Cost: $${result.embeddingCost.toFixed(4)}\nVector Storage: ${result.estimatedVectorStorageMB.toFixed(1)} MB\nEstimated Index RAM: ${result.estimatedMemoryGB.toFixed(2)} GB`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-6 bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900 text-base">Pipeline Parameters</h3>
            <span className="text-xs text-blue-600 font-mono font-medium">Chunks &amp; Vectors</span>
          </div>

          {/* 1-Click Startup Archetypes */}
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              ⚡ 1-Click Real-World Archetypes
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setTotalDocuments(2500);
                  setAvgTokensPerDoc(800);
                  setChunkSize(400);
                  setChunkOverlapPercent(10);
                  setEmbeddingCostPer1M(0.02);
                  setVectorDimensions(1536);
                }}
                className="px-2.5 py-2 text-left rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-xs"
              >
                <div className="font-semibold text-slate-800">Notion Docs</div>
                <div className="text-[10px] text-slate-500">2.5k docs • Small</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setTotalDocuments(20000);
                  setAvgTokensPerDoc(3000);
                  setChunkSize(512);
                  setChunkOverlapPercent(15);
                  setEmbeddingCostPer1M(0.13);
                  setVectorDimensions(1536);
                }}
                className="px-2.5 py-2 text-left rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-xs"
              >
                <div className="font-semibold text-slate-800">PDF Archive</div>
                <div className="text-[10px] text-slate-500">20k pdfs • Large</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setTotalDocuments(80000);
                  setAvgTokensPerDoc(500);
                  setChunkSize(256);
                  setChunkOverlapPercent(10);
                  setEmbeddingCostPer1M(0.02);
                  setVectorDimensions(768);
                }}
                className="px-2.5 py-2 text-left rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-xs"
              >
                <div className="font-semibold text-slate-800">Code Search</div>
                <div className="text-[10px] text-slate-500">80k files • Fast</div>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Total Corpus Documents</span>
                <span className="text-blue-600 font-mono font-semibold">{totalDocuments.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="100"
                max="500000"
                step="500"
                value={totalDocuments}
                onChange={(e) => setTotalDocuments(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Avg Tokens Per Document</span>
                <span className="text-blue-600 font-mono font-semibold">{avgTokensPerDoc.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="200"
                max="20000"
                step="200"
                value={avgTokensPerDoc}
                onChange={(e) => setAvgTokensPerDoc(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-700 font-medium text-xs block mb-1">Chunk Size (Tokens)</label>
                <input
                  type="number"
                  value={chunkSize}
                  onChange={(e) => setChunkSize(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-700 font-medium text-xs block mb-1">Overlap %</label>
                <input
                  type="number"
                  value={chunkOverlapPercent}
                  onChange={(e) => setChunkOverlapPercent(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-700 font-medium text-xs block mb-1">Embedding $/1M Tokens</label>
                <input
                  type="number"
                  step="0.005"
                  value={embeddingCostPer1M}
                  onChange={(e) => setEmbeddingCostPer1M(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-700 font-medium text-xs block mb-1">Vector Dimensions</label>
                <select
                  value={vectorDimensions}
                  onChange={(e) => setVectorDimensions(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                >
                  <option value={768}>768 (Gemini / BERT)</option>
                  <option value={1024}>1024 (Cohere v3)</option>
                  <option value={1536}>1536 (OpenAI Small)</option>
                  <option value={3072}>3072 (OpenAI Large)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Readouts */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 text-base">Capacity &amp; Cost Projection</h3>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-medium transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied!" : "Copy Spec"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-5">
              <span className="text-xs font-medium text-slate-500 block mb-1">Total Vector Chunks</span>
              <div className="text-2xl font-bold text-slate-900 font-mono">
                {result.totalChunks.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {(result.totalTokensIndexed / 1_000_000).toFixed(2)}M tokens indexed
              </span>
            </div>

            <div className="bg-blue-50/60 border border-blue-200 text-blue-900 rounded-xl p-5">
              <span className="text-xs font-semibold text-blue-700 block mb-1">One-Time Embedding Cost</span>
              <div className="text-2xl font-bold text-blue-950 font-mono">
                ${result.embeddingCost.toFixed(3)}
              </div>
              <span className="text-[11px] text-blue-800/80 mt-1 block">
                Based on ${embeddingCostPer1M}/1M tokens
              </span>
            </div>

            <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-5">
              <span className="text-xs font-medium text-slate-500 block mb-1">Vector Disk Footprint</span>
              <div className="text-2xl font-bold text-slate-900 font-mono">
                {result.estimatedVectorStorageMB > 1024
                  ? `${(result.estimatedVectorStorageMB / 1024).toFixed(2)} GB`
                  : `${result.estimatedVectorStorageMB.toFixed(1)} MB`}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Float32 raw vectors + metadata overhead
              </span>
            </div>

            <div className="bg-blue-50/60 border border-blue-200 text-blue-900 rounded-xl p-5">
              <span className="text-xs font-semibold text-blue-700 block mb-1">Recommended Index RAM</span>
              <div className="text-2xl font-bold text-blue-950 font-mono">
                {result.estimatedMemoryGB.toFixed(2)} GB
              </div>
              <span className="text-[11px] text-blue-800/80 mt-1 block">
                HNSW graph in-memory working set
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
