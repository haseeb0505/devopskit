"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  Terminal,
  Cpu,
  Cloud,
  ShieldCheck,
  ChevronDown,
  Layers,
  Sparkles,
  TrendingDown,
  Server,
  Network,
  Database,
  Lock,
  Clock,
  Zap,
  ArrowRightLeft,
  Box,
  Brain,
  Globe,
} from "lucide-react";

export default function Navbar() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toolCategories = [
    {
      name: "AI & LLM Economics",
      icon: Cpu,
      color: "text-blue-600",
      bg: "bg-blue-50",
      tools: [
        {
          name: "vLLM GPU Profiler ★",
          href: "/tools/vllm-gpu-hardware-profiler",
          desc: "VRAM, KV cache & cluster sizing",
          icon: Cpu,
        },
        {
          name: "GPT-4o vs Claude 3.7",
          href: "/tools/gpt-4o-vs-claude-3-7-sonnet-cost",
          desc: "Prompt caching discount crossover",
          icon: ArrowRightLeft,
        },
        {
          name: "DeepSeek R1 vs OpenAI o1",
          href: "/tools/deepseek-r1-vs-openai-o1-cost",
          desc: "Reasoning & thinking token pricing",
          icon: Brain,
        },
        {
          name: "LLM API Cost Calculator",
          href: "/tools/llm-api-cost-calculator",
          desc: "Compare GPT-4o, Gemini 2.5, Claude 3.7",
          icon: Cpu,
        },
        {
          name: "Prompt Caching Calculator",
          href: "/tools/prompt-caching-calculator",
          desc: "Model KV cache hit rates & monthly savings",
          icon: TrendingDown,
        },
        {
          name: "RAG Embedding Sizer",
          href: "/tools/rag-embedding-cost-calculator",
          desc: "Vector dimension storage & RAM math",
          icon: Layers,
        },
        {
          name: "AI Agent Loop Estimator",
          href: "/tools/ai-agent-cost-estimator",
          desc: "Multi-turn context window compounding",
          icon: Sparkles,
        },
      ],
    },
    {
      name: "Cloud FinOps",
      icon: Cloud,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      tools: [
        {
          name: "AWS NAT Gateway Auditor ★",
          href: "/tools/aws-nat-gateway-cost-auditor",
          desc: "S3 endpoint traps, cross-AZ & fck-nat",
          icon: Network,
        },
        {
          name: "K8s Karpenter Simulator ★",
          href: "/tools/k8s-karpenter-bin-packing-simulator",
          desc: "2D bin-packing & DaemonSet tax simulation",
          icon: Box,
        },
        {
          name: "Cloud Run vs AWS Lambda",
          href: "/tools/cloud-run-vs-lambda-cost",
          desc: "Serverless concurrency & free tiers",
          icon: Server,
        },
        {
          name: "Cloud Egress Calculator",
          href: "/tools/cloud-egress-cost-calculator",
          desc: "AWS, GCP & Azure bandwidth vs CDN",
          icon: Globe,
        },
        {
          name: "Postgres Storage Projection",
          href: "/tools/cloud-sql-storage-calculator",
          desc: "12-month disk growth & HA backup costs",
          icon: Database,
        },
        {
          name: "K8s Node Bin-Packing",
          href: "/tools/k8s-node-bin-packing",
          desc: "Optimize pod requests & eliminate waste",
          icon: Cloud,
        },
      ],
    },
    {
      name: "Developer Utilities",
      icon: Terminal,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      tools: [
        {
          name: "Cron Expression Tester",
          href: "/tools/cron-expression-tester",
          desc: "5-field schedule evaluator & next runs",
          icon: Clock,
        },
        {
          name: "JWT Decoder & Inspector",
          href: "/tools/jwt-decoder-inspector",
          desc: "100% in-browser safe claim parsing",
          icon: Lock,
        },
        {
          name: "JSON Payload Size Calculator",
          href: "/tools/json-payload-size-calculator",
          desc: "Raw, minified, Gzip & LLM token count",
          icon: Terminal,
        },
        {
          name: "API Rate Limit & Burst",
          href: "/tools/api-rate-limit-calculator",
          desc: "Token bucket capacity & Little's Law",
          icon: Zap,
        },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors shadow-2xs">
            <Terminal className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              {siteConfig.shortName}
            </span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
              FinOps & Tools Hub
            </span>
          </div>
        </Link>

        {/* Navigation with Tools Dropdown */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {/* Interactive Tools Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              onMouseEnter={() => setToolsOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                toolsOpen
                  ? "bg-slate-100 text-blue-600 font-semibold"
                  : "hover:text-blue-600 hover:bg-slate-50"
              }`}
              aria-expanded={toolsOpen}
            >
              <span>All Calculators</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  toolsOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                }`}
              />
            </button>

            {/* Mega Dropdown Menu */}
            {toolsOpen && (
              <div
                onMouseLeave={() => setToolsOpen(false)}
                className="absolute left-1/2 -translate-x-1/2 mt-2 w-[820px] rounded-2xl bg-white border border-slate-200 shadow-xl p-5 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-150 z-50 max-h-[85vh] overflow-y-auto"
              >
                {toolCategories.map((category) => (
                  <div key={category.name} className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      <div className={`p-1.5 rounded-md ${category.bg} ${category.color}`}>
                        <category.icon className="h-4 w-4" />
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                        {category.name}
                      </h4>
                    </div>

                    <ul className="space-y-1">
                      {category.tools.map((tool) => (
                        <li key={tool.href}>
                          <Link
                            href={tool.href}
                            onClick={() => setToolsOpen(false)}
                            className="group/item flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            <tool.icon className="h-4 w-4 text-slate-400 group-hover/item:text-blue-600 shrink-0 mt-0.5" />
                            <div>
                              <div className="text-xs font-semibold text-slate-800 group-hover/item:text-blue-600 transition-colors">
                                {tool.name}
                              </div>
                              <div className="text-[11px] text-slate-500 line-clamp-1">
                                {tool.desc}
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/#ai-calculators"
            className="hover:text-blue-600 transition-colors"
          >
            AI & LLM
          </Link>
          <Link
            href="/#cloud-finops"
            className="hover:text-blue-600 transition-colors"
          >
            Cloud FinOps
          </Link>
          <Link
            href="/#developer-utilities"
            className="hover:text-blue-600 transition-colors"
          >
            Dev Utilities
          </Link>
          <Link
            href="/about"
            className="hover:text-slate-900 transition-colors text-slate-500"
          >
            About
          </Link>
        </nav>

        {/* Client-Side Privacy Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-medium shadow-2xs">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>100% Client-Side</span>
          </div>
        </div>
      </div>
    </header>
  );
}
