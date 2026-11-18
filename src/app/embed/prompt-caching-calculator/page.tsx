import type { Metadata } from "next";
import PromptCachingCalculator from "@/components/tools/PromptCachingCalculator";

export const metadata: Metadata = {
  title: "Embed: Prompt Caching Calculator | DevOpsKit",
  robots: {
    index: false,
    follow: true,
  },
};

export default function EmbedPromptCachingPage() {
  return (
    <div className="p-4 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-900 text-sm tracking-tight">
              DevOpsKit
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-semibold">
              Live Calculator
            </span>
          </div>
          <a
            href="https://devopskit.tools/tools/prompt-caching-calculator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline font-medium"
          >
            Open Full Version ↗
          </a>
        </div>
        <PromptCachingCalculator />
      </div>
    </div>
  );
}
