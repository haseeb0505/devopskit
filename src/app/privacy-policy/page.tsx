import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Shield, Eye, Cookie, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Zero Client Data Collection",
  description:
    "Privacy Policy for DevOpsKit. Learn about our client-side processing, Google AdSense cookie disclosures, and data protection practices.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-8 mb-10">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono mb-4 inline-block shadow-2xs">
            Last Updated: March 2026
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            At {siteConfig.shortName} (accessible from {siteConfig.url}), your
            privacy and data security are fundamental priorities. This policy
            explains how we handle information, our zero server-storage
            architecture, and our third-party advertising disclosures.
          </p>
        </div>

        <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Lock className="h-5 w-5 text-emerald-600" />
              1. 100% Client-Side Processing Architecture
            </h2>
            <p>
              Unlike conventional web applications that transmit form data to
              backend APIs for calculation and storage,{" "}
              <strong className="text-slate-900">{siteConfig.shortName}</strong> operates
              as a static, client-side application.
            </p>
            <p>
              When you enter parameters—such as token counts, system prompts,
              monthly cloud requests, or paste a JSON payload or JWT—those values
              are processed solely within your browser&apos;s memory using local
              JavaScript. No user-supplied parameters are ever transmitted to or
              stored on our servers.
            </p>
          </section>

          <section className="space-y-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Cookie className="h-5 w-5 text-blue-600" />
              2. Google AdSense &amp; Third-Party Cookies
            </h2>
            <p>
              Google is a third-party vendor on our site. Google uses cookies,
              known as DoubleClick or DART cookies, to serve ads to visitors
              based upon their visit to our site and other sites on the internet.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>
                Google&apos;s use of advertising cookies enables it and its partners
                to serve ads based on your visit to {siteConfig.domain} and/or other
                sites across the Web.
              </li>
              <li>
                You may opt out of personalized advertising by visiting{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google Ads Settings
                </a>
                .
              </li>
              <li>
                Alternatively, you can opt out of third-party vendors&apos; use of
                cookies for personalized advertising by visiting{" "}
                <a
                  href="https://www.aboutads.info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  aboutads.info
                </a>
                .
              </li>
            </ul>
          </section>

          <section className="space-y-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Eye className="h-5 w-5 text-indigo-600" />
              3. Server Log Files &amp; Hosting Analytics
            </h2>
            <p>
              Like most web hosts, our hosting provider (Cloudflare Pages)
              maintains standard non-identifying access logs (such as IP address,
              browser user-agent, date/time stamp, and referring URL) strictly
              for edge routing, DDoS prevention, and security analytics. These
              logs are never cross-referenced with individual user identities.
            </p>
          </section>

          <section className="space-y-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              4. External Links
            </h2>
            <p>
              Our calculators and guides contain reference links to official
              cloud documentation (e.g., OpenAI, Google Cloud, AWS, Cloudflare).
              We are not responsible for the privacy policies or practices of
              these third-party sites.
            </p>
          </section>

          <section className="space-y-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">5. Contact Information</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us
              at:{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-blue-600 font-mono underline"
              >
                {siteConfig.contactEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
