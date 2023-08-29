"use client";

import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch";

import siteMetadata from "@/lib/metadata";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "You forgot to set the Algolia App ID",
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY || "You forgot to set the Algolia API key"
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.defaultTheme} enableSystem={false}>
      <InstantSearch
        searchClient={searchClient}
        indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX || "You forgot to set the Algolia Index"}
        routing
        insights
      >
        {children}
      </InstantSearch>
    </ThemeProvider>
  );
}
