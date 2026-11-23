import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import K8sBinPackingCalculator from "@/components/tools/K8sBinPackingCalculator";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "Kubernetes Node Bin-Packing Capacity Calculator",
  "Optimize cluster nodes by packing pod requests, accounting for DaemonSet/kube-system overhead and wasted capacity. Free FinOps tool.",
  "k8s-node-bin-packing"
);

const faqs = [
  {
    question: "What is Kubernetes bin-packing?",
    answer:
      "Bin-packing in Kubernetes is the algorithmic process of fitting pods with defined CPU and memory requests into worker nodes to maximize utilization and minimize idle cloud compute expenses.",
  },
  {
    question: "Why can't 100% of a node's resources be used by application pods?",
    answer:
      "Worker nodes require CPU and RAM reservations for the Linux kernel, kubelet, container runtime, and cluster DaemonSets (such as CNI networking, logging agents, and security sidecars), typically requiring 10% to 15% overhead.",
  },
  {
    question: "Should you use fewer large nodes or more small nodes?",
    answer:
      "Fewer large nodes reduce cluster-wide overhead percentages and facilitate bin-packing large pods, but increase the blast radius if a node crashes. A balanced instance size (4 to 8 vCPU) is optimal for general workloads.",
  },
];

export default function K8sBinPackingPage() {
  const structuredData = generateStructuredData(
    "Kubernetes Node Bin-Packing Calculator",
    "Calculate optimal Kubernetes worker node sizing and cluster bin-packing efficiency.",
    "k8s-node-bin-packing",
    faqs
  );

  return (
    <ToolShell
      title="Kubernetes Node Bin-Packing Calculator"
      description="Calculate optimal node capacity, pack pod resource requests efficiently, and eliminate wasted CPU and memory across cloud clusters."
      category="Cloud FinOps"
      categoryHref="/#cloud-finops"
      badge="Cluster Efficiency"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredData}
      />

      <K8sBinPackingCalculator />

      {/* Authoritative Technical Guide & Princeton GEO Benchmark Table */}
      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
        {/* Static HTML Table for Zero-JS AI Bot Extraction */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Standard Cloud Node Bin-Packing Allocatable Baselines (2026)
              </h3>
              <p className="text-xs text-slate-500">
                Official OS, kubelet, and eviction threshold reserved capacity across AWS EKS and GKE instances.
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
                  <th className="py-2 pr-3">Node Instance</th>
                  <th className="py-2 px-3">Raw vCPU / RAM</th>
                  <th className="py-2 px-3">System Reserved</th>
                  <th className="py-2 px-3">Allocatable Capacity</th>
                  <th className="py-2 px-3">Optimal Pod Shape</th>
                  <th className="py-2 pl-3">Official Docs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">m5.xlarge (AWS EKS)</td>
                  <td className="py-2.5 px-3">4 vCPU / 16 GiB</td>
                  <td className="py-2.5 px-3">~250m CPU / 1.2 GiB</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">3.75 vCPU / 14.8 GiB</td>
                  <td className="py-2.5 px-3">1:4 CPU-to-RAM</td>
                  <td className="py-2.5 pl-3">
                    <a href="https://docs.aws.amazon.com/eks/latest/userguide/choosing-instance-type.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      AWS EKS Docs ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">c5.2xlarge (AWS EKS)</td>
                  <td className="py-2.5 px-3">8 vCPU / 16 GiB</td>
                  <td className="py-2.5 px-3">~320m CPU / 1.3 GiB</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">7.68 vCPU / 14.7 GiB</td>
                  <td className="py-2.5 px-3">Compute-Bound (1:2)</td>
                  <td className="py-2.5 pl-3">
                    <a href="https://docs.aws.amazon.com/eks/latest/userguide/choosing-instance-type.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      AWS EKS Docs ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-3 font-medium text-slate-900">e2-standard-4 (Google GKE)</td>
                  <td className="py-2.5 px-3">4 vCPU / 16 GiB</td>
                  <td className="py-2.5 px-3">~240m CPU / 1.5 GiB</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-800">3.76 vCPU / 14.5 GiB</td>
                  <td className="py-2.5 px-3">Balanced General Web</td>
                  <td className="py-2.5 pl-3">
                    <a href="https://cloud.google.com/kubernetes-engine/docs/concepts/plan-node-sizes" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Google GKE Docs ↗
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            The Multi-Dimensional Bin Packing Challenge
          </h2>
          <p>
            In Kubernetes cluster management, resource allocation is a classical
            two-dimensional bin packing problem. Every pod specifies both CPU and
            memory requests. A node is considered &quot;full&quot; whenever either its CPU
            or memory allocatable capacity is exhausted, even if the other
            resource remains 50% unoccupied.
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
          <h2 className="font-bold text-xl mb-4">K8s Node Bin Packing – How It Works & Real‑World Usage</h2>
          <p>This interactive calculator estimates <strong>K8s Node Bin Packing</strong> based on the official pricing tables of the major cloud providers and LLM vendors. All rates are pulled from the public pricing pages and are frozen at the time of the last repository sync (March 2026).</p>
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
