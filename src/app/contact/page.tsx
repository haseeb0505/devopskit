import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Mail, Clock, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us & Rate Card Inquiries",
  description:
    "Get in touch with the DevOpsKit engineering team for tool feedback, pricing updates, or bug reports.",
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-8 mb-10">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 font-mono mb-4 inline-block shadow-2xs">
            Support & Feedback
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Contact the DevOpsKit Team
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Whether you noticed an updated rate card from a cloud vendor, have an
            idea for a new FinOps calculator, or need assistance, we're here to
            help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
            <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-2xs">
              <Mail className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Direct Email</h2>
            <p className="text-xs text-slate-500">
              Send an email directly to our engineering mailbox:
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-blue-600 hover:text-blue-700 font-mono text-sm underline block font-semibold"
            >
              {siteConfig.contactEmail}
            </a>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-2xs">
              <Clock className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Response Time</h2>
            <p className="text-xs text-slate-500">
              We review incoming submissions regularly.
            </p>
            <p className="text-sm font-semibold text-slate-800">
              Within 24 to 48 hours for verified pricing corrections.
            </p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-blue-600" />
            Guidelines for Pricing Updates
          </h2>
          <p>
            Major AI providers and cloud hyperscalers change rates frequently.
            When reporting a rate change, please include:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li>The official documentation URL from the cloud or AI provider.</li>
            <li>The specific tier or region affected (e.g., us-central1 vs us-east-1).</li>
            <li>The effective date of the new pricing schedule.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
