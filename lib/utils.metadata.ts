import type { Metadata } from "next";
import type { Image } from "sanity";

import { urlForImage } from "@/lib/sanity.image";

/**
 * All the shared stuff that goes into <head> on `(personal)` routes, can be be imported by `page.tsx` files and used by `generateMetadata` functions.
 */
export function defineMetadata({
  baseTitle,
  description,
  image,
  title,
}: {
  baseTitle?: string;
  description?: string;
  image?: Image;
  title?: string;
}) {
  const metaTitle = [...(title ? [title] : []), ...(baseTitle ? [baseTitle] : [])].join(" | ");

  const imageUrl = image && urlForImage(image)?.width(1200).height(627).fit("crop").url();

  return {
    title: metaTitle || "ProductEngineerJobs.co",
    themeColor: "#000",
    description,
    openGraph: imageUrl
      ? {
          images: [imageUrl],
        }
      : undefined,
  } satisfies Metadata;
}
