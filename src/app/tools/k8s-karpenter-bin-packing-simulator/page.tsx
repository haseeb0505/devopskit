import type { Metadata } from "next";
import ToolShell from "@/components/layout/ToolShell";
import KarpenterVsClusterAutoscaler from "@/components/tools/KarpenterVsClusterAutoscaler";
import { generateToolMetadata, generateStructuredData } from "@/lib/seo";

export const metadata: Metadata = generateToolMetadata(
  "Karpenter vs Cluster Autoscaler K8s Simulator",
  "Simulate real-world Kubernetes 2D bin packing, DaemonSet overhead, CPU/RAM fragmentation, and calculate cost savings between Karpenter and Cluster Autoscaler.",
  "k8s-karpenter-bin-packing-simulator"
);

const faqs = [
  {
    question: "Why does Cluster Autoscaler cause higher resource fragmentation than Karpenter?",
    answer:
      "Cluster Autoscaler scales homogeneous node groups (e.g. only m6i.2xlarge). If your workloads have varied CPU:RAM ratios (e.g. memory-heavy workers alongside CPU-heavy APIs), fixed-size nodes leave large unused pockets of CPU or RAM (ghost waste). Karpenter evaluates pending pods and dynamically provisions heterogeneous instance types (c6i, m6i, r6i) to maximize bin packing density.",
  },
  {
    question: "What is DaemonSet overhead and why does it affect bin packing?",
    answer:
      "Every Kubernetes node must run system and observability agents (e.g. Cilium CNI, Datadog/Prometheus node-exporter, Fluentbit log shipper, AWS EBS CSI driver). This typically consumes 0.4 to 0.8 CPU cores and 1 to 2 GiB RAM before any user pods can schedule. Smaller nodes pay this overhead tax disproportionately.",
  },
  {
    question: "Can Karpenter mix Spot and On-Demand instances safely?",
    answer:
      "Yes. In Karpenter NodePools, you can define capacity-type priority (e.g. spot preferred with on-demand fallback) and use topology spread constraints so stateless application pods tolerate spot interruptions without downtime.",
  },
];

export default function KarpenterSimulatorPage() {
  const structuredData = generateStructuredData(
    "Kubernetes Karpenter vs Cluster Autoscaler Bin-Packing Simulator",
    "Simulate K8s cluster bin packing, DaemonSet tax, and Karpenter rightsizing cost savings.",
    "k8s-karpenter-bin-packing-simulator",
    faqs
  );

  return (
    <ToolShell
      title="Kubernetes Karpenter vs Cluster Autoscaler Simulator"
      description="Simulate real-world pod scheduling, DaemonSet resource reservations, memory fragmentation, and calculate exact dollar savings of Karpenter dynamic packing vs static node groups."
      category="Cloud FinOps"
      categoryHref="/#cloud-finops"
      badge="K8s FinOps Engine"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={structuredData}
      />

      <KarpenterVsClusterAutoscaler />

      {/* Deep Technical Engineering Guide */}
      <article className="mt-16 pt-12 border-t border-slate-200 text-slate-700 leading-relaxed space-y-8 text-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Why 100% Kubernetes Node Utilization Is a Myth
          </h2>
          <p className="mb-4">
            Platform engineers frequently wonder why their Kubernetes monthly bill is 30% to 50% higher than the sum of
            their pod CPU and memory requests. The discrepancy stems from two structural factors:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <h3 className="font-bold text-slate-900 text-sm mb-1">1. The Kubelet & DaemonSet Tax</h3>
              <p className="text-xs text-slate-600">
                AWS EKS and GKE automatically reserve allocatable CPU/RAM for system daemons (systemd, containerd, kubelet).
                On top of that, your cluster logging, telemetry, security mesh, and storage CSI DaemonSets consume fixed
                slices on every single node provisioned.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <h3 className="font-bold text-slate-900 text-sm mb-1">2. Multi-Dimensional Bin Packing Slack</h3>
              <p className="text-xs text-slate-600">
                Pods request both CPU and Memory simultaneously. A node that is 95% full on memory may only be 40% full on CPU.
                Because the node cannot accept new pods needing RAM, the remaining 60% CPU capacity sits idle and unbilled.
              </p>
            </div>
          </div>
        </div>
      </article>
    </ToolShell>
  );
}
