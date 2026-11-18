import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "cloud cost calculator",
    "llm api pricing calculator",
    "prompt caching savings",
    "rag embedding cost",
    "cloud run vs lambda",
    "egress cost calculator",
    "kubernetes node bin packing",
    "devops tools",
    "cloud finops",
  ],
  authors: [{ name: "DevOpsKit Team", url: siteConfig.url }],
  creator: "DevOpsKit",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.shortName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "msvalidate.01": "E43CA4E96C27432D897EC95869163F8F",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {siteConfig.adsensePublisherId &&
          siteConfig.adsensePublisherId !== "pub-0000000000000000" && (
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${siteConfig.adsensePublisherId}`}
              crossOrigin="anonymous"
            />
          )}
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white"
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
