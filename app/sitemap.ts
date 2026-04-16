import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://lengenie.vercel.app";
  const pages = ["/", "/services", "/pricing", "/checkout", "/demo", "/onboarding", "/about", "/blog", "/privacy", "/terms", "/refund"];
  return pages.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
