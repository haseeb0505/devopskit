"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import ShareBar from "./ShareBar";

const ARCHETYPES = {
  authClaims: JSON.stringify(
    {
      sub: "usr_948194a82b",
      name: "Sarah Connor",
      email: "sarah.connor@cyberdyne.io",
      roles: ["admin", "devops_engineer", "billing_manager"],
      organization: {
        id: "org_7721",
        name: "Resistance Infra",
        tier: "enterprise_scale"
      },
      permissions: [
        "cluster:create",
        "cluster:delete",
        "dns:modify",
        "secrets:decrypt",
        "billing:read_write"
      ],
      iat: 1742467200,
      exp: 1742553600
    },
    null,
    2
  ),
  catalogApi: JSON.stringify(
    {
      status: 200,
      data: {
        products: [
          {
            id: "prod_101",
            title: "Cloud FinOps Monitoring Agent",
            sku: "FIN-AGENT-PRO",
            price: 299.00,
            currency: "USD",
            tags: ["cloud", "finops", "aws", "gcp"],
            stock: { in_stock: true, inventory: 420 },
            metadata: { version: "2.4.1", region: "us-east-1" }
          },
          {
            id: "prod_102",
            title: "Autonomous Prompt Caching Proxy",
            sku: "LLM-CACHE-MAX",
            price: 499.00,
            currency: "USD",
            tags: ["ai", "caching", "anthropic", "openai"],
            stock: { in_stock: true, inventory: 150 },
            metadata: { version: "1.0.8", region: "global" }
          }
        ],
        pagination: { page: 1, per_page: 20, total_records: 128, has_more: true }
      }
    },
    null,
    2
  ),
  aiFunction: JSON.stringify(
    {
      type: "function",
      function: {
        name: "calculate_cloud_egress_and_savings",
        description: "Calculates monthly internet data transfer costs across AWS, GCP, and Azure and projects Cloudflare R2 zero-egress savings.",
        parameters: {
          type: "object",
          properties: {
            monthlyTransferGB: {
              type: "number",
              description: "Total outbound gigabytes transferred to the public internet per month"
            },
            cdnCacheHitPercent: {
              type: "number",
              description: "Percentage of requests absorbed by CDN edge cache (0 to 99)"
            },
            cloudProvider: {
              type: "string",
              enum: ["aws", "gcp", "azure"],
              description: "Origin cloud provider infrastructure host"
            }
          },
          required: ["monthlyTransferGB", "cdnCacheHitPercent", "cloudProvider"]
        }
      }
    },
    null,
    2
  )
};

export default function JsonPayloadSizeCalculator() {
  const [jsonInput, setJsonInput] = useState<string>(ARCHETYPES.catalogApi);
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

  const markdownSnippet = [
    `### 📦 JSON Payload Weight & Token Analysis`,
    `**Status:** ${isValidJson ? "Valid JSON" : "Syntax Error"} | **Tokens:** ~${estimatedLLMTokens.toLocaleString()} tokens\n`,
    `| Metric | Size | Description |`,
    `| :--- | :--- | :--- |`,
    `| **Raw Formatted** | ${rawBytes > 1024 ? `${(rawBytes / 1024).toFixed(2)} KB` : `${rawBytes} bytes`} | Formatted with indentation |`,
    `| **Minified Size** | ${minifiedBytes > 1024 ? `${(minifiedBytes / 1024).toFixed(2)} KB` : `${minifiedBytes} bytes`} | Whitespace stripped |`,
    `| **Estimated Gzip Wire** | ${estimatedGzipBytes > 1024 ? `${(estimatedGzipBytes / 1024).toFixed(2)} KB` : `${estimatedGzipBytes} bytes`} | ~68% compression reduction |`,
    `| **Estimated LLM Tokens** | ~${estimatedLLMTokens.toLocaleString()} | ~3.6 bytes per token |`,
  ].join("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `DevOpsKit JSON Payload Analysis:\nRaw: ${(rawBytes / 1024).toFixed(2)} KB (${rawBytes} bytes)\nMinified: ${(minifiedBytes / 1024).toFixed(2)} KB (${minifiedBytes} bytes)\nEstimated Gzip: ${(estimatedGzipBytes / 1024).toFixed(2)} KB\nEst. LLM Tokens: ~${estimatedLLMTokens.toLocaleString()} tokens`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* 1-Click Share & Export Bar */}
      <ShareBar title="JSON payload analysis" markdownSnippet={markdownSnippet} />

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

          {/* 1-Click Real-World Archetypes */}
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              ⚡ 1-Click Real-World Archetypes
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setJsonInput(ARCHETYPES.authClaims)}
                className="px-2.5 py-2 text-left rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-xs"
              >
                <div className="font-semibold text-slate-800">Auth Token</div>
                <div className="text-[10px] text-slate-500">JWT Claims</div>
              </button>
              <button
                type="button"
                onClick={() => setJsonInput(ARCHETYPES.catalogApi)}
                className="px-2.5 py-2 text-left rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-xs"
              >
                <div className="font-semibold text-slate-800">Product List</div>
                <div className="text-[10px] text-slate-500">REST Catalog</div>
              </button>
              <button
                type="button"
                onClick={() => setJsonInput(ARCHETYPES.aiFunction)}
                className="px-2.5 py-2 text-left rounded-lg border border-indigo-200 bg-indigo-50/30 hover:border-indigo-500 hover:bg-indigo-50/70 transition-all text-xs"
              >
                <div className="font-semibold text-indigo-900">AI Function</div>
                <div className="text-[10px] text-indigo-700">Tool Schema</div>
              </button>
            </div>
          </div>

          <textarea
            rows={18}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full min-h-[380px] bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-xs text-sky-300 focus:outline-none focus:border-blue-500 leading-relaxed shadow-xs resize-y"
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
