import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import K8sBinPackingCalculator from "@/components/tools/K8sBinPackingCalculator";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "Kubernetes Node Bin-Packing Calculator — Sizing & Cluster Efficiency",
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

      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
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
    </ToolShell>
  );
}
