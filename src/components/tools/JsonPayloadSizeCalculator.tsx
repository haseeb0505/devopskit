"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function JsonPayloadSizeCalculator() {
  const [jsonInput, setJsonInput] = useState<string>(
    JSON.stringify(
      {
        status: "success",
        data: {
          items: [
            { id: 1, name: "Production Kubernetes Node", active: true, load: 0.42 },
            { id: 2, name: "Staging Redis Cache", active: false, load: 0.1 },
            { id: 3, name: "API Gateway Envoy Proxy", active: true, load: 0.88 },
          ],
          pagination: { page: 1, total: 3, perPage: 20 },
        },
      },
      null,
      2
    )
  );
  const [copied, setCopied] = useState<boolean>(false);

  const rawBytes = new Blob([jsonInput]).size;
  let minifiedBytes = rawBytes;
  let isValidJson = false;

  try {
    const parsed = JSON.parse(jsonInput);
    const minified = JSON.stringify(parsed);
    minifiedBytes = new Blob([minified]).size;
    isValidJson = true;
  } catch {
    isValidJson = false;
  }

  const estimatedGzipBytes = Math.round(minifiedBytes * 0.32);
  const estimatedLLMTokens = Math.ceil(minifiedBytes / 3.6);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `DevOpsKit JSON Payload Analysis:\nRaw: ${(rawBytes / 1024).toFixed(2)} KB (${rawBytes} bytes)\nMinified: ${(minifiedBytes / 1024).toFixed(2)} KB (${minifiedBytes} bytes)\nEstimated Gzip: ${(estimatedGzipBytes / 1024).toFixed(2)} KB\nEst. LLM Tokens: ~${estimatedLLMTokens.toLocaleString()} tokens`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor */}
        <div className="lg:col-span-6 space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900 text-base">JSON Payload Editor</h3>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-medium ${
                isValidJson
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {isValidJson ? "Valid JSON" : "Syntax Error"}
            </span>
          </div>

          <textarea
            rows={12}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-xs text-sky-300 focus:outline-none focus:border-blue-500 leading-relaxed shadow-xs"
          />
        </div>

        {/* Metrics */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 text-base">Payload Weight Breakdown</h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-mono font-medium transition-colors shadow-2xs"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied!" : "Copy Report"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
              <span className="text-xs font-mono text-slate-500 block mb-1">Raw Size (Formatted)</span>
              <div className="text-2xl font-bold text-slate-900 font-mono">
                {rawBytes > 1024 ? `${(rawBytes / 1024).toFixed(2)} KB` : `${rawBytes} bytes`}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {rawBytes.toLocaleString()} bytes in editor
              </span>
            </div>

            <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/50 shadow-sm">
              <span className="text-xs font-mono text-blue-700 font-semibold block mb-1">Minified Size</span>
              <div className="text-2xl font-bold text-blue-700 font-mono">
                {minifiedBytes > 1024 ? `${(minifiedBytes / 1024).toFixed(2)} KB` : `${minifiedBytes} bytes`}
              </div>
              <span className="text-[11px] text-blue-900 mt-1 block">
                Stripped of unnecessary whitespace
              </span>
            </div>

            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/50 shadow-sm">
              <span className="text-xs font-mono text-emerald-700 font-semibold block mb-1">Estimated Gzip Wire Size</span>
              <div className="text-2xl font-bold text-emerald-700 font-mono">
                {estimatedGzipBytes > 1024 ? `${(estimatedGzipBytes / 1024).toFixed(2)} KB` : `${estimatedGzipBytes} bytes`}
              </div>
              <span className="text-[11px] text-emerald-900 mt-1 block">
                Approximate HTTP transfer weight
              </span>
            </div>

            <div className="p-5 rounded-xl border border-indigo-200 bg-indigo-50/50 shadow-sm">
              <span className="text-xs font-mono text-indigo-700 font-semibold block mb-1">Estimated LLM Tokens</span>
              <div className="text-2xl font-bold text-indigo-700 font-mono">
                ~{estimatedLLMTokens.toLocaleString()}
              </div>
              <span className="text-[11px] text-indigo-900 mt-1 block">
                Context window budget consumed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
