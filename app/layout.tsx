import "./globals.css";

import { Metadata } from "next";
import { Inter } from "next/font/google";

import siteMetadata, { BASE_URL } from "@/lib/metadata";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@/components/analytics";
import { BackTopButton } from "@/components/back-to-top";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: siteMetadata.title,
  description: siteMetadata.description,
  alternates: {
    canonical: "./",
    types: {
      "application/rss+xml": `${BASE_URL}/feed.xml`,
    },
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-b from-slate-100 to-white antialiased dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 ">
        <ThemeProvider attribute="class" defaultTheme={siteMetadata.defaultTheme} enableSystem={false}>
          <TooltipProvider>{children}</TooltipProvider>
          <BackTopButton />
          <Toaster />
        </ThemeProvider>
      </body>
      <Analytics />
    </html>
  );
}
