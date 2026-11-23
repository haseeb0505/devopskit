import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import NatGatewayAuditor from "@/components/tools/NatGatewayAuditor";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "AWS NAT Gateway & Egress Trap Cost Auditor — S3 Endpoints, Cross-AZ & fck-nat",
  "Audit hidden AWS NAT Gateway fees, S3 and ECR data processing costs, cross-AZ traffic penalties, and calculate break-even savings for VPC Gateway Endpoints and fck-nat.",
  "aws-nat-gateway-cost-auditor"
);

const faqs = [
  {
    question: "Why is AWS NAT Gateway so expensive?",
    answer:
      "AWS bills NAT Gateway on three distinct layers: a fixed hourly base fee ($0.045/hr per NAT = ~$32.85/mo per AZ), a data processing fee ($0.045/GB solely to pass packets through the gateway), and standard internet egress ($0.09/GB). If routing S3 backups, container images, or cross-AZ traffic through it, monthly bills multiply rapidly.",
  },
  {
    question: "What is an AWS S3 Gateway Endpoint and why is it free?",
    answer:
      "A VPC Gateway Endpoint for S3 routes traffic directly from private subnets to Amazon S3 over the AWS private network backbone without traversing the NAT Gateway. AWS provides Gateway Endpoints for S3 and DynamoDB at 100% zero cost with zero per-GB data processing fees.",
  },
  {
    question: "What is fck-nat and how does it compare to AWS NAT Gateway?",
    answer:
      "fck-nat is an open-source AMI optimized for running NAT on low-cost Graviton ARM EC2 instances (such as t4g.nano at ~$3.06/month). Unlike AWS Managed NAT Gateway, fck-nat charges zero per-GB data processing fees, saving high-throughput teams thousands of dollars monthly.",
  },
];

export default function NatGatewayPage() {
  const structuredData = generateStructuredData(
    "AWS NAT Gateway & Egress Cost Auditor",
    "Calculate hidden AWS NAT Gateway data processing fees, cross-AZ traps, and VPC endpoint savings.",
    "aws-nat-gateway-cost-auditor",
    faqs
  );

  return (
    <ToolShell
      title="AWS NAT Gateway & Egress Trap Auditor"
      description="Audit hidden data processing charges, S3 backup routing leaks, cross-AZ inter-subnet penalties, and evaluate fck-nat vs AWS Managed NAT Gateway with instant Terraform fixes."
      category="Cloud FinOps"
      categoryHref="/#cloud-finops"
      badge="AWS FinOps Auditor"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredData}
      />

      <NatGatewayAuditor />

      {/* Deep Technical Engineering Guide */}
      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            The Three Hidden Layers of AWS NAT Gateway Billing
          </h2>
          <p className="mb-4">
            AWS Managed NAT Gateway is the single most common unexpected line-item on cloud invoices.
            Engineers often assume they are only paying for internet egress bandwidth, but AWS charges three cumulative fees:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-xs">
            <li>
              <strong>Base Instance Fee:</strong> $0.045/hr per gateway (~$32.85/month). A high-availability VPC across 3 AZs starts at $98.55/month with zero traffic.
            </li>
            <li>
              <strong>Data Processing Fee:</strong> $0.045 per gigabyte for all traffic passing through the gateway, regardless of destination.
            </li>
            <li>
              <strong>Data Transfer Out:</strong> The standard internet egress fee of $0.09/GB for external destinations.
            </li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Trap 1: S3 Backups & Logs Leaking Through NAT</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If your database automated backups, ClickHouse dumps, or fluentbit logs stream to Amazon S3 from a private subnet without a VPC Gateway Endpoint, you pay $0.045/GB in NAT data processing fees even though the traffic never touches the public internet.
            </p>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Trap 2: The Single-NAT Cross-AZ Hairpinning Trap</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Deploying a single NAT Gateway in <code>us-east-1a</code> to serve EC2/EKS instances in <code>us-east-1b</code> and <code>us-east-1c</code> causes all outbound packets to cross availability zones twice, adding $0.02/GB in cross-AZ data fees and creating a single point of failure.
            </p>
          </div>
        </div>
      </article>
    </ToolShell>
  );
}
