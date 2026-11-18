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
- **Target Hosting:** Cloudflare Pages (static export to `./out` via `wrangler.jsonc` and `next.config.ts`).
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
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root shell, theme, font, metadata, analytics/ads slots
│   │   ├── page.tsx            # Hub homepage with tool directory & category filters
│   │   ├── sitemap.ts          # XML sitemap generator
│   │   ├── robots.ts           # robots.txt generator
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
- [x] **Educational Content:** In-depth technical guides and FAQ schemas below each calculator.
- [x] **Trust & Legal Suite:** Compliant About, Contact, Terms of Service, Privacy Policy, and `ads.txt`.
- [x] **Export & Shareability:** 1-click Slack/PR markdown export and URL permalink parameter encoding.
- [x] **Deployment Config:** `wrangler.jsonc` configured for Cloudflare Pages static site deployment.

### 🟡 In Progress / Polish
- [ ] **Live Domain & Hosting Setup:** Connect repository to Cloudflare Pages and bind custom `.com` domain.
- [ ] **Real-world User Feedback & Verification:** Verify query param hydration across all 12 tool views under slow network/edge cases.
- [ ] **Unit Test Coverage:** Ensure dedicated test runner (e.g. Vitest) covers all edge cases in `src/lib/calculators/`.

### 🔮 Next Plan & Roadmap
1. **Cloudflare Deployment:**
   - Link repository to Cloudflare Pages (Build command: `npm run build`, output: `out`).
   - Configure custom domain and SSL in Cloudflare Registrar.
2. **Search Console & SEO Launch:**
   - Submit `sitemap.xml` to Google Search Console and Bing Webmaster Tools.
   - Monitor initial crawling and indexing.
3. **Monetization & AdSense:**
   - Replace placeholder `ADSENSE_PUB_ID` in `src/config/site.ts` and `public/ads.txt`.
   - Submit for Google AdSense site approval after initial organic traffic and indexing.
4. **Future Tool Expansion:**
   - Additional serverless FinOps calculators (DynamoDB vs Cloud Firestore, S3 Glacier lifecycle tiers).
   - Local offline PWA (Progressive Web App) manifest support for instant dev access.

