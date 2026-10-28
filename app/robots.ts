import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard",
          "/dashboard/",
          "/api/",
          "/cart",
          "/search",
          "/success",
          "/successError",
          "/loved-products",
          "/review",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
