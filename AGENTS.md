<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# DevOpsKit Agent Quick Map & Execution Status

This section serves as a shared context map for all AI agents working across chats on this repository.

## 🧭 Project Identity & Architecture
- **Purpose:** 100% static, client-side Next.js web application providing 12 high-utility Cloud FinOps, AI API, and developer calculators.
- **Live Production URL:** [https://devopskit.tools](https://devopskit.tools) (Hosted on Cloudflare Pages).
- **Security & Networking:** 100% SSL/TLS with forced HTTP to HTTPS (301) redirect via Cloudflare Edge.
- **Core Stack:** Next.js (App Router, static export), TypeScript, Tailwind CSS, Lucide icons.
- **Constraints:** Zero backend, zero database, zero external API keys. All calculations, parsers, and state logic run client-side in the browser.
- **Central Configuration:** `src/config/site.ts` (`SITE_NAME`, `SITE_URL`, `CONTACT_EMAIL`, `ADSENSE_PUB_ID`).

---

## 🗺️ Workspace Map

```text
devopskit/
├── AGENTS.md                   # Agent system rules, architecture map & live tracker
├── PLAN.md                     # Comprehensive master plan & AdSense qualification strategy
├── wrangler.jsonc              # Cloudflare Pages / Workers static assets configuration
├── next.config.ts              # Next.js config (output: 'export', images: { unoptimized: true })
├── docs/
│   ├── LAUNCH_TEMPLATES_US.md  # Battle-tested Hacker News, Reddit, and Product Hunt playbooks
├── public/
│   ├── llms.txt                # FastAI/Anthropic standard AI model manifest
│   ├── llms-full.txt           # Detailed URL parameter schemas for RAG query endpoints
│   ├── BingSiteAuth.xml        # Verified Bing Webmaster Tools authentication token
│   └── ads.txt                 # Pre-formatted Google AdSense verification snippet
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root shell, theme, font, metadata, analytics/ads slots
│   │   ├── page.tsx            # Hub homepage with tool directory & category filters
│   │   ├── sitemap.ts          # XML sitemap generator
│   │   ├── robots.ts           # Robots.txt with explicit GPTBot/PerplexityBot/ClaudeBot rules
│   │   ├── embed/              # Clean iframe routes for external blog embeds
│   │   ├── about/              # Site mission & maintainer info
│   │   ├── contact/            # Support & pricing correction contact form/mailto
│   │   ├── privacy-policy/     # AdSense cookie & client-side processing policies
│   │   ├── terms/              # Disclaimer of estimation & terms of use
│   │   └── tools/              # 12 interactive calculator pages
│   │       ├── llm-api-cost-calculator/
│   │       ├── prompt-caching-calculator/
│   │       ├── rag-embedding-cost-calculator/
│   │       ├── ai-agent-cost-estimator/
│   │       ├── cloud-run-vs-lambda-cost/
│   │       ├── cloud-egress-cost-calculator/
│   │       ├── cloud-sql-storage-calculator/
│   │       ├── k8s-node-bin-packing/
│   │       ├── cron-expression-tester/
│   │       ├── jwt-decoder-inspector/
│   │       ├── json-payload-size-calculator/
│   │       └── api-rate-limit-calculator/
│   ├── components/             # Reusable UI widgets, layout shells, headers, exports
│   ├── config/site.ts          # Central branding, domain & credentials placeholders
│   ├── data/pricing.json       # Centralized pricing tables (LLM, Cloud Run, Lambda, etc.)
│   └── lib/                    # Calculation engines, export helpers, SEO schemas
```

---

## 📈 Status Dashboard

### ✅ Completed
- [x] **Full Platform Architecture:** Next.js static export + Tailwind CSS styling + dark/light theme support.
- [x] **12 Dedicated Tools Built:**
  - 4x AI & LLM FinOps tools (LLM Cost, Prompt Caching, RAG Embedding, AI Agent Cost).
  - 4x Cloud Infrastructure tools (Cloud Run vs Lambda, Cloud Egress, Cloud SQL Storage, K8s Bin Packing).
  - 4x Developer Utilities (JWT Decoder, Cron Expression, JSON Payload, API Rate Limit).
- [x] **Live Domain & Hosting Setup:**
  - Connected repository to Cloudflare Pages with automatic git deploys on `main`.
  - Custom domain bound and live at **`https://devopskit.tools`**.
  - Permanent HTTP → HTTPS (301) redirect active across Cloudflare edge.
- [x] **Search Console & Engine Indexing:**
  - **Google Search Console:** Verified & `sitemap.xml` submitted with **Status: Success (17 discovered pages)**.
  - **Bing Webmaster Tools:** Verified via DNS CNAME & `sitemap.xml` submitted (indexes into ChatGPT Search).
- [x] **Generative Engine Optimization (GEO / AEO):**
  - Published official `public/llms.txt` and `public/llms-full.txt` (FastAI / Anthropic format).
  - Configured `robots.txt` explicitly allowing `GPTBot`, `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, and `Google-Extended`.
  - Injected W3C-compliant Schema.org `@graph` uniting `WebApplication`, `Dataset`, and `FAQPage`.
- [x] **Princeton GEO & Conversion Enhancements:**
  - Deployed static HTML benchmark comparison tables with authoritative outbound links (OpenAI, Anthropic, AWS, Google) for zero-JS bot extraction.
  - Deployed 1-Click Startup Archetypes (*Seed AI Wrapper*, *Support RAG Bot*, *Microservice on Cloud Run*, etc.) across key calculators to eliminate user bounce rates.
  - Built `/embed/*` lightweight iframe routes with direct backlink attribution.
- [x] **US Distribution & Launch Playbook:**
  - Authored comprehensive, anti-marketing community launch templates in `docs/LAUNCH_TEMPLATES_US.md` for Hacker News ('Show HN'), Reddit (`r/devops`, `r/LocalLLaMA`, `r/aws`), and Product Hunt.

### 🟡 In Progress / Polish
- [ ] **First Community Launch Wave:** Post Show HN and Reddit threads during optimal US morning windows (Tuesday–Thursday 7:30 AM – 10:00 AM EST).
- [ ] **Real-world User Feedback & Verification:** Verify query param hydration across all 12 tool views under edge cases.
- [ ] **Unit Test Coverage:** Ensure dedicated test runner (e.g. Vitest) covers all calculation edge cases in `src/lib/calculators/`.

### 🔮 Next Plan & Roadmap (Phase 2)
1. **Community Execution:**
   - Launch on Hacker News ("Show HN") following the template in `docs/LAUNCH_TEMPLATES_US.md`.
   - Post to `r/devops` and `r/LocalLLaMA` and engage within the 120-minute golden window.
2. **Search Console Monitoring:**
   - Track initial crawling impressions and index coverage in Google Search Console and Bing.
3. **Monetization & AdSense:**
   - Replace placeholder `ADSENSE_PUB_ID` in `src/config/site.ts` and `public/ads.txt`.
   - Apply for Google AdSense site approval after initial organic traffic and indexing.
4. **Future Tool Expansion:**
   - Additional serverless FinOps calculators (DynamoDB vs Cloud Firestore, S3 Glacier lifecycle tiers).
   - Local offline PWA (Progressive Web App) manifest support for instant dev access.

