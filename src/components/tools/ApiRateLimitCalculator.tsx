"use client";

import { useState } from "react";
import { calculateRateLimit, RateLimitResult } from "@/lib/calculators";
import { Copy, Check } from "lucide-react";

export default function ApiRateLimitCalculator() {
  const [targetRPS, setTargetRPS] = useState<number>(250);
  const [p95LatencyMs, setP95LatencyMs] = useState<number>(180);
  const [burstMultiplier, setBurstMultiplier] = useState<number>(2.0);
  const [copied, setCopied] = useState<boolean>(false);

  const result: RateLimitResult = calculateRateLimit({
    targetRPS,
    p95LatencyMs,
    burstMultiplier,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `DevOpsKit Rate Limit & Burst Spec:\nTarget RPS: ${targetRPS} req/sec\nP95 Latency: ${p95LatencyMs} ms\nBurst Multiplier: ${burstMultiplier}x\nBucket Capacity: ${result.bucketCapacity} tokens\nRefill Rate: ${result.refillRatePerSec} tokens/sec\nConcurrent Sockets: ${result.concurrentConnectionsRequired} connections\nBackoff Headroom: ${result.recommendedBackoffSeconds}s`
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
            <h3 className="font-semibold text-slate-900 text-base">Traffic Parameters</h3>
            <span className="text-xs text-amber-700 font-mono font-medium">Token-Bucket Model</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Target Sustained RPS</span>
                <span className="text-blue-600 font-mono font-semibold">{targetRPS} req/sec</span>
              </div>
              <input
                type="range"
                min="10"
                max="5000"
                step="10"
                value={targetRPS}
                onChange={(e) => setTargetRPS(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <input
                type="number"
                value={targetRPS}
                onChange={(e) => setTargetRPS(Number(e.target.value))}
                className="mt-1.5 w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">P95 Upstream Latency</span>
                <span className="text-indigo-600 font-mono font-semibold">{p95LatencyMs} ms</span>
              </div>
              <input
                type="range"
                min="20"
                max="2000"
                step="10"
                value={p95LatencyMs}
                onChange={(e) => setP95LatencyMs(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Burst Multiplier</span>
                <span className="text-amber-700 font-mono font-semibold">{burstMultiplier}x</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.5"
                value={burstMultiplier}
                onChange={(e) => setBurstMultiplier(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Allows momentary spikes above steady-state refill rate
              </span>
            </div>
          </div>
        </div>

        {/* Readouts */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 text-base">Rate Limiter Sizing</h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-mono font-medium transition-colors shadow-2xs"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied!" : "Copy Spec"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/50 shadow-sm">
              <span className="text-xs font-mono text-blue-700 font-semibold block mb-1">Bucket Capacity (Tokens)</span>
              <div className="text-3xl font-extrabold text-slate-900 font-mono">
                {result.bucketCapacity}
              </div>
              <span className="text-[11px] text-blue-900 mt-1 block">
                Max burst depth before 429 Too Many Requests
              </span>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
              <span className="text-xs font-mono text-slate-500 block mb-1">Refill Rate</span>
              <div className="text-3xl font-bold text-emerald-700 font-mono">
                {result.refillRatePerSec} / sec
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Tokens replenished per second
              </span>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
              <span className="text-xs font-mono text-slate-500 block mb-1">Concurrent Sockets</span>
              <div className="text-2xl font-bold text-indigo-700 font-mono">
                {result.concurrentConnectionsRequired}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Little&apos;s Law concurrency needed
              </span>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
              <span className="text-xs font-mono text-slate-500 block mb-1">Retry Backoff Base</span>
              <div className="text-2xl font-bold text-amber-700 font-mono">
                {result.recommendedBackoffSeconds}s
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Recommended jitter backoff ceiling
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
