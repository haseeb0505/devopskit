export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  url: string;
  domain: string;
  contactEmail: string;
  adsensePublisherId: string;
  githubUrl: string;
}

export const siteConfig: SiteConfig = {
  name: "DevOpsKit — Cloud FinOps & AI Developer Calculators",
  shortName: "DevOpsKit",
  description:
    "12 free, fast, 100% client-side Cloud FinOps, AI API pricing, and developer calculators with zero trackers and zero server processing.",
  url: "https://devopskit.tool",
  domain: "devopskit.tool",
  contactEmail: "contact@devopskit.tool",
  adsensePublisherId: "pub-0000000000000000", // Update with your AdSense Publisher ID
  githubUrl: "https://github.com",
};
