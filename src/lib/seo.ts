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

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return {
    __html: JSON.stringify([webAppSchema, faqSchema]),
  };
}
