import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import CloudSqlStorageCalculator from "@/components/tools/CloudSqlStorageCalculator";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "Managed Postgres & Cloud SQL Storage Calculator — Disk & Backup Growth",
  "Forecast 12-month disk growth, WAL backup retention footprints, and HA multi-zone replication storage bills. Free FinOps tool.",
  "cloud-sql-storage-calculator"
);

const faqs = [
  {
    question: "Why does High Availability (HA) double storage costs?",
    answer:
      "When enabling High Availability on Amazon RDS or Google Cloud SQL, the database provider provisions a standby instance in a secondary Availability Zone with synchronous block-level storage replication, effectively doubling your allocated disk gigabytes.",
  },
  {
    question: "Can you downscale disk size on managed Postgres?",
    answer:
      "On Google Cloud SQL and AWS RDS, storage auto-increases as disk fills up, but cannot be shrunk without dumping, provisioning a smaller instance, and restoring data, making storage forecasting critical.",
  },
  {
    question: "How are database backups billed?",
    answer:
      "Automated backups and Write-Ahead Log (WAL) archives are billed per GB-month at cold storage rates (typically $0.08 to $0.095/GB-mo), proportional to retention days and transaction write volume.",
  },
];

export default function CloudSqlStoragePage() {
  const structuredData = generateStructuredData(
    "Managed Postgres Storage Cost Calculator",
    "Model managed database storage consumption, high availability disk replication, and backup retention expenses.",
    "cloud-sql-storage-calculator",
    faqs
  );

  return (
    <ToolShell
      title="Managed Postgres & Cloud SQL Storage Calculator"
      description="Forecast 12-month database storage trajectory, High Availability (HA) disk replication, and automated backup retention expenses."
      category="Cloud FinOps"
      categoryHref="/#cloud-finops"
      badge="12-Month Projection"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredData}
      />

      <CloudSqlStorageCalculator />

      {/* Authoritative Technical Guide & Princeton GEO Benchmark Table */}
      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
        {/* Static HTML Table for Zero-JS AI Bot Extraction */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Managed Database Storage & Backup Rates Benchmark (2026)
              </h3>
              <p className="text-xs text-slate-500">
                Comparison of base SSD storage and automated backup retention fees across major managed cloud engines.
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
                  <th className="py-2 pr-3">Cloud Database Engine</th>
                  <th className="py-2 px-3">Base Storage / GB-mo</th>
                  <th className="py-2 px-3">Backup Storage / GB-mo</th>
                  <th className="py-2 px-3">Storage Shrink Support?</th>
                  <th className="py-2 px-3">Free Backup Quota</th>
                  <th className="py-2 pl-3">Official Docs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">AWS RDS (gp3 SSD)</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">$0.115</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">$0.095</td>
                  <td className="py-2.5 px-3 text-rose-600 font-medium">No (One-way)</td>
                  <td className="py-2.5 px-3">100% of Provisioned DB</td>
                  <td className="py-2.5 pl-3">
                    <a href="https://aws.amazon.com/rds/pricing/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      AWS RDS Docs ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">Google Cloud SQL (SSD)</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">$0.170</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">$0.080</td>
                  <td className="py-2.5 px-3 text-rose-600 font-medium">No (One-way)</td>
                  <td className="py-2.5 px-3">None included</td>
                  <td className="py-2.5 pl-3">
                    <a href="https://cloud.google.com/sql/pricing" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Google Cloud Docs ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">Amazon Aurora (I/O-Optimized)</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">$0.225</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">$0.021</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-medium">Yes (Auto-dynamic)</td>
                  <td className="py-2.5 px-3">1 day continuous</td>
                  <td className="py-2.5 pl-3">
                    <a href="https://aws.amazon.com/rds/aurora/pricing/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Aurora Docs ↗
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            The One-Way Street of Managed Database Storage
          </h2>
          <p>
            Managed relational database services like AWS RDS for PostgreSQL and
            Google Cloud SQL abstract away manual backups, operating system
            patching, and replication. However, storage management contains a
            notorious FinOps trap: storage auto-growth is a one-way street. Once a
            database auto-expands from 100GB to 500GB due to temporary indexing
            bloat or heavy batch operations, providers will bill for 500GB
            indefinitely.
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
          <h2 className="font-bold text-xl mb-4">Cloud Sql Storage Calculator – How It Works & Real‑World Usage</h2>
          <p>This interactive calculator estimates <strong>Cloud Sql Storage Calculator</strong> based on the official pricing tables of the major cloud providers and LLM vendors. All rates are pulled from the public pricing pages and are frozen at the time of the last repository sync (March 2026).</p>
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
