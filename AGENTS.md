<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# DevOpsKit Agent Quick Map & Execution Status

This document is the living execution tracker and shared context map for all AI agents working across sessions on this repository.

## 🧭 Project Identity & Architecture
- **Purpose:** 100% static, client-side Next.js web application providing 17 high-utility Cloud FinOps, AI API, and developer calculators.
- **Live Production URL:** [https://devopskit.tools](https://devopskit.tools) (Hosted on Cloudflare Pages).
- **Security & Networking:** 100% SSL/TLS with forced HTTP to HTTPS (301) redirect via Cloudflare Edge.
- **Core Stack:** Next.js (App Router, static export), TypeScript, Tailwind CSS, Lucide icons.
- **Constraints:** Zero backend, zero database, zero external API keys. All calculations, parsers, and state logic run client-side in the browser.
- **Central Configuration:** `src/config/site.ts` (`SITE_NAME`, `SITE_URL`, `CONTACT_EMAIL`, `ADSENSE_PUB_ID`).

---

## 📋 Comprehensive Living Project Checklist & Tracker

### 🟢 1. Core Architecture & UI/UX (100% Complete)
- [x] **Zero-Backend Architecture:** 100% client-side computation with no server-side secrets or databases.
- [x] **Unified Multi-Surface Navigation:** 100% synchronization across Homepage, Sticky Sidebar, and Navbar Dropdown across all 17 tools.
- [x] **Sticky Multi-Category Tool Sidebar:** Quick-access navigation across AI & LLM, Cloud FinOps, and Developer Utilities with active-state indicators.
- [x] **Balanced 2XL Viewport Layout:** Grid expanded to `col-span-6 / col-span-6` for wide, readable sliders and input controls.
- [x] **Custom DevOpsKit Brand Iconography:** Custom SVG terminal favicon and browser tab icons (`icon.svg`, `favicon.ico`) deployed.
- [x] **1-Click Share & Export Engine:**
  - [x] CSV export functionality (`downloadCSV`) on all cost calculators.
  - [x] 1-Click Markdown snippet copy for Slack / PRs / GitHub Issues.
  - [x] Live query param synchronization (`useQueryParams`) for bookmarkable calculations.

---

### 🟢 2. The 17 Tool Directory (All 17 Live in Code & Prerendered)
- [x] **vLLM & Self-Hosted LLM GPU Hardware Profiler (Flagship)**: Models weights, GQA KV cache, Tensor Parallelism, tokens/sec, and cloud GPU cost breakeven.
- [x] **AWS NAT Gateway & Egress Trap Cost Auditor (Flagship)**: Audits S3 backup leaks, cross-AZ hairpinning, fck-nat savings, and outputs 1-click Terraform.
- [x] **Kubernetes Karpenter vs Cluster Autoscaler Simulator (Flagship)**: Real 2D bin-packing simulator calculating DaemonSet tax and right-sizing savings.
- [x] **GPT-4o vs Claude 3.7 Sonnet Cost Calculator (Comparison pSEO)**: Side-by-side prompt caching discount crossover modeler.
- [x] **DeepSeek R1 vs OpenAI o1 Cost Calculator (Comparison pSEO)**: Reasoning & thinking token pricing comparison calculator.
- [x] **LLM API Cost Calculator**: Updated November 2026 prices for GPT-4o, o1, o3, o4-mini, Gemini 2.5 Flash/Pro, Claude 3.7 Sonnet, DeepSeek V3/R1.
- [x] **Prompt Caching Cost Calculator**: Breakeven cache hit rate, prompt TTL, and monthly savings.
- [x] **RAG Embedding Cost Calculator**: Vector DB storage, dimensions, chunking overhead.
- [x] **AI Agent Cost Estimator**: Multi-turn tool loops, recursive context growth, and runaway cost simulation.
- [x] **Cloud Run vs AWS Lambda Cost Evaluator**: Concurrency, vCPU-seconds, free tiers.
- [x] **Multi-Cloud Egress Cost Calculator**: AWS, GCP, Azure vs Cloudflare R2 / CDN.
- [x] **Cloud SQL / RDS Storage Growth Planner**: 12-month disk growth, WAL logs, HA replication.
- [x] **Kubernetes Node Bin-Packing Calculator**: Node instance capacity and waste percentage.
- [x] **Cron Expression Tester**: 5-field and 6-field parser with next 10 runs.
- [x] **JWT Decoder & Inspector**: 100% in-browser token decoding, claims inspection, expiration countdown.
- [x] **JSON Payload Size Calculator**: Raw, minified, Gzip, and LLM token counting.
- [x] **API Rate Limit Calculator**: Token bucket capacity, refill rate, and burst headroom.

---

### 🟡 3. Technical SEO, GEO & Search Indexing (Active)
- [x] **Static SSG Export:** All 27 static routes prerendered to HTML for zero-JS bot extraction.
- [x] **W3C Semantic Schema.org Graph:** Connected `@graph` uniting `WebApplication`, `Dataset`, and `FAQPage` on every tool page.
- [x] **AI Search Crawler Directives:** Configured `robots.txt` explicitly allowing `GPTBot`, `PerplexityBot`, `ClaudeBot`, `OAI-SearchBot`, and `Google-Extended`.
- [x] **GEO Manifests:** Live `public/llms.txt` and `public/llms-full.txt` updated with all 15 tools and schema contracts.
- [x] **Sitemap:** Fully dynamic static `sitemap.xml` with priority and weekly change frequency.
- [ ] **Google Search Console Indexing Request (Manual Action):**
  - [x] Initial 12 tool URLs requested.
  - [x] Request Indexing for 3 new flagship URLs:
    - `https://devopskit.tools/tools/vllm-gpu-hardware-profiler`
    - `https://devopskit.tools/tools/aws-nat-gateway-cost-auditor`
    - `https://devopskit.tools/tools/k8s-karpenter-bin-packing-simulator`
  - [x] Re-submit updated `sitemap.xml` in GSC.
- [ ] **Bing Webmaster Tools Indexing:** Verify submitted URLs update from 12 to 15.

---

### 🟡 4. Engineering-Led Backlinks & Launch Wave (Immediate Priority)
- [ ] **Directory Self-Submissions (No Approval Gate):**
  - [x] Submit to **DevHunt** (Free launchpad for dev tools with high authority): [Live Listing](https://devhunt.org/tool/devopskit).
  - [-] **AlternativeTo.net**: Rejected (moderator policy restricts multi-calculator / web utility suites).
  - [ ] Submit to **Futurepedia.io** / **There's An AI For That (TAAFT)**.
- [ ] **Community Launch Wave (Show HN & Reddit):**
  - [ ] Post **Show HN** on Hacker News (`docs/LAUNCH_TEMPLATES_US.md`) highlighting the vLLM profiler and NAT gateway auditor.
  - [ ] Post targeted technical threads on:
    - [x] `r/LocalLLaMA` (Focus: vLLM VRAM KV cache sizer): **Posted**.
    - [ ] `r/aws` (Focus: AWS NAT Gateway & S3 Endpoint trap auditor).
    - [ ] `r/devops` (Focus: Karpenter bin-packing simulator).
- [ ] **GitHub Awesome Lists PR Submissions:**
  - [x] Submit PR to `awesome-finops`: PR [#60](https://github.com/jmfontaine/awesome-finops/pull/60) submitted.
  - [x] Submit PR to `awesome-devops`: PR [#677](https://github.com/wmariuss/awesome-devops/pull/677) submitted.
  - [ ] Submit PR to `awesome-selfhosted`.

---

### 🔮 5. Long-Term Growth, Automated Pipelines & Monetization (Roadmap)
- [ ] **Automated Pricing Sync Pipeline:**
  - [ ] GitHub Actions scheduled cron job (`.github/workflows/pricing-sync.yml`) checking model/cloud price changes.
  - [ ] Zod schema validator to prevent NaN/corrupted pricing values.
- [ ] **Search Console "Striking Distance" Optimization (Day 30–60):**
  - [ ] Review queries ranking in positions 5–20.
  - [ ] Expand headings and FAQs on those specific pages to climb into top 3.
- [ ] **AdSense Approval & Monetization:**
  - [ ] Log initial organic search traffic.
  - [ ] Add verified AdSense Publisher ID in `src/config/site.ts` and `public/ads.txt`.
  - [ ] Submit for Google AdSense review.
