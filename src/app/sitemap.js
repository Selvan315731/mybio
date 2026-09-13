import projectsData from "@/data/projects.json";
import siteData from "@/data/site.json";

export default function sitemap() {
  const baseUrl = siteData.siteUrl || "https://developer-portfolio.com";

  const projectUrls = projectsData.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projectUrls,
  ];
}
