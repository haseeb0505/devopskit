"use client";

import { useState } from "react";
import { calculateServerless, ServerlessResult } from "@/lib/calculators";
import { Copy, Check } from "lucide-react";

export default function CloudRunVsLambdaCalculator() {
  const [monthlyRequests, setMonthlyRequests] = useState<number>(10000000);
  const [avgDurationMs, setAvgDurationMs] = useState<number>(200);
  const [memoryMB, setMemoryMB] = useState<number>(512);
  const [concurrencyPerInstance, setConcurrencyPerInstance] = useState<number>(8);
  const [copied, setCopied] = useState<boolean>(false);

  const result: ServerlessResult = calculateServerless({
    monthlyRequests,
    avgDurationMs,
    memoryMB,
    vcpuCount: 1,
    concurrencyPerInstance,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `DevOpsKit Serverless Cost Comparison:\nMonthly Requests: ${monthlyRequests.toLocaleString()}\nDuration: ${avgDurationMs}ms\nMemory: ${memoryMB}MB\nCloud Run Concurrency: ${concurrencyPerInstance}\n\nGoogle Cloud Run: $${result.cloudRunMonthly.toFixed(2)}/mo\nAWS Lambda: $${result.lambdaMonthly.toFixed(2)}/mo\nWinner: ${result.cheaperProvider} (diff: $${result.monthlyDifference.toFixed(2)}/mo)`
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
            <h3 className="font-semibold text-slate-900 text-base">Serverless Workload</h3>
            <span className="text-xs text-indigo-600 font-mono font-medium">Free Tiers Included</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Monthly Invocations</span>
                <span className="text-blue-600 font-mono font-semibold">{monthlyRequests.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500000"
                max="100000000"
                step="500000"
                value={monthlyRequests}
                onChange={(e) => setMonthlyRequests(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Avg Execution Duration</span>
                <span className="text-indigo-600 font-mono font-semibold">{avgDurationMs} ms</span>
              </div>
              <input
                type="range"
                min="10"
                max="5000"
                step="10"
                value={avgDurationMs}
                onChange={(e) => setAvgDurationMs(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-700 font-medium block mb-1">Memory (MB)</label>
                <select
                  value={memoryMB}
                  onChange={(e) => setMemoryMB(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                >
                  <option value={256}>256 MB</option>
                  <option value={512}>512 MB</option>
                  <option value={1024}>1024 MB (1GB)</option>
                  <option value={2048}>2048 MB (2GB)</option>
                  <option value={4096}>4096 MB (4GB)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-700 font-medium block mb-1">Cloud Run Concurrency</label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={concurrencyPerInstance}
                  onChange={(e) => setConcurrencyPerInstance(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <span className="text-[11px] text-slate-500 block">
              Cloud Run handles multiple concurrent requests on a single container. AWS Lambda processes 1 request per concurrent instance.
            </span>
          </div>
        </div>

        {/* Readouts */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 text-base">Cost Comparison</h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-mono font-medium transition-colors shadow-2xs"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied!" : "Copy Comparison"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/50 shadow-sm">
              <span className="text-xs font-mono text-blue-700 font-semibold block mb-1">Google Cloud Run</span>
              <div className="text-3xl font-extrabold text-slate-900 font-mono">
                ${result.cloudRunMonthly.toFixed(2)}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Includes 2M free requests + 180k vCPU-s
              </span>
            </div>

            <div className="p-5 rounded-xl border border-amber-200 bg-amber-50/50 shadow-sm">
              <span className="text-xs font-mono text-amber-700 font-semibold block mb-1">AWS Lambda</span>
              <div className="text-3xl font-extrabold text-slate-900 font-mono">
                ${result.lambdaMonthly.toFixed(2)}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Includes 1M free requests + 400k GB-s
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 uppercase font-mono tracking-wider">Most Cost-Effective</span>
              <div className="text-lg font-bold text-emerald-700 mt-0.5">
                {result.cheaperProvider}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 uppercase font-mono tracking-wider">Estimated Advantage</span>
              <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">
                ${result.monthlyDifference.toFixed(2)} / mo
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
