import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Shield, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Mission & Architecture",
  description:
    "Learn about DevOpsKit, our privacy-first mission, and why our Cloud FinOps & AI engineering calculators run 100% client-side in your browser.",
};

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-8 mb-10">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 font-mono mb-4 inline-block shadow-2xs">
            Our Mission & Philosophy
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Democratizing Cloud FinOps & AI Token Economics
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            DevOpsKit was created to solve a modern engineering dilemma: cloud
            and AI bills are volatile, pricing models are deliberately opaque,
            and most existing calculators require logging in, selling your data,
            or paying for bloated enterprise SaaS.
          </p>
        </div>

        <div className="space-y-10 text-slate-700 leading-relaxed">
          <section className="space-y-4 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Shield className="h-6 w-6 text-emerald-600" />
              1. The 100% Client-Side Privacy Promise
            </h2>
            <p>
              When evaluating infrastructure budgets, you frequently paste
              internal parameters: system prompts, monthly active user metrics,
              JWT signatures, or proprietary RAG document estimates.
            </p>
            <p>
              Every single calculator on <strong className="text-slate-900">DevOpsKit</strong> executes
              entirely in your local browser runtime via Web APIs and pure
              JavaScript math. We maintain <span className="text-emerald-700 font-semibold">zero databases</span>,
              collect <span className="text-emerald-700 font-semibold">zero telemetry on your inputs</span>, and never transmit your architecture parameters to remote servers.
            </p>
          </section>

          <section className="space-y-4 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              2. Verified Pricing & Transparent Formulas
            </h2>
            <p>
              All rates across OpenAI, Google Gemini, Anthropic, AWS Lambda,
              Google Cloud Run, and Cloudflare are maintained in a centralized,
              version-controlled dataset. Rather than hiding pricing behind
              proprietary scoring algorithms, each calculator displays:
            </p>
            <ul className="space-y-2 list-none pl-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <span>Exact baseline cost equations (input tokens, cached tokens, reasoning step accumulation).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <span>Provider-specific free tier allowances subtracted dynamically before billing.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <span>Actionable optimization guides for prompt caching, token buckets, and bin-packing.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-4 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              3. Who Maintains DevOpsKit?
            </h2>
            <p>
              DevOpsKit is maintained by practicing cloud infrastructure and AI
              engineers passionate about open-access developer tooling. Our goal
              is to maintain lightning-fast, zero-bloat static utilities that you
              can bookmark and consult during architecture design reviews, sprint
              planning, and monthly billing audits.
            </p>
          </section>

          <div className="p-6 rounded-2xl border border-blue-200 bg-blue-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
            <div>
              <h3 className="font-semibold text-slate-900 text-base">Have suggestions or found a pricing update?</h3>
              <p className="text-sm text-slate-600 mt-1">We welcome provider pricing rate card corrections from the community.</p>
            </div>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shrink-0 shadow-xs"
            >
              Contact Maintainers
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
