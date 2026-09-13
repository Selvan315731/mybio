import siteData from "@/data/site.json";

export default function robots() {
  const baseUrl = siteData.siteUrl || "https://developer-portfolio.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
