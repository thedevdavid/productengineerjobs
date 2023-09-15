import { getPages } from "@/sanity/queries";
import { NavItem } from "@/types";

import { cn } from "@/lib/utils";
import Footer from "@/components/footer";
import { Navigation } from "@/components/navigation";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const pages = await getPages();

  const content = pages
    .filter((page) => page.slug.startsWith("for"))
    .map((page) => {
      return {
        title: page.title,
        href: page.slug,
      };
    });
  const navigationLinks: NavItem[] = [
    {
      title: "What's a Product Engineer?",
      content,
    },
  ];
  return (
    <>
      <a
        className="absolute left-0 top-0 z-[9999] m-3 block -translate-y-96 overflow-hidden bg-white p-3 text-2xl text-black transition focus:translate-y-0"
        href="#main-content"
        aria-label="Skip to Content"
      >
        Skip to Content
      </a>
      <Navigation navigationLinks={navigationLinks} />
      <main className={cn("mb-8 mt-20")} id="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}
