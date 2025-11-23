import type { MetadataRoute } from "next";
import { publicEnv } from "@/config/env/public-env";

export const dynamic = "force-static";

const { WEB_URL } = publicEnv;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // home
    {
      url: WEB_URL,
      lastModified: new Date(),
      alternates: {
        languages: {
          "zh-TW": `${WEB_URL}/zh-TW`,
          "en-US": `${WEB_URL}/en-US`,
        },
      },
    },
  ];
}
