"use client";

import { useState } from "react";
import { calculateCloudSql, CloudSqlResult } from "@/lib/calculators";
import { Copy, Check } from "lucide-react";

export default function CloudSqlStorageCalculator() {
  const [initialStorageGB, setInitialStorageGB] = useState<number>(200);
  const [monthlyGrowthGB, setMonthlyGrowthGB] = useState<number>(25);
  const [backupRetentionDays, setBackupRetentionDays] = useState<number>(14);
  const [highAvailability, setHighAvailability] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const result: CloudSqlResult = calculateCloudSql({
    initialStorageGB,
    monthlyGrowthGB,
    backupRetentionDays,
    highAvailability,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `DevOpsKit Managed Postgres Storage Projection:\nInitial: ${initialStorageGB} GB (+${monthlyGrowthGB} GB/mo)\nBackups: ${backupRetentionDays} days\nHigh Availability: ${highAvailability ? "Yes (2x disk)" : "No"}\nMonth 1: $${result.month1Cost.toFixed(2)}\nMonth 12: $${result.month12Cost.toFixed(2)} (${result.storageGBAtMonth12} GB storage + ${result.backupGBAtMonth12.toFixed(0)} GB backup)\nYear 1 Total Spend: $${result.year1TotalCost.toFixed(2)}`
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
            <h3 className="font-semibold text-slate-900 text-base">Database Sizing</h3>
            <span className="text-xs text-indigo-600 font-mono font-medium">Postgres / MySQL</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Initial Database Storage</span>
                <span className="text-blue-600 font-mono font-semibold">{initialStorageGB} GB</span>
              </div>
              <input
                type="range"
                min="10"
                max="5000"
                step="10"
                value={initialStorageGB}
                onChange={(e) => setInitialStorageGB(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Monthly Data Growth</span>
                <span className="text-indigo-600 font-mono font-semibold">+{monthlyGrowthGB} GB/mo</span>
              </div>
              <input
                type="range"
                min="1"
                max="500"
                step="5"
                value={monthlyGrowthGB}
                onChange={(e) => setMonthlyGrowthGB(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-700 font-medium">Backup Retention Days</span>
                <span className="text-emerald-700 font-mono font-semibold">{backupRetentionDays} days</span>
              </div>
              <input
                type="range"
                min="1"
                max="35"
                step="1"
                value={backupRetentionDays}
                onChange={(e) => setBackupRetentionDays(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={highAvailability}
                  onChange={(e) => setHighAvailability(e.target.checked)}
                  className="rounded bg-slate-100 border-slate-300 text-blue-600 focus:ring-0 h-4 w-4"
                />
                <span className="text-xs text-slate-800 font-medium">
                  High Availability (HA Multi-Zone Synchronous Storage Mirroring)
                </span>
              </label>
              <span className="text-[11px] text-slate-500 block mt-1 pl-6">
                Doubles provisioned storage capacity across standby zones
              </span>
            </div>
          </div>
        </div>

        {/* Readouts */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 text-base">Storage Cost Trajectory</h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-mono font-medium transition-colors shadow-2xs"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied!" : "Copy Projection"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
              <span className="text-xs font-mono text-slate-500 block mb-1">Month 1 Storage Bill</span>
              <div className="text-2xl font-bold text-slate-900 font-mono">
                ${result.month1Cost.toFixed(2)}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {initialStorageGB} GB primary + backups
              </span>
            </div>

            <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/50 shadow-sm">
              <span className="text-xs font-mono text-blue-700 font-semibold block mb-1">Month 12 Storage Bill</span>
              <div className="text-2xl font-bold text-blue-700 font-mono">
                ${result.month12Cost.toFixed(2)}
              </div>
              <span className="text-[11px] text-blue-900 mt-1 block">
                {result.storageGBAtMonth12} GB primary + {result.backupGBAtMonth12.toFixed(0)} GB backups
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-indigo-200 bg-indigo-50/50 shadow-sm">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-700 font-semibold block mb-1">
              12-Month Cumulative Storage Spend
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono">
              ${result.year1TotalCost.toFixed(2)}
            </div>
            <p className="text-xs text-indigo-950 mt-2">
              Includes base SSD block storage, HA multi-zone replication, and automated WAL snapshot retention.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
