import { ArrowUpCircle } from "iconoir-react";

import { Job } from "@/types/Job";
import { sanityFetch } from "@/lib/sanity.fetch";
import { jobsQuery } from "@/lib/sanity.queries";
import { EmptyList } from "@/components/empty-list";
import Hero from "@/components/hero";
import PostItem from "@/components/post-item";

export default async function Home() {
  const jobs = await sanityFetch<Job[]>({
    query: jobsQuery,
    tags: [`job`],
  });

  return (
    <div className="pb-10">
      <Hero />
      <div className="container -mt-10 max-w-7xl">
        <div className="grid grid-cols-1 place-items-start justify-between gap-12 lg:grid-cols-3">
          <div className="col-span-1 w-full lg:col-span-3">
            <div className="mb-6 grid grid-flow-row gap-2">
              <h2 className="font-heading text-2xl font-bold leading-tight tracking-tight">All Jobs</h2>
              <div className="grid grid-cols-1 gap-4">
                {!jobs.length ? <EmptyList /> : jobs.map((job) => <PostItem key={job._id} post={job} />)}
              </div>
            </div>
            <p className="py-2 text-center text-sm text-muted-foreground">
              That&apos;s all for now <ArrowUpCircle className="inline h-4" />
            </p>
          </div>
          {/* <aside className="w-full">
            <Sidebar />
          </aside> */}
        </div>
      </div>
    </div>
  );
}
