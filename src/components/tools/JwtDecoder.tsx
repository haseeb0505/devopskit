"use client";

import { useState, useSyncExternalStore } from "react";
import { Copy, Check, ShieldCheck } from "lucide-react";

function subscribe(callback: () => void) {
  const timer = setInterval(callback, 1000);
  return () => clearInterval(timer);
}
function getSnapshot() {
  return Math.floor(Date.now() / 1000);
}
function getServerSnapshot() {
  return 0;
}

export default function JwtDecoder() {
  const [jwtString, setJwtString] = useState<string>(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggRGV2T3BzIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTYyMzkwMjIsInJvbGVzIjpbImFkbWluIiwiZW5naW5lZXIiXX0.4pcPyMD09olUV_AlFac2sQWjhEdm10_dHKL3FMa5d-4"
  );
  const [copied, setCopied] = useState<boolean>(false);
  const nowTimestamp = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const decodeJwtPart = (str: string) => {
    try {
      let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
      while (base64.length % 4) {
        base64 += "=";
      }
      const json = atob(base64);
      return JSON.parse(json);
    } catch {
      return null;
    }
  };

  const parts = jwtString.trim().split(".");
  const headerObj = parts.length > 0 ? decodeJwtPart(parts[0]) : null;
  const payloadObj = parts.length > 1 ? decodeJwtPart(parts[1]) : null;

  const expTimestamp = payloadObj?.exp ? Number(payloadObj.exp) : null;
  const isExpired = expTimestamp && nowTimestamp > 0 ? nowTimestamp > expTimestamp : false;

  const handleCopy = () => {
    navigator.clipboard.writeText(
      JSON.stringify({ header: headerObj, payload: payloadObj }, null, 2)
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 flex items-center gap-3 text-xs text-emerald-800 shadow-2xs">
        <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />
        <span>
          <strong>100% In-Browser Privacy:</strong> Your JSON Web Token is parsed purely using client-side JavaScript (<code className="font-mono">atob</code>). It is never sent over any network socket.
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-500 block">
            Paste Encoded JWT
          </label>
          <span className="text-xs text-slate-400 font-mono">Real-world Samples</span>
        </div>

        {/* 1-Click Startup Archetypes */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => {
              setJwtString(
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3JfMGExYjJjM2QiLCJuYW1lIjoiQWxleCBFbmc8ZW5nQGNvbXBhbnkuaW8+IiwiY29tcGFueV9pZCI6Im9yZ185OGY3ZTYiLCJyb2xlcyI6WyJkZXZvcHMiLCJhZG1pbiJdLCJpYXQiOjE3NDIzOTYwMDAsImV4cCI6MTg0MjM5NjAwMH0.c4aY6d8f8e8b"
              );
            }}
            className="px-2.5 py-2 text-left rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-xs"
          >
            <div className="font-semibold text-slate-800">OAuth Access Token</div>
            <div className="text-[10px] text-slate-500">Roles • Valid Exp</div>
          </button>
          <button
            type="button"
            onClick={() => {
              setJwtString(
                "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFhMmIzYyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbXktcHJvaiIsImF1ZCI6Im15LXByb2oiLCJhdXRoX3RpbWUiOjE3MTYyMzkwMjIsIl9pZCI6InVzZXJfODgyMSIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxNTE2MjQwMDIyfQ.sample"
              );
            }}
            className="px-2.5 py-2 text-left rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-xs"
          >
            <div className="font-semibold text-slate-800">Expired Token</div>
            <div className="text-[10px] text-slate-500">Notice Expired Warning</div>
          </button>
          <button
            type="button"
            onClick={() => {
              setJwtString(
                "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdmNfYXBpX2dhdGV3YXkiLCJpc3MiOiJhdXRoMC5jb20iLCJzY29wZSI6InJlYWQ6ZGF0YSB3cml0ZTpjbG91ZCBkZWxldGU6cmVzb3VyY2UiLCJpYXQiOjE3NDIzOTYwMDAsImV4cCI6MTk0MjM5NjAwMH0.sample"
              );
            }}
            className="px-2.5 py-2 text-left rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-xs"
          >
            <div className="font-semibold text-slate-800">Service Account M2M</div>
            <div className="text-[10px] text-slate-500">Scoped API Claims</div>
          </button>
        </div>

        <textarea
          rows={6}
          value={jwtString}
          onChange={(e) => setJwtString(e.target.value)}
          placeholder="eyJhbGciOi..."
          className="w-full min-h-[140px] bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-xs text-sky-300 focus:outline-none focus:border-blue-500 leading-relaxed shadow-xs resize-y"
        />
      </div>

      {/* Header, Payload, Signature */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="text-xs font-mono uppercase tracking-wider text-red-600 font-semibold">
              Header (Algorithm &amp; Type)
            </h4>
            <span className="text-[11px] text-slate-400 font-mono">
              {parts[0] ? `${parts[0].length} chars` : ""}
            </span>
          </div>
          <pre className="font-mono text-xs text-slate-800 bg-slate-50 border border-slate-200 p-4 rounded-xl overflow-x-auto">
            {headerObj ? JSON.stringify(headerObj, null, 2) : "Invalid Header"}
          </pre>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-600 font-semibold">
              Payload Claims
            </h4>
            <div className="flex items-center gap-2">
              {expTimestamp && (
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-medium ${
                    isExpired
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}
                >
                  {isExpired ? "Token Expired" : "Token Active"}
                </span>
              )}
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-700 font-mono font-medium"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
          <pre className="font-mono text-xs text-slate-800 bg-slate-50 border border-slate-200 p-4 rounded-xl overflow-x-auto">
            {payloadObj ? JSON.stringify(payloadObj, null, 2) : "Invalid Payload"}
          </pre>
        </div>
      </div>
    </div>
  );
}
