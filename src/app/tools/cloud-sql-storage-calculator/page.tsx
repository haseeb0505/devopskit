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

      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
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
    </ToolShell>
  );
}
