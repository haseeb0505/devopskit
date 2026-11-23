import Link from "next/link";
import { ChevronRight, Zap } from "lucide-react";
import ToolSidebar from "./ToolSidebar";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface ToolShellProps {
  title: string;
  description: string;
  category: "AI & LLM" | "Cloud FinOps" | "Developer Utilities";
  categoryHref: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
}

export default function ToolShell({
  title,
  description,
  category,
  categoryHref,
  badge = "Client-Side Tool",
  children,
}: ToolShellProps) {
  return (
    <div className="py-8 sm:py-12 bg-slate-50 min-h-screen">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two-column layout: sidebar + main */}
        <div className="flex gap-8 xl:gap-10">
          {/* ── Left Sidebar ── */}
          <ToolSidebar />

          {/* ── Main Content ── */}
          <div className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-mono">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <Link
                href={categoryHref}
                className="hover:text-blue-600 transition-colors"
              >
                {category}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-slate-800 font-medium truncate max-w-[200px] sm:max-w-none">
                {title}
              </span>
            </nav>

            {/* Tool Header */}
            <div className="mb-8 border-b border-slate-200 pb-6">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 font-mono shadow-2xs">
                  {category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono flex items-center gap-1 shadow-2xs">
                  <Zap className="h-3 w-3" />
                  {badge}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                {title}
              </h1>
              <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
                {description}
              </p>
            </div>

            {/* Main Content Area */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
