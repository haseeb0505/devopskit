import Link from "next/link";
import {
  Cpu,
  Cloud,
  Terminal,
  Zap,
  ShieldCheck,
  ArrowRight,
  TrendingDown,
  Layers,
  Database,
  Lock,
  Clock,
  Sparkles,
  Server,
  Network,
} from "lucide-react";

export default function HomePage() {
  const aiTools = [
    {
      title: "LLM API Cost Calculator",
      slug: "llm-api-cost-calculator",
      description:
        "Compare daily, monthly, and annual token costs across OpenAI (GPT-4o, o3-mini), Gemini 2.5 Flash, and Claude 3.7.",
      icon: Cpu,
      badge: "Real-Time Multi-Model",
      highlight: "Save up to 80% on token selection",
    },
    {
      title: "Prompt Caching Calculator",
      slug: "prompt-caching-calculator",
      description:
        "Model cache hit rates, system prompt reuse, and calculate exact break-even ROI on provider prompt caching.",
      icon: TrendingDown,
      badge: "Cache ROI Engine",
      highlight: "Up to 90% input discount modeling",
    },
    {
      title: "RAG Embedding Cost Calculator",
      slug: "rag-embedding-cost-calculator",
      description:
        "Calculate token consumption, chunking overhead, and vector memory footprint (HNSW / Float32) for RAG pipelines.",
      icon: Layers,
      badge: "Chunk & Memory Estimator",
      highlight: "Dimension & storage planner",
    },
    {
      title: "AI Agent Cost Estimator",
      slug: "ai-agent-cost-estimator",
      description:
        "Simulate multi-turn autonomous agent loops, context window compounding, and worst-case runaway costs.",
      icon: Sparkles,
      badge: "Multi-Turn Loop Simulator",
      highlight: "Context compounding model",
    },
  ];

  const cloudTools = [
    {
      title: "Cloud Run vs AWS Lambda",
      slug: "cloud-run-vs-lambda-cost",
      description:
        "Side-by-side serverless compute cost comparison factoring in concurrency, vCPU seconds, and official free tiers.",
      icon: Server,
      badge: "Free-Tier Factored",
      highlight: "Concurrency impact analysis",
    },
    {
      title: "Cloud Egress Cost Calculator",
      slug: "cloud-egress-cost-calculator",
      description:
        "Model standard internet egress across AWS, GCP, and Azure vs. Cloudflare CDN and zero-egress R2 storage.",
      icon: Network,
      badge: "CDN Arbitrage",
      highlight: "Bandwidth Alliance savings",
    },
    {
      title: "Managed Postgres Storage Calculator",
      slug: "cloud-sql-storage-calculator",
      description:
        "Forecast 12-month disk growth, WAL backup retention footprints, and HA multi-zone replication storage bills.",
      icon: Database,
      badge: "12-Month Projection",
      highlight: "Backup retention math",
    },
    {
      title: "Kubernetes Node Bin-Packing",
      slug: "k8s-node-bin-packing",
      description:
        "Optimize cluster nodes by packing pod requests, accounting for DaemonSet/kube-system overhead and wasted capacity.",
      icon: Cloud,
      badge: "Cluster Efficiency",
      highlight: "Eliminate idle node waste",
    },
  ];

  const devTools = [
    {
      title: "Cron Expression Tester",
      slug: "cron-expression-tester",
      description:
        "Evaluate 5-field and 6-field cron expressions instantly with human-readable breakdowns and next 10 runs.",
      icon: Clock,
      badge: "Zero-Latency Evaluator",
      highlight: "Timezone-aware scheduling",
    },
    {
      title: "JWT Token Decoder & Inspector",
      slug: "jwt-decoder-inspector",
      description:
        "Parse JWT headers, claims, expiration countdown, and byte size 100% locally in the browser with zero leak risk.",
      icon: Lock,
      badge: "100% Client-Side Safe",
      highlight: "No server transmission",
    },
    {
      title: "JSON Payload Size Calculator",
      slug: "json-payload-size-calculator",
      description:
        "Measure raw bytes, minified footprint, estimated Gzip compression, and approximate LLM token count for any JSON.",
      icon: Terminal,
      badge: "Compression & Tokens",
      highlight: "Payload budget optimization",
    },
    {
      title: "API Rate Limit & Burst Calculator",
      slug: "api-rate-limit-calculator",
      description:
        "Calculate token bucket capacities, refill rates, and retry backoff headroom from target RPS and P95 latencies.",
      icon: Zap,
      badge: "Token-Bucket Sizer",
      highlight: "Concurrency & burst planning",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-medium mb-6 shadow-2xs">
            <Zap className="h-3.5 w-3.5 text-blue-600" />
            <span>12 High-Utility Cloud FinOps & AI Calculators</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight sm:leading-tight">
            Stop Guessing Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Cloud & AI Bills
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Free, fast, 100% client-side developer calculators. Model token
            economics, serverless concurrency, egress bandwidth, and cluster
            efficiency with zero logins and zero server tracking.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-600">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Zero Server Telemetry</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
              <Cpu className="h-4 w-4 text-blue-600" />
              <span>Verified 2026 Rate Cards</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
              <Zap className="h-4 w-4 text-amber-600" />
              <span>Instant Client Math</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tools Catalog */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Category 1: AI & LLM */}
        <section id="ai-calculators" className="scroll-mt-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="h-5 w-5 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  AI &amp; LLM Token Economics
                </h2>
              </div>
              <p className="text-sm text-slate-600">
                Optimize token consumption, prompt caching, and RAG vector costs
                across modern models.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors shadow-2xs">
                      <tool.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {tool.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-blue-600 font-medium">{tool.highlight}</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold whitespace-nowrap shadow-xs group-hover:bg-blue-700 transition-colors">
                    Open Tool <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Category 2: Cloud FinOps */}
        <section id="cloud-finops" className="scroll-mt-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Cloud className="h-5 w-5 text-indigo-600" />
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Cloud FinOps &amp; Infrastructure
                </h2>
              </div>
              <p className="text-sm text-slate-600">
                Model compute, bandwidth egress, database growth, and Kubernetes
                cluster allocation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cloudTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-100 transition-colors shadow-2xs">
                      <tool.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {tool.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-indigo-600 font-medium">{tool.highlight}</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold whitespace-nowrap shadow-xs group-hover:bg-indigo-700 transition-colors">
                    Open Tool <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Category 3: Developer Utilities */}
        <section id="developer-utilities" className="scroll-mt-20">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Terminal className="h-5 w-5 text-emerald-600" />
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Developer &amp; Backend Utilities
                </h2>
              </div>
              <p className="text-sm text-slate-600">
                Essential inspection tools running strictly in-browser without
                sending payloads over the wire.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {devTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group p-6 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors shadow-2xs">
                      <tool.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {tool.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-600 font-medium">{tool.highlight}</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold whitespace-nowrap shadow-xs group-hover:bg-emerald-700 transition-colors">
                    Open Tool <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
