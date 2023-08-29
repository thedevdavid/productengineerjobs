import Link from "next/link";
import { formatDistance, subDays } from "date-fns";
import { VerifiedBadge } from "iconoir-react";

import { Post } from "@/types/Post";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const PostItem = ({ post }: { post: Post }) => {
  return (
    <Link href={`/job/${post.slug}`}>
      <Card className={cn("rounded-md shadow-sm")}>
        <CardHeader className="">
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="">
            <div className="flex flex-row items-center">
              <CardDescription>{post.company}</CardDescription>
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
              <Badge variant="outline">{post.contract}</Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground">
              {formatDistance(new Date(post.publishedAt), new Date(), { addSuffix: true })}
            </p>
            <p className="text-muted-foreground">{`$${post.salaryRange.salaryRangeHourly?.min}-$${post.salaryRange.salaryRangeHourly?.max}`}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostItem;
