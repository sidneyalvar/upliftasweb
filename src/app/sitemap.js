import { products } from "@/lib/data/products";
import { cases } from "@/lib/data/cases";
import { news } from "@/lib/data/news";
import { siteConfig } from "@/lib/site-config";

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

  const staticRoutes = [
    { route: "", priority: 1.0, changeFrequency: "weekly" },
    { route: "/products", priority: 0.9, changeFrequency: "weekly" },
    { route: "/cases", priority: 0.7, changeFrequency: "weekly" },
    { route: "/news", priority: 0.7, changeFrequency: "daily" },
    { route: "/contact", priority: 0.6, changeFrequency: "monthly" },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  const productRoutes = products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const caseRoutes = cases.map((c) => ({
    url: `${baseUrl}/cases/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const newsRoutes = news.map((n) => ({
    url: `${baseUrl}/news/${n.slug}`,
    lastModified: new Date(n.date),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...productRoutes, ...caseRoutes, ...newsRoutes];
}
