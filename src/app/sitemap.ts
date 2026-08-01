import type { MetadataRoute } from "next";

const baseUrl = "https://ucspantnagar.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/events", "/team", "/timeline", "/contact", "/join", "/crescendo"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
