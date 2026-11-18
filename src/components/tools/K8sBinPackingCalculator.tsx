"use client";

import { useState } from "react";
import { calculateK8sBinPacking, K8sResult } from "@/lib/calculators";
import { Copy, Check } from "lucide-react";

export default function K8sBinPackingCalculator() {
  const [podCpuCores, setPodCpuCores] = useState<number>(0.5);
  const [podMemoryGiB, setPodMemoryGiB] = useState<number>(1.0);
  const [replicaCount, setReplicaCount] = useState<number>(30);
  const [nodeCpuCores, setNodeCpuCores] = useState<number>(8);
  const [nodeMemoryGiB, setNodeMemoryGiB] = useState<number>(32);
  const [systemOverheadPercent, setSystemOverheadPercent] = useState<number>(12);
  const [copied, setCopied] = useState<boolean>(false);

  const result: K8sResult = calculateK8sBinPacking({
    podCpuCores,
    podMemoryGiB,
    replicaCount,
    nodeCpuCores,
    nodeMemoryGiB,
    systemOverheadPercent,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `DevOpsKit K8s Bin-Packing Breakdown:\nWorkload: ${replicaCount} pods (${podCpuCores} vCPU, ${podMemoryGiB} GiB RAM)\nNode Spec: ${nodeCpuCores} vCPU, ${nodeMemoryGiB} GiB (${systemOverheadPercent}% overhead)\nResult: ${result.nodesRequired} nodes required (${result.podsPerNode} pods/node)\nCPU Utilization: ${result.cpuUtilizationPercent.toFixed(1)}% (Wasted: ${result.wastedCpuCores.toFixed(1)} vCPU)\nRAM Utilization: ${result.memUtilizationPercent.toFixed(1)}% (Wasted: ${result.wastedMemoryGiB.toFixed(1)} GiB)`
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
            <h3 className="font-semibold text-slate-900 text-base">Cluster Sizing</h3>
            <span className="text-xs text-indigo-600 font-mono font-medium">Bin-Packing Engine</span>
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
                  setPodCpuCores(0.5);
                  setPodMemoryGiB(1);
                  setReplicaCount(30);
                  setNodeCpuCores(4);
                  setNodeMemoryGiB(16);
                }}
                className="px-2.5 py-2 text-left rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-xs"
              >
                <div className="font-semibold text-slate-800">Go / Node APIs</div>
                <div className="text-[10px] text-slate-500">30 pods • 0.5c/1GB</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setPodCpuCores(2);
                  setPodMemoryGiB(8);
                  setReplicaCount(12);
                  setNodeCpuCores(16);
                  setNodeMemoryGiB(64);
                }}
                className="px-2.5 py-2 text-left rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-xs"
              >
                <div className="font-semibold text-slate-800">Java / Spring</div>
                <div className="text-[10px] text-slate-500">12 pods • 2c/8GB</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setPodCpuCores(4);
                  setPodMemoryGiB(16);
                  setReplicaCount(8);
                  setNodeCpuCores(32);
                  setNodeMemoryGiB(128);
                }}
                className="px-2.5 py-2 text-left rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-xs"
              >
                <div className="font-semibold text-slate-800">ML Model Pods</div>
                <div className="text-[10px] text-slate-500">8 pods • 4c/16GB</div>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-700 font-medium block mb-1">Pod vCPU Request</label>
                <input
                  type="number"
                  step="0.1"
                  value={podCpuCores}
                  onChange={(e) => setPodCpuCores(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-700 font-medium block mb-1">Pod RAM Request (GiB)</label>
                <input
                  type="number"
                  step="0.25"
                  value={podMemoryGiB}
                  onChange={(e) => setPodMemoryGiB(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Workload Replica Count</span>
                <span className="text-blue-600 font-mono font-semibold">{replicaCount} pods</span>
              </div>
              <input
                type="range"
                min="1"
                max="500"
                step="1"
                value={replicaCount}
                onChange={(e) => setReplicaCount(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-2">
                Worker Node Instance Size
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-700 font-medium block mb-1">Node vCPU</label>
                  <select
                    value={nodeCpuCores}
                    onChange={(e) => setNodeCpuCores(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value={2}>2 vCPU</option>
                    <option value={4}>4 vCPU</option>
                    <option value={8}>8 vCPU</option>
                    <option value={16}>16 vCPU</option>
                    <option value={32}>32 vCPU</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-700 font-medium block mb-1">Node RAM (GiB)</label>
                  <select
                    value={nodeMemoryGiB}
                    onChange={(e) => setNodeMemoryGiB(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value={8}>8 GiB</option>
                    <option value={16}>16 GiB</option>
                    <option value={32}>32 GiB</option>
                    <option value={64}>64 GiB</option>
                    <option value={128}>128 GiB</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">System Overhead (DaemonSets/kubelet)</span>
                <span className="text-amber-700 font-mono font-semibold">{systemOverheadPercent}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={systemOverheadPercent}
                onChange={(e) => setSystemOverheadPercent(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
            </div>
          </div>
        </div>

        {/* Readouts */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 text-base">Packing Efficiency</h3>
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
              <span className="text-xs font-mono text-blue-700 font-semibold block mb-1">Required Nodes</span>
              <div className="text-3xl font-extrabold text-slate-900 font-mono">
                {result.nodesRequired} nodes
              </div>
              <span className="text-[11px] text-blue-900 mt-1 block">
                {result.podsPerNode} pods packed per node
              </span>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
              <span className="text-xs font-mono text-slate-500 block mb-1">Total Cluster Allocations</span>
              <div className="text-xl font-bold text-slate-900 font-mono">
                {result.totalAllocatedCpu} vCPU / {result.totalAllocatedMemory} GiB
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Gross compute footprint provisioned
              </span>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
              <span className="text-xs font-mono text-slate-500 block mb-1">CPU Utilization</span>
              <div className="text-2xl font-bold text-emerald-700 font-mono">
                {result.cpuUtilizationPercent.toFixed(1)}%
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {result.wastedCpuCores.toFixed(1)} vCPU unallocated capacity
              </span>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
              <span className="text-xs font-mono text-slate-500 block mb-1">Memory Utilization</span>
              <div className="text-2xl font-bold text-emerald-700 font-mono">
                {result.memUtilizationPercent.toFixed(1)}%
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {result.wastedMemoryGiB.toFixed(1)} GiB unallocated capacity
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
