"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Brain,
  Layers,
  Database,
  Bot,
  Cloud,
  ArrowRightLeft,
  Globe,
  HardDrive,
  Box,
  Clock,
  Key,
  FileJson,
  Gauge,
  ChevronRight,
} from "lucide-react";

const tools = [
  {
    category: "AI & LLM",
    color: "blue",
    items: [
      {
        name: "vLLM GPU Hardware Profiler",
        href: "/tools/vllm-gpu-hardware-profiler",
        icon: Brain,
        short: "vLLM GPU Sizer ★",
      },
      {
        name: "GPT-4o vs Claude 3.7",
        href: "/tools/gpt-4o-vs-claude-3-7-sonnet-cost",
        icon: ArrowRightLeft,
        short: "GPT-4o vs Claude 3.7",
      },
      {
        name: "DeepSeek R1 vs o1",
        href: "/tools/deepseek-r1-vs-openai-o1-cost",
        icon: Brain,
        short: "DeepSeek R1 vs o1",
      },
      {
        name: "LLM API Cost Calculator",
        href: "/tools/llm-api-cost-calculator",
        icon: Brain,
        short: "LLM Costs",
      },
      {
        name: "Prompt Caching Calculator",
        href: "/tools/prompt-caching-calculator",
        icon: Layers,
        short: "Prompt Caching",
      },
      {
        name: "RAG Embedding Cost",
        href: "/tools/rag-embedding-cost-calculator",
        icon: Database,
        short: "RAG Embedding",
      },
      {
        name: "AI Agent Cost Estimator",
        href: "/tools/ai-agent-cost-estimator",
        icon: Bot,
        short: "AI Agent Cost",
      },
    ],
  },
  {
    category: "Cloud FinOps",
    color: "violet",
    items: [
      {
        name: "AWS NAT Gateway Auditor",
        href: "/tools/aws-nat-gateway-cost-auditor",
        icon: Globe,
        short: "NAT Gateway Audit ★",
      },
      {
        name: "K8s Karpenter Simulator",
        href: "/tools/k8s-karpenter-bin-packing-simulator",
        icon: Box,
        short: "Karpenter Sizing ★",
      },
      {
        name: "Cloud Run vs Lambda",
        href: "/tools/cloud-run-vs-lambda-cost",
        icon: ArrowRightLeft,
        short: "Run vs Lambda",
      },
      {
        name: "Cloud Egress Calculator",
        href: "/tools/cloud-egress-cost-calculator",
        icon: Globe,
        short: "Egress Cost",
      },
      {
        name: "Cloud SQL Storage",
        href: "/tools/cloud-sql-storage-calculator",
        icon: HardDrive,
        short: "SQL Storage",
      },
      {
        name: "K8s Node Bin Packing",
        href: "/tools/k8s-node-bin-packing",
        icon: Box,
        short: "K8s Packing",
      },
    ],
  },
  {
    category: "Developer Utilities",
    color: "emerald",
    items: [
      {
        name: "Cron Expression Tester",
        href: "/tools/cron-expression-tester",
        icon: Clock,
        short: "Cron Tester",
      },
      {
        name: "JWT Decoder & Inspector",
        href: "/tools/jwt-decoder-inspector",
        icon: Key,
        short: "JWT Decoder",
      },
      {
        name: "JSON Payload Size",
        href: "/tools/json-payload-size-calculator",
        icon: FileJson,
        short: "JSON Size",
      },
      {
        name: "API Rate Limit Calculator",
        href: "/tools/api-rate-limit-calculator",
        icon: Gauge,
        short: "Rate Limits",
      },
    ],
  },
];

const colorMap: Record<string, { bg: string; text: string; dot: string; activeBg: string; activeText: string; activeBorder: string }> = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-400",
    activeBg: "bg-blue-50",
    activeText: "text-blue-700",
    activeBorder: "border-blue-500",
  },
  violet: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    dot: "bg-violet-400",
    activeBg: "bg-violet-50",
    activeText: "text-violet-700",
    activeBorder: "border-violet-500",
  },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-400",
    activeBg: "bg-emerald-50",
    activeText: "text-emerald-700",
    activeBorder: "border-emerald-500",
  },
};

export default function ToolSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-56 xl:w-64 shrink-0">
      {/* Sticky container */}
      <div className="sticky top-6 flex flex-col gap-5 max-h-[calc(100vh-3rem)] overflow-y-auto pr-1 pb-6">
        {/* Back to all tools */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors group"
        >
          <ChevronRight className="h-3 w-3 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
          All Tools
        </Link>

        {tools.map((section) => {
          const colors = colorMap[section.color];
          return (
            <div key={section.category}>
              {/* Category label */}
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-1">
                {section.category}
              </p>

              <ul className="flex flex-col gap-0.5">
                {section.items.map((tool) => {
                  const Icon = tool.icon;
                  const isActive = pathname === tool.href;

                  return (
                    <li key={tool.href}>
                      <Link
                        href={tool.href}
                        className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all border ${
                          isActive
                            ? `${colors.activeBg} ${colors.activeText} ${colors.activeBorder} border`
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-transparent"
                        }`}
                      >
                        <Icon
                          className={`h-3.5 w-3.5 shrink-0 ${
                            isActive ? colors.activeText : "text-slate-400"
                          }`}
                        />
                        <span className="truncate">{tool.short}</span>
                        {isActive && (
                          <span
                            className={`ml-auto h-1.5 w-1.5 rounded-full shrink-0 ${colors.dot}`}
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        {/* Footer spacing */}
        <div className="mt-auto pt-2" />
      </div>
    </aside>
  );
}
