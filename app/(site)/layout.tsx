import siteMetadata from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@/components/analytics";
import { BackTopButton } from "@/components/back-to-top";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { TopNav } from "@/components/top-nav";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function SiteLayout({ children }: RootLayoutProps) {
  return (
    <ThemeProvider
      storageKey="productengineerjobs-theme"
      attribute="class"
      defaultTheme={siteMetadata.defaultTheme}
      enableSystem={false}
    >
      <body className="min-h-screen bg-gradient-to-b from-slate-100 to-white antialiased dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800">
        <TooltipProvider>
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
            <Analytics />
          </main>
          <Footer />
        </TooltipProvider>
        <BackTopButton />
        <Toaster />
      </body>
    </ThemeProvider>
  );
}
