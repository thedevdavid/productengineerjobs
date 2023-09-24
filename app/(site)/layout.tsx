import { cn } from "@/lib/utils";
import Footer from "@/components/footer";
import { TopNav } from "@/components/top-nav";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function SiteLayout({ children }: RootLayoutProps) {
  return (
    <>
      <a
        className="absolute left-0 top-0 z-[9999] m-3 block -translate-y-96 overflow-hidden bg-white p-3 text-2xl text-black transition focus:translate-y-0"
        href="#main-content"
        aria-label="Skip to Content"
      >
        Skip to Content
      </a>
      <TopNav />
      <main className={cn("mb-8 mt-20")} id="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}
