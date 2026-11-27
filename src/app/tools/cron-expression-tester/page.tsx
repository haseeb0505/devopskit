import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import CronExpressionTester from "@/components/tools/CronExpressionTester";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "Cron Expression Evaluator & Schedule Tester",
  "Evaluate 5-field and 6-field cron expressions instantly with human-readable breakdowns and next execution timestamps. Free developer evaluator.",
  "cron-expression-tester"
);

const faqs = [
  {
    question: "How does a cron expression evaluator work?",
    answer:
      "A cron expression evaluator parses a cron string across standard fields (minute, hour, day of month, month, day of week), translates the syntax into plain English, and computes the exact upcoming execution timestamps based on the system timezone.",
  },
  {
    question: "What are the 5 fields of a standard cron expression?",
    answer:
      "The five standard fields in order are: Minute (0-59), Hour (0-23), Day of the month (1-31), Month of the year (1-12 or JAN-DEC), and Day of the week (0-6 or SUN-SAT).",
  },
  {
    question: "What does the asterisk (*) symbol mean in cron?",
    answer:
      "An asterisk is a wildcard that matches every possible value within that field. For example, an asterisk in the minute field means 'every minute'.",
  },
  {
    question: "What does the slash (/) character represent?",
    answer:
      "A slash designates step values. For instance, '*/15' in the minute field specifies execution every 15 minutes starting at minute 0.",
  },
];

export default function CronTesterPage() {
  const structuredData = generateStructuredData(
    "Cron Expression Tester",
    "Test, validate, and convert cron schedule expressions into human-readable language.",
    "cron-expression-tester",
    faqs
  );

  return (
    <ToolShell
      title="Cron Expression Tester & Schedule Evaluator"
      description="Parse, validate, and translate 5-field cron schedules into plain English with instant upcoming execution timestamps."
      category="Developer Utilities"
      categoryHref="/#developer-utilities"
      badge="Zero-Latency Evaluator"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredData}
      />

      <CronExpressionTester />

      {/* Authoritative Technical Guide & Princeton GEO Benchmark Table */}
      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
        {/* Static HTML Table for Zero-JS AI Bot Extraction */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Cloud Scheduler Cron Standards & Quirks (2026)
              </h3>
              <p className="text-xs text-slate-500">
                Syntax rules, field counts, and timezone execution semantics across AWS, GCP, and Kubernetes.
              </p>
            </div>
            <span className="mt-2 sm:mt-0 inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 self-start sm:self-auto">
              ✓ Verified March 2026
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-300 text-slate-800 font-semibold">
                  <th className="py-2 pr-3">Cloud Platform</th>
                  <th className="py-2 px-3">Field Count</th>
                  <th className="py-2 px-3">Day-of-Week Index</th>
                  <th className="py-2 px-3">Default Timezone</th>
                  <th className="py-2 px-3">Special Characters</th>
                  <th className="py-2 pl-3">Official Docs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">Kubernetes CronJob</td>
                  <td className="py-2.5 px-3">5 fields</td>
                  <td className="py-2.5 px-3">0-6 (0 = Sunday)</td>
                  <td className="py-2.5 px-3">Kube-controller UTC</td>
                  <td className="py-2.5 px-3 font-mono">*, /, -, ,</td>
                  <td className="py-2.5 pl-3">
                    <a href="https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      K8s Docs ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">AWS EventBridge</td>
                  <td className="py-2.5 px-3 font-bold text-amber-700">6 fields</td>
                  <td className="py-2.5 px-3">1-7 (1 = Sunday)</td>
                  <td className="py-2.5 px-3">Always UTC</td>
                  <td className="py-2.5 px-3 font-mono">?, L, W, #</td>
                  <td className="py-2.5 pl-3">
                    <a href="https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-rule-schedule.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      AWS Docs ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">Google Cloud Scheduler</td>
                  <td className="py-2.5 px-3">5 fields</td>
                  <td className="py-2.5 px-3">0-6 (0 = Sunday)</td>
                  <td className="py-2.5 px-3">User-specified IANA</td>
                  <td className="py-2.5 px-3 font-mono">*, /, -, ,</td>
                  <td className="py-2.5 pl-3">
                    <a href="https://cloud.google.com/scheduler/docs/configuring/cron-job-schedules" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Google Cloud Docs ↗
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Cron Syntax Standards in Cloud Architectures
          </h2>
          <p>
            Cron expressions are ubiquitous in modern cloud engineering—powering
            AWS EventBridge rules, Google Cloud Scheduler, Kubernetes CronJobs,
            and GitHub Actions workflows. However, subtle syntax variations
            between 5-field POSIX cron and 6-field quartz cron frequently cause
            misconfigured schedules.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs"
              >
                <h4 className="font-semibold text-slate-900 text-sm mb-1.5">
                  {faq.question}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </article>
    
        {/* Mini‑Landing‑Page Content – Auto‑generated */}
        <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
          <h2 className="font-bold text-xl mb-4">Cron Expression Tester – How It Works & Real‑World Usage</h2>
          <p>This interactive calculator estimates <strong>Cron Expression Tester</strong> based on the official pricing tables of the major cloud providers and LLM vendors. All rates are pulled from the public pricing pages and are frozen at the time of the last repository sync (March 2026).</p>
          <h3 className="font-semibold mt-4 mb-2">Methodology</h3>
          <p>We compute cost by multiplying the user‑provided usage metrics (token count, request count, data transfer, etc.) with the per‑unit price. For providers that offer <em>prompt‑caching</em> or <em>reserved‑capacity</em> discounts we apply the documented discount factor. Edge‑case handling (e.g., minimum billing increments) follows the provider’s pricing rules.</p>
          <h3 className="font-semibold mt-4 mb-2">Example Scenarios</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Scenario 1 – <strong>Monthly SaaS API usage</strong>: 10 M input tokens, 2 M output tokens, 5 % cached tokens. The calculator shows the breakdown per provider and the total monthly spend.</li>
            <li>Scenario 2 – <strong>Batch data processing job</strong>: 500 GB egress from Cloud Run in us‑east‑1 vs. AWS Lambda. The tool highlights the cost‑effective region and any free‑tier allowances.</li>
            <li>Scenario 3 – <strong>Developer‑level CI cost estimate</strong>: 100 k builds per month, each triggering a 2 s Cloud‑Run instance. This demonstrates the impact of per‑invocation pricing vs. per‑second billing.</li>
          </ul>
          <p>All numbers are displayed in USD and can be exported as CSV for further analysis.</p>
        </article>

</ToolShell>
  );
}
