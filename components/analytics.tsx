import Script from "next/script";

import siteMetadata from "@/lib/metadata";

export const Analytics = () => {
  if (process.env.NODE_ENV === "production") {
    switch (siteMetadata.analyticsProvider) {
      case "umami":
        return (
          <Script
            async
            defer
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || "https://analytics.umami.is/script.js"}
          />
        );
      default:
        return null;
    }
  }
};
