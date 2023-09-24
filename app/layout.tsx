import "./globals.css";

import { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ProductEngineerJobs.co",
  description: "ProductEngineerJobs.co",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      {children}
    </html>
  );
}
