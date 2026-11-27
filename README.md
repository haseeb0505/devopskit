# DevOpsKit — Cloud FinOps & AI Developer Calculators

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Zero Backend](https://img.shields.io/badge/Backend-Zero%20(100%25%20Client--Side)-emerald)](https://devopskit.tools)

> **Live Platform:** [https://devopskit.tools](https://devopskit.tools)

**DevOpsKit** is a suite of 17 free, privacy-first, client-side engineering calculators for Cloud FinOps, LLM/AI token economics, and developer utilities.

No backend servers, no sign-ups, no tracking cookies, and no data leaving your machine. All mathematical modeling, token counting, JWT decoding, and bin-packing simulations run 100% locally in your browser runtime.

---

## 🚀 Key Highlights & Philosophy

- 🔒 **100% Client-Side Privacy:** No external APIs or telemetry for your architectural numbers, prompt token estimates, or JWT secrets. Everything executes locally via standard Web APIs and pure TypeScript.
- ⚡ **Zero-Latency Real-Time Math:** Instant sliders, immediate recalculations, and reactive state updates.
- 📤 **1-Click Export & Share:** Export calculations to CSV, copy 1-click Markdown summaries formatted for PRs and Slack, and share state via URL query params.
- 📱 **Responsive & Clean UI:** Optimized 2XL grid layout built with Tailwind CSS v4 and Lucide icons.
- 🌐 **Static Site Generation (SSG):** Pre-rendered static pages hosted on Cloudflare Pages edge for near-zero TTFB.

---

## 🛠️ The 17 Built-In Tools

### 🧠 1. AI & LLM Token Economics
1. **[vLLM GPU Hardware Profiler ★](https://devopskit.tools/tools/vllm-gpu-hardware-profiler)** — Profiles model weights, GQA/MQA KV cache sizing across context lengths, Tensor Parallelism (TP=1,2,4,8), generation throughput (tokens/sec), and cloud GPU breakeven vs API endpoints.
2. **[GPT-4o vs Claude 3.7 Sonnet Calculator](https://devopskit.tools/tools/gpt-4o-vs-claude-3-7-sonnet-cost)** — Side-by-side cost modeling comparing prompt caching discounts, thinking tokens, and input/output crossovers.
3. **[DeepSeek R1 vs OpenAI o1 Calculator](https://devopskit.tools/tools/deepseek-r1-vs-openai-o1-cost)** — Reasoning token cost comparisons between open-weights inference (DeepSeek R1) and OpenAI o1/o3-mini.
4. **[LLM API Cost Calculator](https://devopskit.tools/tools/llm-api-cost-calculator)** — Live pricing calculator for OpenAI, Anthropic, Google Gemini, and DeepSeek models with customizable prompt & completion ratios.
5. **[Prompt Caching Cost Calculator](https://devopskit.tools/tools/prompt-caching-calculator)** — Breakeven cache hit rate, prompt TTL, and monthly savings analyzer for Anthropic, OpenAI, and DeepSeek cache architectures.
6. **[RAG Embedding Cost Calculator](https://devopskit.tools/tools/rag-embedding-cost-calculator)** — Models vector dimensions, chunking overhead, storage costs, and periodic re-indexing expenses across top embedding providers and vector databases.
7. **[AI Agent Cost Estimator](https://devopskit.tools/tools/ai-agent-cost-estimator)** — Simulates recursive context growth, multi-turn tool loops, and runaway cost risks in autonomous agent workflows.

### ☁️ 2. Cloud FinOps & Infrastructure Sizing
8. **[AWS NAT Gateway Cost Auditor ★](https://devopskit.tools/tools/aws-nat-gateway-cost-auditor)** — Identifies silent data processing fees from S3 backup leaks, cross-AZ traffic, and evaluates fck-nat / Gateway Endpoint savings with downloadable Terraform modules.
9. **[K8s Karpenter vs Cluster Autoscaler Simulator ★](https://devopskit.tools/tools/k8s-karpenter-bin-packing-simulator)** — Simulates 2D bin-packing consolidation, DaemonSet overhead, node right-sizing, and calculates real cloud node bill reductions.
10. **[Kubernetes Node Bin-Packing Calculator](https://devopskit.tools/tools/k8s-node-bin-packing)** — Calculates pod density, CPU/memory allocatable overhead, system daemon reserves, and wasted node capacity.
11. **[Cloud Run vs AWS Lambda Cost Evaluator](https://devopskit.tools/tools/cloud-run-vs-lambda-cost)** — Models concurrent requests per instance, CPU allocation models, idle vs active execution, and free tier thresholds.
12. **[Multi-Cloud Egress Cost Calculator](https://devopskit.tools/tools/cloud-egress-cost-calculator)** — Compares AWS, GCP, and Azure internet egress rates against Cloudflare R2 and CDN cache offloading.
13. **[Cloud SQL / RDS Storage Growth Planner](https://devopskit.tools/tools/cloud-sql-storage-calculator)** — Forecasts 12-month disk growth, WAL archive accumulation, IOPS scaling, and HA multi-AZ replication storage overhead.

### 🔧 3. Developer & Platform Utilities
14. **[Cron Expression Tester](https://devopskit.tools/tools/cron-expression-tester)** — In-browser 5-field and 6-field cron parser with plain English translation and next 10 execution timestamps.
15. **[JWT Decoder & Inspector](https://devopskit.tools/tools/jwt-decoder-inspector)** — 100% in-browser token decoding, header and claims inspection, and visual expiration countdown with zero network transmission.
16. **[JSON Payload Size Calculator](https://devopskit.tools/tools/json-payload-size-calculator)** — Compares raw bytes, minified size, gzip compression efficiency, and estimated LLM token count for API payloads.
17. **[API Rate Limit Calculator](https://devopskit.tools/tools/api-rate-limit-calculator)** — Models token bucket and leaky bucket algorithms, refill rates, peak burst capacity, and 429 backoff windows.

---

## 🏗️ Architecture & Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router, Static HTML Export)
- **Language:** [TypeScript](https://www.typescriptlang.org) (Strict mode)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com)
- **Icons:** [Lucide React](https://lucide.dev)
- **Testing:** Node.js native test runner (`node --test`)
- **Hosting & CDN:** Cloudflare Pages (Edge network, 100% SSL/TLS enforcement)

---

## 💻 Local Development

### Prerequisites
- Node.js 20.x or later
- npm, pnpm, or yarn

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/devopskit.git
   cd devopskit
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Run unit tests:**
   ```bash
   npm test
   ```

5. **Build static export for production:**
   ```bash
   npm run build
   ```

---

## 🤝 Contributing

Contributions, bug reports, and suggestions for new calculators are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewCalculator`)
3. Commit your Changes (`git commit -m 'Add NewCalculator'`)
4. Push to the Branch (`git push origin feature/NewCalculator`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
