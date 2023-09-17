import { Pencil2Icon } from "@radix-ui/react-icons";
import { formatDistance } from "date-fns";
import { Calendar, Dollar, Handbag, OpenInBrowser, WhiteFlag } from "iconoir-react";

import { Job } from "@/types/Job";
import { BASE_URL } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SocialShare } from "@/components/social-share";

type CardProps = React.ComponentProps<typeof Card> & {
  job: Job;
};

export function Sidebar({ className, job, ...props }: CardProps) {
  const getSalaryRange = () => {
    let min: number | undefined = 0;
    let max: number | undefined = 0;
    switch (job.salaryType) {
      case "hourly":
        min = job.salaryRange.salaryRangeHourly?.min;
        max = job.salaryRange.salaryRangeHourly?.max;
        break;
      case "project":
        min = job.salaryRange.salaryRangeProject?.min;
        max = job.salaryRange.salaryRangeProject?.max;
        break;
      case "yearly":
        min = job.salaryRange.salaryRangeYearly?.min;
        max = job.salaryRange.salaryRangeYearly?.max;
        break;

      default:
        min = job.salaryRange.salaryRangeHourly?.min;
        max = job.salaryRange.salaryRangeHourly?.max;
        break;
    }
    return (
      <p>
        {`${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
          min as number
        )}-${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
          max as number
        )}`}
      </p>
    );
  };

  const getHrefValue = () => {
    if (job.applyUrl.startsWith("http")) {
      return job.applyUrl;
    } else {
      return `mailto:${job.applyUrl}?subject=I'm%20interested%20in%20${job.title}&body=Hi%20${job.company.name}%0D%0A%0D%0AI'm%20%5BMY_NAME%5D%20and%20I%20saw%20on%20ProductEngineerJobs.co%20that%20you're%20looking%20for%20a%20${job.title}.%0D%0A%0D%0ALet%20me%20introduce%20myself%3A`;
    }
  };

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
              {getSalaryRange()}/{job.salaryType}
            </Badge>
            <Badge variant="secondary" className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1.5 h-5 w-5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
              {formatDistance(new Date(job.publishedAt), new Date(), { addSuffix: true })}
            </Badge>
          </div>
          {job.benefits ? (
            <div>
              <Separator />
              <h4 className="font-sm my-4 font-semibold leading-none tracking-tight">Benefits</h4>
              <ul className="flex flex-wrap items-baseline justify-start gap-1 gap-y-2">
                {job.benefits.map((benefit) => (
                  <li
                    key={benefit._id}
                    style={{
                      borderColor: `${benefit.color}20`,
                      backgroundColor: `${benefit.color}30`,
                      color: benefit.color,
                    }}
                    className="inline-flex cursor-default items-center rounded-md border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground saturate-50 transition transition-colors duration-100 hover:bg-secondary/80 hover:saturate-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    {benefit.title}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <Dialog>
            <DialogTrigger asChild>
              <Button size="xl">
                <OpenInBrowser className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" /> Apply
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Important! Do not ever pay for job interviews!</DialogTitle>
              </DialogHeader>
              <p className="my-2 text-foreground">
                We do our best to ensure that all jobs posted on ProductEngineerJobs.co are legitimate by manually
                reviewing each job post. However, you should also do your own due diligence when applying for any job.
              </p>
              <p className="my-2 text-foreground">
                No legitimate company will ever ask you to pay for a job interview. If you are asked to pay for a job,
                report it to us immediately.
              </p>
              <DialogFooter>
                <Button asChild>
                  <a target="_blank" href={getHrefValue()}>
                    I understand, continue with the application
                  </a>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <SocialShare text={`${job.title} via @prodengjobs`} url={`${BASE_URL}/${job.slug}`} />
          <Separator />
          <CardFooter className="w-full justify-stretch px-0 pb-0">
            <Button size="xs" variant="ghost" className="flex w-full text-destructive" asChild>
              <a
                href={`mailto:legal@productengineerjobs.co?subject=Reporting%20${job.title}&body=Hi%20There,%0D%0A%0D%0AI%20found%20something%20wrong%20with%20this%20job%20.%20${BASE_URL}/${job.slug}%0D%0A%0D%0AReport%20reason:%20`}
              >
                Report Job
              </a>
            </Button>
          </CardFooter>
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
