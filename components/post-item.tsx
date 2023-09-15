import Link from "next/link";
import { formatDistance } from "date-fns";
import { VerifiedBadge } from "iconoir-react";

import { Job } from "@/types/Job";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const PostItem = ({ post }: { post: Job }) => {
  const getSalaryRange = () => {
    let min: number | undefined = 0;
    let max: number | undefined = 0;
    switch (post.salaryType) {
      case "hourly":
        min = post.salaryRange.salaryRangeHourly?.min;
        max = post.salaryRange.salaryRangeHourly?.max;
        break;
      case "project":
        min = post.salaryRange.salaryRangeProject?.min;
        max = post.salaryRange.salaryRangeProject?.max;
        break;
      case "yearly":
        min = post.salaryRange.salaryRangeYearly?.min;
        max = post.salaryRange.salaryRangeYearly?.max;
        break;

      default:
        min = post.salaryRange.salaryRangeHourly?.min;
        max = post.salaryRange.salaryRangeHourly?.max;
        break;
    }
    return (
      <p className="text-muted-foreground">
        {`${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
          min as number
        )}-${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
          max as number
        )}`}
      </p>
    );
  };

  return (
    <Link href={`/job/${post.slug}`} className="w-full">
      <Card className={cn("relative rounded-md shadow-sm", post.isPromoted && "bg-primary/20")}>
        <CardHeader className="">
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          {post.isPromoted && (
            <Badge variant="outline" className="absolute right-3 top-3">
              Promoted
            </Badge>
          )}
          <div className="">
            <div className="flex flex-row items-center">
              <CardDescription>{post.company.name}</CardDescription>
              {post.isVerified && (
                <Tooltip>
                  <TooltipTrigger>
                    <VerifiedBadge className="ml-1 h-3 w-3 text-sm text-accent-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-background">Verified company</TooltipContent>
                </Tooltip>
              )}
            </div>
            <div className="mt-3 space-x-2">
              <Badge variant="default">{post.location}</Badge>
              <Badge variant="secondary">{post.type}</Badge>
              <Badge variant="secondary">{post.contract}</Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground">
              {formatDistance(new Date(post.publishedAt), new Date(), { addSuffix: true })}
            </p>
            {getSalaryRange()}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostItem;
