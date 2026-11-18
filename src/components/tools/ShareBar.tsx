"use client";

import { useState } from "react";
import { Link2, Check, MessageSquare } from "lucide-react";

interface ShareBarProps {
  /** Title of the calculation/tool */
  title: string;
  /** Markdown formatted string ready to paste into Slack or a PR description */
  markdownSnippet: string;
}

export default function ShareBar({ title, markdownSnippet }: ShareBarProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleCopyMarkdown = async () => {
    try {
      const fullSnippet = `${markdownSnippet}\n\n*Calculated via [DevOpsKit](${window.location.href})*`;
      await navigator.clipboard.writeText(fullSnippet);
      setCopiedMarkdown(true);
      setTimeout(() => setCopiedMarkdown(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-900 text-slate-100 rounded-xl shadow-sm text-xs font-sans">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-medium text-slate-300">
          Share or export this {title}:
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          title="Copies the exact URL with your inputs"
        >
          {copiedLink ? (
            <Check className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <Link2 className="h-3.5 w-3.5 text-slate-400" />
          )}
          <span>{copiedLink ? "Link Copied!" : "Copy Link"}</span>
        </button>

        <button
          type="button"
          onClick={handleCopyMarkdown}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors shadow-2xs"
          title="Copies markdown table formatted for Slack, Discord, or GitHub PR description"
        >
          {copiedMarkdown ? (
            <Check className="h-3.5 w-3.5 text-white" />
          ) : (
            <MessageSquare className="h-3.5 w-3.5 text-blue-200" />
          )}
          <span>{copiedMarkdown ? "Copied for Slack/PR!" : "Copy for Slack / PR"}</span>
        </button>
      </div>
    </div>
  );
}
