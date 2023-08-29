import { MetadataRoute } from "next";

import { BASE_URL } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  // TOO: fetch pages and posts from sanity
  return [
    {
      url: BASE_URL,
      lastModified: now,
    },
    // ...pages,
    // ...posts,
  ];
}
