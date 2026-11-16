"use client";

import { useState } from "react";
import { Copy, Check, Clock } from "lucide-react";

export default function CronExpressionTester() {
  const [expression, setExpression] = useState<string>("*/15 * * * *");
  const [copied, setCopied] = useState<boolean>(false);

  const parseCronDescription = (expr: string) => {
    const parts = expr.trim().split(/\s+/);
    if (parts.length < 5) return "Invalid cron expression (requires 5 fields: minute, hour, day, month, day-of-week)";
    const [min, hour, dom, mon, dow] = parts;

    if (expr === "* * * * *") return "Every minute";
    if (expr === "*/5 * * * *") return "Every 5 minutes";
    if (expr === "*/15 * * * *") return "Every 15 minutes";
    if (expr === "0 * * * *") return "Every hour, on the hour";
    if (expr === "0 0 * * *") return "Every day at midnight (00:00 UTC)";
    if (expr === "0 9 * * 1-5") return "At 09:00 UTC, Monday through Friday";
    if (expr === "0 0 1 * *") return "At 00:00 on the first day of every month";

    return `Minute: ${min}, Hour: ${hour}, Day of Month: ${dom}, Month: ${mon}, Day of Week: ${dow}`;
  };

  const getSimulatedRuns = () => {
    const runs: string[] = [];
    const now = new Date();
    for (let i = 1; i <= 5; i++) {
      const nextDate = new Date(now.getTime() + i * 15 * 60 * 1000);
      runs.push(nextDate.toUTCString());
    }
    return runs;
  };

  const simulatedRuns = getSimulatedRuns();

  const handleCopy = () => {
    navigator.clipboard.writeText(`Cron Expression: ${expression}\nSchedule: ${parseCronDescription(expression)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900 text-base">Cron Evaluator</h3>
            <span className="text-xs text-emerald-700 font-mono font-medium">Standard 5-Field</span>
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-2">
              Expression Input
            </label>
            <input
              type="text"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="*/15 * * * *"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-base font-mono text-blue-600 focus:bg-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-2">
              Quick Presets
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => setExpression("*/5 * * * *")}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors text-left font-mono font-medium"
              >
                Every 5m
              </button>
              <button
                onClick={() => setExpression("0 * * * *")}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors text-left font-mono font-medium"
              >
                Hourly
              </button>
              <button
                onClick={() => setExpression("0 0 * * *")}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors text-left font-mono font-medium"
              >
                Daily (00:00)
              </button>
              <button
                onClick={() => setExpression("0 9 * * 1-5")}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors text-left font-mono font-medium"
              >
                Weekdays (9am)
              </button>
              <button
                onClick={() => setExpression("0 0 1 * *")}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors text-left font-mono font-medium"
              >
                Monthly
              </button>
              <button
                onClick={() => setExpression("*/15 * * * *")}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors text-left font-mono font-medium"
              >
                Every 15m
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/50 shadow-sm">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-semibold block mb-1">
              Human-Readable Meaning
            </span>
            <div className="text-xl font-bold text-slate-900">
              {parseCronDescription(expression)}
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Upcoming Execution Timestamps (Simulated UTC)
              </h4>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-mono font-medium"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <ul className="space-y-2 font-mono text-xs text-slate-700">
              {simulatedRuns.map((r, i) => (
                <li key={i} className="flex items-center gap-2 py-1.5 border-b border-slate-100 last:border-0">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
