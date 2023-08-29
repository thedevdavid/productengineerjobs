import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { getPost, postPathsQuery } from "@/sanity/queries";
import { PortableText } from "@portabletext/react";
import { formatDistance } from "date-fns";
import { Calendar, CheckCircle, Dollar, EditPencil, Handbag, Link, Pin } from "iconoir-react";

import { Button } from "@/components/ui/button";
import { portableTextComponents } from "@/components/portable-text-components";

type Props = {
  params: { slug: string };
};

export default async function JobPage({ params }: Props) {
  const job = await getPost(params.slug);

  return (
    <div className="container mx-auto my-20 max-w-5xl">
      <h1 className="text-4xl font-bold">{job.title}</h1>
      <div className="mb-8 mt-6 lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-start text-xl font-bold leading-7 text-foreground/70 sm:truncate sm:text-3xl sm:tracking-tight">
            <Image
              src={urlForImage(job.companyLogo).url()}
              alt={job.company}
              width={100}
              height={100}
              className="mr-2 h-8 w-8 rounded-md bg-foreground/70 p-1"
            />
            <h2>{job.company}</h2>
          </div>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <Handbag className="mr-1.5 h-5 w-5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
              {job.type}
            </div>
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <Pin className="mr-1.5 h-5 w-5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
              {job.location}
            </div>
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <Pin className="mr-1.5 h-5 w-5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
              {job.contract}
            </div>
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <Dollar className="mr-1.5 h-5 w-5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
              {`$${job.salaryRange.salaryRangeHourly?.min}-$${job.salaryRange.salaryRangeHourly?.max}`}
            </div>
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1.5 h-5 w-5 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
              {formatDistance(new Date(job.publishedAt), new Date(), { addSuffix: true })}
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className="ml-3 hidden sm:block">
            <Button asChild variant="outline">
              <a href={job.applyUrl}>
                <Link className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" /> Share
              </a>
            </Button>
          </span>

          <span className="sm:ml-3">
            <Button asChild>
              <a href={job.applyUrl}>Apply</a>
            </Button>
          </span>
        </div>
      </div>
      <div className="prose max-w-none dark:prose-invert lg:prose-xl">
        <PortableText value={job.content} components={portableTextComponents} />
      </div>
    </div>
  );
}

export const revalidate = 60;
