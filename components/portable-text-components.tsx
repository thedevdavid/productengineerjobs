import Link from "next/link";
import type { PortableTextReactComponents } from "@portabletext/react";
import { ExternalLinkIcon, Link1Icon, Link2Icon } from "@radix-ui/react-icons";

import { SanityImage } from "@/components/sanity-image";

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  marks: {
    link: ({ value, children }) => {
      const isExternal = (value?.href || "").startsWith("http");
      if (isExternal) {
        return (
          <a href={value?.href} target="_blank" rel="noindex nofollow">
            <ExternalLinkIcon className="mr-1 inline h-5 text-muted-foreground" /> {children}
          </a>
        );
      }
      return <Link href={value?.href}> {children}</Link>;
    },
  },
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />;
    },
  },
};
