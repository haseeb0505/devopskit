import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/tools/llm-api-cost-calculator",
    "/tools/vllm-gpu-hardware-profiler",
    "/tools/aws-nat-gateway-cost-auditor",
    "/tools/k8s-karpenter-bin-packing-simulator",
    "/tools/prompt-caching-calculator",
    "/tools/rag-embedding-cost-calculator",
    "/tools/ai-agent-cost-estimator",
    "/tools/cloud-run-vs-lambda-cost",
    "/tools/cloud-egress-cost-calculator",
    "/tools/cloud-sql-storage-calculator",
    "/tools/k8s-node-bin-packing",
    "/tools/cron-expression-tester",
    "/tools/jwt-decoder-inspector",
    "/tools/json-payload-size-calculator",
    "/tools/api-rate-limit-calculator",
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/tools/") ? 0.9 : 0.5,
  }));
}
