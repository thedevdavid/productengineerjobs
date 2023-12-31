"use client";

import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { useNextSanityImage } from "next-sanity-image";

interface Props {
  asset: SanityImageSource;
  alt: string;
  caption?: string;
}

export const SanityImage = (props: Props) => {
  const { asset, alt, caption } = props;
  const imageProps = useNextSanityImage(
    {
      config: () => ({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      }),
    },
    asset
  );

  if (!imageProps) return null;

  return (
    <figure>
      <Image {...imageProps} alt={alt} sizes="(max-width: 800px) 100vw, 800px" />
      {caption && (
        <figcaption className="mt-2 text-center text-sm italic text-gray-500 dark:text-gray-400">{caption}</figcaption>
      )}
    </figure>
  );
};
