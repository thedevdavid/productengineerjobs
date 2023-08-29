import type { Metadata } from "next";
import type { Image } from "sanity";

export function defineMetadata({
  baseTitle,
  description,
  title,
}: {
  baseTitle?: string;
  description?: string;
  image?: Image;
  title?: string;
}) {
  const metaTitle = [...(title ? [title] : []), ...(baseTitle ? [baseTitle] : [])].join(" | ");

  return {
    title: metaTitle || "Add title in config files",
    themeColor: "#000",
    description,
  } satisfies Metadata;
}
