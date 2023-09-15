import Link from "next/link";
import { EmptyPage } from "iconoir-react";

import { Button } from "@/components/ui/button";

export const EmptyList = () => {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto my-12 flex max-w-[420px] flex-col items-center justify-center space-y-2 text-center">
        <EmptyPage className="h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No jobs found</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          That&apos;s a bummer but you can find more on the homepage.
        </p>
        <Button size="sm" asChild>
          <Link href="/">View All Jobs</Link>
        </Button>
      </div>
    </div>
  );
};
