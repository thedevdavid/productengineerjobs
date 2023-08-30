import { Pencil2Icon } from "@radix-ui/react-icons";
import { formatDistance } from "date-fns";
import { Calendar, Dollar, Handbag, Link, OpenInBrowser, WhiteFlag } from "iconoir-react";

import { Post } from "@/types/Post";
import { BASE_URL } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SocialShare } from "@/components/social-share";

type CardProps = React.ComponentProps<typeof Card> & {
  job: Post;
};

export function Sidebar({ className, job, ...props }: CardProps) {
  return (
    <>
      <Card className={cn("mb-4 rounded-md shadow-sm", className)} {...props}>
        <CardHeader>
          <CardTitle>Job details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex flex-wrap items-baseline justify-start gap-1 gap-y-2">
            <Badge variant="secondary" className="flex items-center text-sm text-muted-foreground">
              <Handbag className="mr-1.5 h-5 w-5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
              {job.type}
            </Badge>
            <Badge variant="secondary" className="flex items-center text-sm text-muted-foreground">
              <WhiteFlag className="mr-1.5 h-5 w-5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
              {job.location}
            </Badge>
            <Badge variant="secondary" className="flex items-center text-sm text-muted-foreground">
              <Pencil2Icon className="mr-1.5 h-5 w-5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
              {job.contract}
            </Badge>
            <Badge variant="secondary" className="flex items-center text-sm text-muted-foreground">
              <Dollar className="mr-1.5 h-5 w-5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
              {`$${job.salaryRange.salaryRangeHourly?.min}-$${job.salaryRange.salaryRangeHourly?.max}`}
            </Badge>
            <Badge variant="secondary" className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1.5 h-5 w-5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
              {formatDistance(new Date(job.publishedAt), new Date(), { addSuffix: true })}
            </Badge>
          </div>
          <Button asChild size="xl">
            <a target="_blank" href={job.applyUrl}>
              <OpenInBrowser className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" /> Apply
            </a>
          </Button>
          <SocialShare text={`${job.title} via @prodengjobs`} url={`${BASE_URL}/${job.slug}`} />
        </CardContent>
      </Card>
      <Card className={cn("mb-4 rounded-md shadow-sm", className)} {...props}>
        <CardHeader>
          <CardTitle>Get notified about new jobs</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <Button disabled type="submit" variant="secondary" className="w-full">
            Notify me
          </Button>
        </CardContent>
        <Separator />
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Sending weekly email about new jobs. You can unsubscribe at any time.
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
