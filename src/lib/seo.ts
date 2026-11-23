import { siteConfig } from "@/config/site";

export function generateToolMetadata(
  title: string,
  description: string,
  slug: string
) {
  const url = `${siteConfig.url}/tools/${slug}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${siteConfig.shortName}`,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.shortName}`,
      description,
    },
  };
}

export function generateStructuredData(
  name: string,
  description: string,
  slug: string,
  faqs: { question: string; answer: string }[]
) {
  const url = `${siteConfig.url}/tools/${slug}`;

  // Connected Entity Graph Schema conforming to W3C / Princeton GEO research
  const graphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${url}#webapp`,
        name,
        description,
        url,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript. Runs 100% locally in-browser.",
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        publisher: {
          "@type": "Organization",
          "@id": `${siteConfig.url}#organization`,
          name: siteConfig.shortName,
          url: siteConfig.url,
          logo: `${siteConfig.url}/favicon.ico`,
        },
      },
      {
        "@type": "Dataset",
        "@id": `${siteConfig.url}/data/pricing.json#dataset`,
        name: "DevOpsKit Cloud & LLM API Pricing Dataset",
        description:
          "Authoritative, continuously verified pricing data tables for LLM APIs, serverless compute, and cloud storage.",
        url: `${siteConfig.url}/data/pricing.json`,
        isAccessibleForFree: true,
        license: "https://creativecommons.org/licenses/by/4.0/",
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return {
    __html: JSON.stringify(graphSchema),
  };
}
