import type { MetadataRoute } from "next";

import { ORIGIN } from "@/config";
import { getUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: ORIGIN,
    sitemap: getUrl("/sitemap.xml").href,
  };
}
