"use client";

import { useState } from "react";
import { calculateEgress, EgressResult } from "@/lib/calculators";
import { Copy, Check } from "lucide-react";

export default function CloudEgressCalculator() {
  const [monthlyTransferGB, setMonthlyTransferGB] = useState<number>(25000);
  const [cdnCacheHitPercent, setCdnCacheHitPercent] = useState<number>(85);
  const [cloudProvider, setCloudProvider] = useState<"aws" | "gcp" | "azure">("aws");
  const [copied, setCopied] = useState<boolean>(false);

  const result: EgressResult = calculateEgress({
    monthlyTransferGB,
    cdnCacheHitPercent,
    cloudProvider,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `DevOpsKit Cloud Egress Cost Breakdown:\nTransfer: ${monthlyTransferGB.toLocaleString()} GB\nProvider: ${cloudProvider.toUpperCase()}\nCDN Hit Rate: ${cdnCacheHitPercent}%\nOrigin Cost (No CDN): $${result.originCostWithoutCDN.toFixed(2)}/mo\nWith CDN: $${result.costWithCDN.toFixed(2)}/mo\nMonthly Savings: $${result.monthlySavings.toFixed(2)}/mo\nCloudflare R2 Egress: $0.00`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900 text-base">Bandwidth Parameters</h3>
            <span className="text-xs text-indigo-600 font-mono font-medium">Egress Optimization</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-2">
                Origin Cloud Hyperscaler
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setCloudProvider("aws")}
                  className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                    cloudProvider === "aws"
                      ? "bg-amber-50 border border-amber-300 text-amber-800 shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:text-slate-900"
                  }`}
                >
                  AWS S3/EC2
                </button>
                <button
                  onClick={() => setCloudProvider("gcp")}
                  className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                    cloudProvider === "gcp"
                      ? "bg-blue-50 border border-blue-300 text-blue-800 shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Google Cloud
                </button>
                <button
                  onClick={() => setCloudProvider("azure")}
                  className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                    cloudProvider === "azure"
                      ? "bg-indigo-50 border border-indigo-300 text-indigo-800 shadow-2xs"
                      : "bg-slate-100 text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Azure Blob
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Monthly Egress Volume</span>
                <span className="text-blue-600 font-mono font-semibold">{monthlyTransferGB.toLocaleString()} GB</span>
              </div>
              <input
                type="range"
                min="1000"
                max="500000"
                step="1000"
                value={monthlyTransferGB}
                onChange={(e) => setMonthlyTransferGB(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <input
                type="number"
                value={monthlyTransferGB}
                onChange={(e) => setMonthlyTransferGB(Number(e.target.value))}
                className="mt-1.5 w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">CDN Cache Hit Ratio</span>
                <span className="text-emerald-700 font-mono font-semibold">{cdnCacheHitPercent}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="99"
                step="1"
                value={cdnCacheHitPercent}
                onChange={(e) => setCdnCacheHitPercent(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Bandwidth absorbed directly by edge POPs without hitting the billable origin
              </span>
            </div>
          </div>
        </div>

        {/* Readouts */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 text-base">Egress Bill Analysis</h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-mono font-medium transition-colors shadow-2xs"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied!" : "Copy Breakdown"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-red-200 bg-red-50/50 shadow-sm">
              <span className="text-xs font-mono text-red-700 font-semibold block mb-1">Direct Origin Egress</span>
              <div className="text-3xl font-extrabold text-slate-900 font-mono">
                ${result.originCostWithoutCDN.toFixed(2)}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Standard internet egress without edge caching
              </span>
            </div>

            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/50 shadow-sm">
              <span className="text-xs font-mono text-emerald-700 font-semibold block mb-1">With CDN Optimization</span>
              <div className="text-3xl font-extrabold text-emerald-700 font-mono">
                ${result.costWithCDN.toFixed(2)}
              </div>
              <span className="text-[11px] text-emerald-800 mt-1 block">
                Absorbing {cdnCacheHitPercent}% at the edge
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/50 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-blue-700 uppercase font-mono tracking-wider font-semibold">Cloudflare R2 Alternative</span>
              <div className="text-2xl font-bold text-slate-900 font-mono mt-0.5">$0.00 Egress</div>
              <p className="text-xs text-slate-600 mt-1">Zero egress fees regardless of global download bandwidth.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
