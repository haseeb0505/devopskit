import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import CronExpressionTester from "@/components/tools/CronExpressionTester";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "Cron Expression Tester & Schedule Calculator — 5-Field & 6-Field",
  "Evaluate 5-field and 6-field cron expressions instantly with human-readable breakdowns and next execution timestamps. Free developer tool.",
  "cron-expression-tester"
);

const faqs = [
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

      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
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
    </ToolShell>
  );
}
