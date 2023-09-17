import Link from "next/link";
import { EmptyPage } from "iconoir-react";

import { Button } from "@/components/ui/button";

type EmptyListProps = {
  title?: string;
  description?: string;
  buttonHref?: string | false;
  buttonText?: string;
};

export const EmptyList = ({
  title = "No jobs found",
  description = "That's a bummer but you can find more on the homepage.",
  buttonHref = "/",
  buttonText = "View All Jobs",
}: EmptyListProps) => {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto my-12 flex max-w-[420px] flex-col items-center justify-center space-y-2 text-center">
        <EmptyPage className="h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">{description}</p>
        {buttonHref && (
          <Button size="sm" asChild>
            <Link href={buttonHref}>{buttonText}</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
