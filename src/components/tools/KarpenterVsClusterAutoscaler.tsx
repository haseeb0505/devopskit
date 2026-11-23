"use client";

import { useState } from "react";
import {
  PodWorkload,
  DaemonSetTax,
  INSTANCE_CATALOG,
  simulateBinPacking,
} from "@/lib/calculators/karpenterSimulator";
import {
  Server,
  Box,
  Copy,
  Check,
  Download,
  Zap,
  TrendingDown,
  Layers,
  ArrowRight,
} from "lucide-react";
import { downloadCSV } from "@/lib/export";
import ShareBar from "./ShareBar";

export default function KarpenterVsClusterAutoscaler() {
  const [workloads, setWorkloads] = useState<PodWorkload[]>([
    { name: "API Gateways", count: 12, cpuCores: 0.5, ramGiB: 1.0 },
    { name: "Backend Services", count: 24, cpuCores: 1.5, ramGiB: 4.0 },
    { name: "ML / Worker Queue", count: 8, cpuCores: 3.5, ramGiB: 14.0 },
  ]);

  const [daemonCpu, setDaemonCpu] = useState<number>(0.5);
  const [daemonRam, setDaemonRam] = useState<number>(1.2);
  const [standardNode, setStandardNode] = useState<string>("m6i.2xlarge");
  const [copiedKarpenter, setCopiedKarpenter] = useState<boolean>(false);

  const results = simulateBinPacking(
    workloads,
    { cpuCores: daemonCpu, ramGiB: daemonRam },
    standardNode
  );

  const handleUpdateWorkload = (index: number, field: keyof PodWorkload, val: number | string) => {
    const updated = [...workloads];
    updated[index] = { ...updated[index], [field]: val };
    setWorkloads(updated);
  };

  const handleAddWorkload = () => {
    setWorkloads([
      ...workloads,
      { name: `Workload ${workloads.length + 1}`, count: 4, cpuCores: 1.0, ramGiB: 2.0 },
    ]);
  };

  const handleRemoveWorkload = (index: number) => {
    if (workloads.length <= 1) return;
    setWorkloads(workloads.filter((_, i) => i !== index));
  };

  const karpenterNodePoolYaml = `# Karpenter NodePool manifest (Auto-rightsizing)
apiVersion: karpenter.sh/v1beta1
kind: NodePool
metadata:
  name: devopskit-optimized-pool
spec:
  template:
    spec:
      requirements:
        - key: "karpenter.k8s.aws/instance-family"
          operator: In
          values: ["c6i", "m6i", "r6i"]
        - key: "karpenter.sh/capacity-type"
          operator: In
          values: ["spot", "on-demand"]
      limits:
        cpu: "1000"
        memory: 1000Gi`;

  const handleCopyYaml = () => {
    navigator.clipboard.writeText(karpenterNodePoolYaml);
    setCopiedKarpenter(true);
    setTimeout(() => setCopiedKarpenter(false), 2000);
  };

  return (
    <div className="space-y-8">
      <ShareBar
        title="Karpenter vs Cluster Autoscaler FinOps Simulation"
        markdownSnippet={`### ☸️ K8s Karpenter vs Cluster Autoscaler Sizing\n- **Cluster Autoscaler Cost:** $${results.clusterAutoscalerMonthlyCost.toLocaleString()}/mo (${results.clusterAutoscalerNodes}x ${standardNode} nodes)\n- **Karpenter Dynamic Cost:** $${results.karpenterMonthlyCost.toLocaleString()}/mo (${results.karpenterTotalNodes} right-sized nodes)\n- **Identified FinOps Savings:** $${results.monthlyDollarSavingsKarpenter.toLocaleString()}/mo ($${results.annualDollarSavingsKarpenter.toLocaleString()}/yr)\n- **Spot Instance Potential:** $${results.karpenterMonthlyCostSpot.toLocaleString()}/mo`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs: Pods & DaemonSets */}
        <div className="lg:col-span-6 space-y-6 bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900 text-base">Cluster Workload Manifest</h3>
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-mono font-medium">
              Real 2D Bin Packing
            </span>
          </div>

          {/* Pod Deployment Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 uppercase tracking-wider">
              <span>Pod Workloads</span>
              <button
                type="button"
                onClick={handleAddWorkload}
                className="text-blue-600 hover:text-blue-700 normal-case font-medium"
              >
                + Add Workload
              </button>
            </div>

            <div className="space-y-2.5">
              {workloads.map((w, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={w.name}
                      onChange={(e) => handleUpdateWorkload(idx, "name", e.target.value)}
                      className="font-medium text-slate-900 bg-transparent border-b border-dashed border-slate-300 focus:outline-none focus:border-blue-500 w-1/2"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveWorkload(idx)}
                      className="text-slate-400 hover:text-rose-600 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Replicas</span>
                      <input
                        type="number"
                        min="1"
                        value={w.count}
                        onChange={(e) => handleUpdateWorkload(idx, "count", Number(e.target.value))}
                        className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs font-mono font-medium"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">CPU Cores</span>
                      <input
                        type="number"
                        step="0.25"
                        min="0.1"
                        value={w.cpuCores}
                        onChange={(e) => handleUpdateWorkload(idx, "cpuCores", Number(e.target.value))}
                        className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs font-mono font-medium"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">RAM (GiB)</span>
                      <input
                        type="number"
                        step="0.5"
                        min="0.2"
                        value={w.ramGiB}
                        onChange={(e) => handleUpdateWorkload(idx, "ramGiB", Number(e.target.value))}
                        className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-xs font-mono font-medium"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DaemonSet Overhead Tax */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 uppercase tracking-wider">
                DaemonSet Overhead Per Node
              </span>
              <span className="text-slate-500 text-[10px]">Cilium + Datadog + CSI</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-600 block mb-1">DaemonSet Reserved CPU</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={daemonCpu}
                  onChange={(e) => setDaemonCpu(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-600 block mb-1">DaemonSet Reserved RAM (GiB)</label>
                <input
                  type="number"
                  step="0.2"
                  min="0.2"
                  value={daemonRam}
                  onChange={(e) => setDaemonRam(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* Cluster Autoscaler Fixed Instance Configuration */}
          <div className="pt-4 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Cluster Autoscaler Fixed Node Group
            </label>
            <select
              value={standardNode}
              onChange={(e) => setStandardNode(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:bg-white"
            >
              {INSTANCE_CATALOG.map((inst) => (
                <option key={inst.name} value={inst.name}>
                  {inst.name} ({inst.vCpu} vCPU / {inst.ramGiB} GB RAM) — ${inst.hourlyPriceOnDemand}/hr
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Output: Autoscaler vs Karpenter */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Comparison Hero Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">FinOps Sizing & Waste Simulation</h3>
              <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800">
                Save ${results.monthlyDollarSavingsKarpenter.toLocaleString()}/mo
              </span>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <Server className="h-4 w-4 text-slate-500" />
                  <span>Cluster Autoscaler</span>
                </div>
                <div className="text-2xl font-extrabold font-mono text-slate-900">
                  ${results.clusterAutoscalerMonthlyCost.toLocaleString()}
                  <span className="text-xs font-normal text-slate-400">/mo</span>
                </div>
                <div className="text-xs text-slate-600">
                  Requires <strong>{results.clusterAutoscalerNodes} nodes</strong> ({standardNode})
                </div>
                <div className="text-[11px] text-rose-600 font-medium">
                  {results.clusterAutoscalerCpuWastePercent}% CPU & {results.clusterAutoscalerRamWastePercent}% RAM waste
                </div>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                  <Zap className="h-4 w-4 text-emerald-600" />
                  <span>Karpenter Rightsizing</span>
                </div>
                <div className="text-2xl font-extrabold font-mono text-emerald-600">
                  ${results.karpenterMonthlyCost.toLocaleString()}
                  <span className="text-xs font-normal text-emerald-700">/mo</span>
                </div>
                <div className="text-xs text-emerald-900">
                  Packs into <strong>{results.karpenterTotalNodes} heterogeneous nodes</strong>
                </div>
                <div className="text-[11px] text-emerald-700 font-medium">
                  {results.karpenterCpuWastePercent}% CPU & {results.karpenterRamWastePercent}% RAM waste
                </div>
              </div>
            </div>

            {/* Karpenter Provisioned Node Mix */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Karpenter Right-Sized Node Allocation
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {results.karpenterNodes.map((n, i) => (
                  <div key={i} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-center">
                    <div className="text-sm font-bold font-mono text-slate-900">{n.count}x</div>
                    <div className="text-[11px] font-mono text-slate-600">{n.instanceType}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spot Instance Upside */}
            <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-950">
              <div>
                <span className="font-bold block">Spot Instance FinOps Opportunity</span>
                <span className="text-[11px] text-blue-800">
                  If running Karpenter spot nodes for stateless replicas:
                </span>
              </div>
              <span className="text-base font-extrabold font-mono text-blue-700">
                ${results.karpenterMonthlyCostSpot.toLocaleString()}/mo
              </span>
            </div>

            {/* Karpenter Manifest Copy */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">Ready Karpenter NodePool Spec</span>
                <button
                  type="button"
                  onClick={handleCopyYaml}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  {copiedKarpenter ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copiedKarpenter ? "Copied" : "Copy YAML"}
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono overflow-x-auto">
                {karpenterNodePoolYaml}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
