import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { AlertTriangle, CheckCircle, Scale, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service & Cost Estimation Disclaimer",
  description:
    "Terms of service, usage guidelines, and financial estimation disclaimers for DevOpsKit tools.",
};

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-8 mb-10">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 font-mono mb-4 inline-block shadow-2xs">
            Last Updated: March 2026
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Please read these Terms of Service carefully before utilizing the
            tools and calculators provided by {siteConfig.shortName}.
          </p>
        </div>

        <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Scale className="h-5 w-5 text-blue-600" />
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using {siteConfig.domain}, you agree to be bound
              by these Terms of Service and all applicable laws and regulations.
              If you do not agree with any of these terms, you are prohibited
              from using or accessing this site.
            </p>
          </section>

          <section className="space-y-3 p-6 rounded-2xl border border-amber-300 bg-amber-50/60 shadow-sm">
            <h2 className="text-xl font-bold text-amber-900 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              2. Financial &amp; Cost Estimation Disclaimer (Important)
            </h2>
            <p className="text-amber-900 font-medium">
              All calculations, cost comparisons, pricing projections, and
              capacity estimates provided on this website are for informational,
              planning, and educational purposes only.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-amber-950 text-xs">
              <li>
                Cloud hyperscalers (AWS, Google Cloud, Microsoft Azure) and AI
                providers (OpenAI, Google Gemini, Anthropic) update pricing
                structures, billing tiers, free-tier thresholds, and regional
                rates without notice.
              </li>
              <li>
                Actual cloud bills may incur ancillary fees not modeled in
                simplified formulas (including VPC interconnects, NAT gateway
                processing, cross-AZ traffic, disk snapshots, and enterprise
                support contracts).
              </li>
              <li>
                You must verify current pricing directly with official vendor
                pricing documentation before making production commitments.
                DevOpsKit accepts no liability for billing discrepancies.
              </li>
            </ul>
          </section>

          <section className="space-y-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              3. Permitted Use &amp; Intellectual Property
            </h2>
            <p>
              DevOpsKit grants you a personal, non-exclusive, royalty-free
              license to use the interactive calculators and copy output
              breakdowns for personal, educational, or commercial architectural
              planning.
            </p>
            <p>
              Automated scraping, bulk harvesting of our original written
              technical guides, or attempting to cause denial of service to our
              infrastructure is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-600" />
              4. Governing Law
            </h2>
            <p>
              Any claim relating to {siteConfig.shortName} shall be governed by
              general principles of international commercial law and applicable
              local statutes without regard to conflict of law provisions.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
