import type { PortableTextReactComponents } from "@portabletext/react";

import { SanityImage } from "@/components/sanity-image";

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  marks: {
    gold: ({ children }) => <span className="text-secondary">{children}</span>,
    red: ({ children }) => <span className="bg-red-700">{children}</span>,
  },
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />;
    },
  },
};
