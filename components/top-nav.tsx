import { NavItem } from "@/types";

import { Page } from "@/types/Page";
import { sanityFetch } from "@/lib/sanity.fetch";
import { pagesQuery } from "@/lib/sanity.queries";
import { Navigation } from "@/components/navigation";

export async function TopNav() {
  const pages = await sanityFetch<Page[]>({
    query: pagesQuery,
    tags: [`page`],
  });

  const content = pages
    .filter((page) => page.slug.startsWith("for"))
    .map((page) => {
      return {
        title: page.title,
        href: `${page.slug}`,
      };
    });
  const navigationLinks: NavItem[] = [
    {
      title: "What's a Product Engineer?",
      content,
    },
  ];
  return <Navigation navigationLinks={navigationLinks} />;
}
