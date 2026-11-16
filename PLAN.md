# Antigravity Master Build Plan: Cloud FinOps & AI Developer Calculator Hub

## 1. Objective & Non-Negotiable Constraints

Build and ship a **100% static, client-side Next.js web application** of 12 high-utility Cloud FinOps, AI API, and developer calculators designed to pass [Google AdSense eligibility](https://support.google.com/adsense/answer/9724?hl=en) and [AdSense Program Policies](https://support.google.com/adsense/answer/48182?hl=en) with **minimum human input** and **minimum investment (~$11.17/year)**.

- **Framework:** Next.js (App Router) with `output: 'export'`, TypeScript, and Tailwind CSS.
- **Zero Backend / Zero Database:** All calculations, parsers, and formatters run 100% client-side in the browser. No API keys, no server-side secrets, no paid SaaS dependencies.
- **Hosting ($0/month):** [Cloudflare Pages](https://www.cloudflare.com/plans/developer-platform/) (Free tier: unlimited static bandwidth, commercial use permitted).
- **Domain (~$11.17/year):** `.com` domain via [Cloudflare Registrar](https://pricing.registrar.cloudflare.com/) (wholesale at-cost pricing).
- **Contact Email ($0/month):** Cloudflare Email Routing forwarding `contact@[DOMAIN]` to the owner's personal inbox.
- **Single-Config Portability:** Store brand name, domain, contact email, and AdSense publisher ID in `src/config/site.ts` so the owner can swap placeholders in one file before deployment.

---

## 2. Target Directory Structure

```text
src/
├── app/
│   ├── layout.tsx                  # Global header, footer, font, AdSense script slot
│   ├── page.tsx                    # Hub homepage with categorized 12-tool directory
│   ├── sitemap.ts                  # Static XML sitemap generation
│   ├── robots.ts                   # Robots.txt allowing all crawlers + sitemap URL
│   ├── about/page.tsx              # Authoritative About page
│   ├── contact/page.tsx            # Contact page (mailto + clear response info)
│   ├── privacy-policy/page.tsx     # Cookie & Google AdSense disclosure policy
│   ├── terms/page.tsx              # Terms of Service & calculation disclaimer
│   └── tools/
│       ├── llm-api-cost-calculator/page.tsx
│       ├── prompt-caching-calculator/page.tsx
│       ├── rag-embedding-cost-calculator/page.tsx
│       ├── ai-agent-cost-estimator/page.tsx
│       ├── cloud-run-vs-lambda-cost/page.tsx
│       ├── cloud-egress-cost-calculator/page.tsx
│       ├── cloud-sql-storage-calculator/page.tsx
│       ├── k8s-node-bin-packing/page.tsx
│       ├── cron-expression-tester/page.tsx
│       ├── jwt-decoder-inspector/page.tsx
│       ├── json-payload-size-calculator/page.tsx
│       └── api-rate-limit-calculator/page.tsx
├── components/
│   ├── layout/                     # Navbar, Footer, Breadcrumbs, ToolShell
│   ├── ui/                         # Sliders, number inputs, copy buttons, result cards
│   └── tools/                      # One isolated interactive client component per tool
├── config/
│   └── site.ts                     # Brand name, domain, email, AdSense ID placeholder
├── data/
│   └── pricing.json                # Centralized LLM & Cloud pricing tables + lastUpdated
└── lib/
    ├── calculators/                # Pure TypeScript math & unit-tested logic per tool
    └── seo.ts                      # Metadata + JSON-LD (WebApplication + FAQPage) helpers
public/
└── ads.txt                         # Pre-formatted ads.txt template
```

---

## 3. Execution Phases for Antigravity

### Phase 1: Project Scaffold & Layout Shell
1. Initialize Next.js with TypeScript, Tailwind CSS, and ESLint; configure `next.config.ts` with `output: 'export'` and `images: { unoptimized: true }`.
2. Create `src/config/site.ts` with centralized constants (`SITE_NAME`, `SITE_URL`, `CONTACT_EMAIL`, `ADSENSE_PUB_ID`).
3. Build a clean, fast, accessible `ToolShell` layout component with:
   - Top navigation linking to the 3 tool categories and About.
   - Footer linking to Privacy Policy, Terms of Service, About, and Contact (mandatory for [AdSense site readiness](https://theguidex.com/resources/google-adsense-approval)).
   - Responsive two-column desktop / single-column mobile workspace for interactive inputs and live KPI readouts.
   - Zero intrusive popups, zero "coming soon" links, and zero placeholder Lorem Ipsum.

### Phase 2: Centralized Pricing Data & Pure Calculation Engine
1. Create `src/data/pricing.json` with a `lastUpdated` date and structured rates verified against official provider documentation:
   - [OpenAI API Pricing](https://developers.openai.com/api/docs/pricing) (standard input, cached input, output tokens per 1M).
   - [Gemini Developer API Pricing](https://aistudio.google.com/docs/pricing) (Flash-Lite, Flash, Pro tiers).
   - [Google Cloud Run Pricing](https://cloud.google.com/run/pricing) (active/idle vCPU-sec, GiB-sec, requests per 1M, free tier).
   - [AWS Lambda Pricing](https://aws.amazon.com/lambda/pricing/) (requests per 1M, GB-second compute, free tier).
2. Implement pure TypeScript calculation functions in `src/lib/calculators/` for all 12 tools.
3. Add unit tests (Vitest or Node test runner) verifying edge cases (zero inputs, free-tier thresholds, negative/overflow clamping) and run them to pass 100%.

### Phase 3: Build All 12 Tools + Original Technical Guides
For every route under `src/app/tools/`, implement:
- An interactive client calculator component with instant reactive updates (no "Submit" page reloads), preset scenario buttons, and a "Copy Shareable Breakdown" button.
- A **600–900 word original technical guide** directly below the tool explaining the underlying pricing formula, common cost traps, optimization tips, and 3–4 real FAQs (prevents "Low Value Content" rejections).
- Unique `<title>`, `<meta description>`, canonical URL, and JSON-LD `WebApplication` + `FAQPage` structured data.

| # | Route Slug | Primary Keyword Target | Core Inputs & Outputs |
| :--- | :--- | :--- | :--- |
| 1 | `/tools/llm-api-cost-calculator` | `llm api pricing calculator` | Input/output/cached tokens, daily requests → daily/monthly/annual cost across OpenAI, Gemini, and Anthropic tiers |
| 2 | `/tools/prompt-caching-calculator` | `llm prompt caching cost calculator` | System prompt tokens, cache TTL, hit rate %, daily calls → break-even hit rate and net monthly savings |
| 3 | `/tools/rag-embedding-cost-calculator` | `rag vector database cost calculator` | Document count, chunk size, overlap %, embedding rate, vector dimensions → indexing cost + estimated RAM/storage |
| 4 | `/tools/ai-agent-cost-estimator` | `ai agent api cost calculator` | Avg tool-call turns per run, context growth per step, monthly runs → worst-case vs. average token spend |
| 5 | `/tools/cloud-run-vs-lambda-cost` | `cloud run vs aws lambda pricing calculator` | Monthly requests, avg duration (ms), vCPU/RAM, concurrency → side-by-side monthly bill after free tiers |
| 6 | `/tools/cloud-egress-cost-calculator` | `cloud egress bandwidth cost calculator` | Monthly GB transferred, CDN cache-hit %, origin egress tier → origin vs. CDN egress bill comparison |
| 7 | `/tools/cloud-sql-storage-calculator` | `managed postgres storage cost calculator` | Base DB GB, monthly growth GB, backup retention days, IOPS tier → 12-month storage & backup cost projection |
| 8 | `/tools/k8s-node-bin-packing` | `kubernetes node size calculator` | Pod vCPU/RAM requests, replica count, system overhead % → optimal node instance size & cluster waste % |
| 9 | `/tools/cron-expression-tester` | `cron expression next run calculator` | 5-field/6-field cron expression, timezone → human-readable schedule + next 10 execution timestamps |
| 10 | `/tools/jwt-decoder-inspector` | `jwt token decoder online` | Pasted JWT string (client-side only) → decoded header/payload JSON, `iat`/`exp` countdown, byte size |
| 11 | `/tools/json-payload-size-calculator` | `json payload size calculator` | Raw JSON input → raw bytes, minified bytes, estimated Gzip transfer size, and approximate LLM token count |
| 12 | `/tools/api-rate-limit-calculator` | `api rate limit burst calculator` | Target RPS, P95 latency (ms), burst multiplier → token-bucket capacity, refill rate, and retry-backoff headroom |

### Phase 4: Mandatory AdSense Trust, Legal & Crawlability Files
1. **`/privacy-policy`:** Explicitly disclose Google AdSense third-party advertising cookies, DART/personalized ad opt-out links, and client-side-only tool processing (no user inputs stored on servers).
2. **`/terms`:** State informational/estimation nature of cloud & AI cost calculators and link to official vendor pricing pages for billing commitments.
3. **`/about`:** Explain the site's mission (transparent Cloud FinOps & AI engineering utilities) and maintainer background.
4. **`/contact`:** Provide `CONTACT_EMAIL` (`mailto:`) and clear instructions for pricing-table corrections or inquiries.
5. **`sitemap.ts` & `robots.ts`:** Generate valid `sitemap.xml` covering `/`, all 12 `/tools/*` routes, and the 4 policy pages; allow all crawlers in `robots.txt`.
6. **`public/ads.txt`:** Include a cleanly commented placeholder ready for the owner's `pub-XXXXXXXXXXXXXXXX` ID.

### Phase 5: Automated Build & Pre-Flight Verification
Run all checks before handing off to the user:
1. `npm run lint` and `npx tsc --noEmit` pass with zero errors.
2. Unit tests for all 12 calculator modules pass 100%.
3. `npm run build` completes cleanly and outputs static HTML/CSS/JS into `out/`.
4. Verify every internal link resolves (`200`), every page has a unique `<title>` and `<meta description>`, and zero placeholder strings (`Lorem ipsum`, `TBD`, `[Insert]`) remain outside `site.ts` / `ads.txt`.

---

## 4. Minimal Human-Only Launch Checklist (Post-Build)

1. **Domain & Hosting (~30 mins):** Register a `.com` on [Cloudflare Registrar](https://pricing.registrar.cloudflare.com/), update `src/config/site.ts`, push to GitHub, and connect to [Cloudflare Pages](https://www.cloudflare.com/plans/developer-platform/) (`npm run build` → `out`).
2. **Search Console (~15 mins):** Verify the domain in Google Search Console and submit `https://yourdomain.com/sitemap.xml`.
3. **AdSense Application (~15 mins):** Sign up at [Google AdSense](https://support.google.com/adsense/answer/9724?hl=en) (18+), add the verification snippet and `ads.txt` ID, and submit for review.
4. **Pakistan Payout & Tax Setup (~20 mins after approval):** Submit US tax info and add your Pakistani bank's SWIFT-BIC and IBAN for [wire transfer payouts](https://support.google.com/adsense/answer/3372975?hl=en), keeping remittance records for annual FBR filing under Section 154B ([AdSense Tax in Pakistan](https://bacoconsultants.com/blogs/google-adsense-tax-pakistan-2026)).
