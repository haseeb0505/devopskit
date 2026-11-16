import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Shield } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200/90 bg-white text-slate-600 py-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-base">
                {siteConfig.shortName}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-mono font-medium">
                v1.0
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Transparent, client-side Cloud FinOps and AI token economics
              calculators. Calculate architecture costs instantly without
              telemetry or tracking.
            </p>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold text-xs tracking-wider uppercase mb-3 font-mono">
              AI & LLM Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/tools/llm-api-cost-calculator"
                  className="hover:text-blue-600 transition-colors"
                >
                  LLM API Cost Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/prompt-caching-calculator"
                  className="hover:text-blue-600 transition-colors"
                >
                  Prompt Caching Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/rag-embedding-cost-calculator"
                  className="hover:text-blue-600 transition-colors"
                >
                  RAG Embedding Cost
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/ai-agent-cost-estimator"
                  className="hover:text-blue-600 transition-colors"
                >
                  AI Agent Loop Estimator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold text-xs tracking-wider uppercase mb-3 font-mono">
              Cloud & FinOps
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/tools/cloud-run-vs-lambda-cost"
                  className="hover:text-blue-600 transition-colors"
                >
                  Cloud Run vs AWS Lambda
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/cloud-egress-cost-calculator"
                  className="hover:text-blue-600 transition-colors"
                >
                  Cloud Egress & CDN Savings
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/cloud-sql-storage-calculator"
                  className="hover:text-blue-600 transition-colors"
                >
                  Managed Postgres Storage
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/k8s-node-bin-packing"
                  className="hover:text-blue-600 transition-colors"
                >
                  K8s Node Bin-Packing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold text-xs tracking-wider uppercase mb-3 font-mono">
              Legal & Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-600 transition-colors"
                >
                  About {siteConfig.shortName}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-600 transition-colors"
                >
                  Contact & Feedback
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-blue-600 transition-colors"
                >
                  Terms of Service & Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <Shield className="h-3.5 w-3.5 text-emerald-600" />
            <span>Zero server storage. Zero data collection. Pure client-side calculations.</span>
          </div>
          <p className="text-slate-500">
            © {currentYear} {siteConfig.shortName}. All calculations are estimates based on public provider rate cards.
          </p>
        </div>
      </div>
    </footer>
  );
}
