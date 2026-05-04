import type { MetadataRoute } from "next";

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
    sitemap: "https://lymbika.com/sitemap.xml",
  };
}
