import { notFound } from "next/navigation";
import { ArrowUpCircle } from "iconoir-react";

import { Job } from "@/types/Job";
import { sanityFetch } from "@/lib/sanity.fetch";
import { jobsByLocationQuery } from "@/lib/sanity.queries";
import { EmptyList } from "@/components/empty-list";
import PostItem from "@/components/post-item";

export default async function JobsByLocation({ params }: { params: { slug: string } }) {
  const posts = await sanityFetch<Job[]>({
    query: jobsByLocationQuery,
    params: { slug: params.slug },
    tags: [`job`],
  });

  if (!posts) {
    notFound();
  }

  return (
    <div className="pb-10 sm:pt-20">
      <div className="container -mt-10 max-w-7xl">
        <div className="grid grid-cols-1 place-items-start justify-between gap-12 lg:grid-cols-3">
          <div className="col-span-1 w-full lg:col-span-3">
            <div className="mb-6 grid grid-flow-row gap-2">
              <h1 className="font-heading text-2xl font-bold leading-tight tracking-tight">All {params.slug} Jobs</h1>
              <div className="grid grid-cols-1 gap-4">
                {!posts.length ? <EmptyList /> : posts.map((post) => <PostItem key={post._id} post={post} />)}
              </div>
            </div>
            <p className="py-2 text-center text-sm text-muted-foreground">
              That&apos;s all for now <ArrowUpCircle className="inline h-4" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
