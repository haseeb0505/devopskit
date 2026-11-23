"use client";

import { useState } from "react";
import {
  NatAuditInputs,
  auditNatGatewayCosts,
} from "@/lib/calculators/natGatewayAuditor";
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  Download,
  ShieldAlert,
  ArrowRight,
  TrendingDown,
  Layers,
} from "lucide-react";
import { downloadCSV } from "@/lib/export";
import ShareBar from "./ShareBar";

export default function NatGatewayAuditor() {
  const [azCount, setAzCount] = useState<1 | 2 | 3>(3);
  const [natDeployMode, setNatDeployMode] = useState<"single-shared" | "one-per-az" | "fck-nat-instance">("single-shared");
  const [internetEgressGB, setInternetEgressGB] = useState<number>(3000);
  const [s3TransferGB, setS3TransferGB] = useState<number>(8000);
  const [ecrPullGB, setEcrPullGB] = useState<number>(1500);
  const [crossAzTrafficGB, setCrossAzTrafficGB] = useState<number>(4000);
  const [hasS3GatewayEndpoint, setHasS3GatewayEndpoint] = useState<boolean>(false);
  const [hasEcrInterfaceEndpoint, setHasEcrInterfaceEndpoint] = useState<boolean>(false);
  const [copiedTf, setCopiedTf] = useState<boolean>(false);

  const results = auditNatGatewayCosts({
    azCount,
    natDeployMode,
    monthlyInternetEgressGB: internetEgressGB,
    monthlyS3TransferGB: s3TransferGB,
    monthlyEcrPullGB: ecrPullGB,
    crossAzTrafficGB,
    hasS3GatewayEndpoint,
    hasEcrInterfaceEndpoint,
  });

  const handleCopyTf = () => {
    navigator.clipboard.writeText(results.terraformRecommendation);
    setCopiedTf(true);
    setTimeout(() => setCopiedTf(false), 2000);
  };

  return (
    <div className="space-y-8">
      <ShareBar
        title="AWS NAT Gateway & Egress Trap Audit"
        markdownSnippet={`### 💸 AWS NAT Gateway Audit Report\n- **Current Monthly Bill:** $${results.totalMonthlyCost.toLocaleString()}/mo\n- **Optimized Monthly Bill:** $${results.optimizedMonthlyCost.toLocaleString()}/mo\n- **Identified Waste:** $${results.monthlySavings.toLocaleString()}/mo (${Math.round((results.monthlySavings / Math.max(1, results.totalMonthlyCost)) * 100)}% reduction)\n- **Top Fix:** ${results.findings[0]?.title || "Enable VPC Gateway Endpoints"}`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-6 bg-white border border-slate-200 shadow-sm rounded-2xl p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900 text-base">VPC Topology & Traffic Profile</h3>
            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-mono font-medium">
              AWS US-East-1 Rates
            </span>
          </div>

          {/* Quick Archetype Preset */}
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              ⚡ 1-Click AWS Architecture Traps
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setAzCount(3);
                  setNatDeployMode("single-shared");
                  setHasS3GatewayEndpoint(false);
                  setS3TransferGB(12000);
                  setInternetEgressGB(4000);
                }}
                className="p-2 text-left rounded-lg border border-slate-200 hover:border-amber-500 hover:bg-amber-50/50 transition-all text-xs"
              >
                <div className="font-semibold text-slate-800">S3 Backup Trap</div>
                <div className="text-[10px] text-slate-500">No VPC Endpoint</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setAzCount(3);
                  setNatDeployMode("single-shared");
                  setInternetEgressGB(8000);
                  setCrossAzTrafficGB(10000);
                }}
                className="p-2 text-left rounded-lg border border-slate-200 hover:border-amber-500 hover:bg-amber-50/50 transition-all text-xs"
              >
                <div className="font-semibold text-slate-800">Cross-AZ NAT Trap</div>
                <div className="text-[10px] text-slate-500">1 NAT in 3 AZs</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setAzCount(3);
                  setNatDeployMode("fck-nat-instance");
                  setHasS3GatewayEndpoint(true);
                  setInternetEgressGB(6000);
                }}
                className="p-2 text-left rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-xs"
              >
                <div className="font-semibold text-slate-800">fck-nat Optimal</div>
                <div className="text-[10px] text-slate-500">Zero data processing fee</div>
              </button>
            </div>
          </div>

          {/* Availability Zones */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Availability Zone Footprint
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setAzCount(num as 1 | 2 | 3)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    azCount === num
                      ? "border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-500"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {num} AZ{num > 1 ? "s" : ""}
                </button>
              ))}
            </div>
          </div>

          {/* NAT Architecture Mode */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              NAT Deployment Architecture
            </label>
            <div className="space-y-2">
              {[
                {
                  id: "single-shared",
                  title: "Single Shared NAT Gateway (1 across all AZs)",
                  desc: "Cheaper base hourly fee, but incurs cross-AZ transfer penalties and single-point-of-failure risk.",
                },
                {
                  id: "one-per-az",
                  title: "1 NAT Gateway Per AZ (High Availability)",
                  desc: "Eliminates cross-AZ NAT hairpinning, but costs $32.85/mo per AZ in base hourly fees.",
                },
                {
                  id: "fck-nat-instance",
                  title: "fck-nat (EC2 t4g.nano NAT Instance)",
                  desc: "Open-source ARM instance (~$3.06/mo). Completely eliminates AWS $0.045/GB data processing fees.",
                },
              ].map((mode) => (
                <div
                  key={mode.id}
                  onClick={() => setNatDeployMode(mode.id as any)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    natDeployMode === mode.id
                      ? "border-blue-600 bg-blue-50/70 text-blue-950 font-medium ring-1 ring-blue-500"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="font-semibold text-slate-900">{mode.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{mode.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Sliders */}
          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Monthly Public Internet Egress (APIs, Web)</span>
                <span className="text-blue-600 font-mono font-semibold">{internetEgressGB.toLocaleString()} GB</span>
              </div>
              <input
                type="range"
                min="0"
                max="50000"
                step="500"
                value={internetEgressGB}
                onChange={(e) => setInternetEgressGB(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Monthly S3 Data Transfer (Backups, Models, Logs)</span>
                <span className="text-blue-600 font-mono font-semibold">{s3TransferGB.toLocaleString()} GB</span>
              </div>
              <input
                type="range"
                min="0"
                max="50000"
                step="500"
                value={s3TransferGB}
                onChange={(e) => setS3TransferGB(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Checkbox endpoints */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasS3GatewayEndpoint}
                  onChange={(e) => setHasS3GatewayEndpoint(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span>VPC Gateway Endpoint for S3 enabled (100% Free)</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-slate-700 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasEcrInterfaceEndpoint}
                  onChange={(e) => setHasEcrInterfaceEndpoint(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span>VPC Interface Endpoint for ECR enabled ($7.30/mo/AZ)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Output Audit Breakdown */}
        <div className="lg:col-span-6 space-y-6">
          {/* Bill Comparison Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Monthly Billing Audit & Savings</h3>
              <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-100 text-emerald-800">
                ${results.monthlySavings.toLocaleString()}/mo Identified Waste
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-xs text-slate-500">Current AWS Monthly Estimate</div>
                <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">
                  ${results.totalMonthlyCost.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">including base + data processing</div>
              </div>

              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl">
                <div className="text-xs text-emerald-800 font-medium">Optimized Architecture Bill</div>
                <div className="text-2xl font-extrabold font-mono text-emerald-600 mt-1">
                  ${results.optimizedMonthlyCost.toLocaleString()}
                </div>
                <div className="text-[10px] text-emerald-700 mt-0.5">with free endpoints & zero hairpinning</div>
              </div>
            </div>

            {/* Cost Breakdown Items */}
            <div className="space-y-2 text-xs border-t border-slate-100 pt-4">
              <div className="flex justify-between py-1 text-slate-600">
                <span>NAT Gateway Hourly Base Fee:</span>
                <span className="font-mono font-medium text-slate-900">${results.natHourlyFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 text-slate-600">
                <span>NAT Data Processing Fee ($0.045/GB):</span>
                <span className="font-mono font-medium text-rose-600">
                  ${results.natDataProcessingFee.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-1 text-slate-600">
                <span>Internet Egress ($0.09/GB):</span>
                <span className="font-mono font-medium text-slate-900">${results.internetEgressFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 text-slate-600">
                <span>Cross-AZ Inter-Subnet Hairpinning:</span>
                <span className="font-mono font-medium text-amber-600">${results.crossAzFee.toLocaleString()}</span>
              </div>
            </div>

            {/* Findings & Warnings */}
            <div className="space-y-3 pt-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Audit Findings & Traps</h4>
              {results.findings.length === 0 ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Architecture is fully optimized with zero unnecessary NAT data processing fees.</span>
                </div>
              ) : (
                results.findings.map((f, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                      f.severity === "critical"
                        ? "bg-rose-50 border-rose-200 text-rose-950"
                        : "bg-amber-50 border-amber-200 text-amber-950"
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        <span>{f.title}</span>
                      </div>
                      <span className="font-mono text-emerald-700 font-bold">
                        Save ${f.potentialSavings.toLocaleString()}/mo
                      </span>
                    </div>
                    <p className="text-[11px] opacity-90 leading-relaxed">{f.description}</p>
                  </div>
                ))
              )}
            </div>

            {/* Terraform Remediation Snippet */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">1-Click Terraform Remediation</span>
                <button
                  type="button"
                  onClick={handleCopyTf}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  {copiedTf ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copiedTf ? "Copied" : "Copy Code"}
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono overflow-x-auto">
                {results.terraformRecommendation}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
