import Link from "next/link";
import { getPosts } from "@/sanity/queries";
import { ArrowRight } from "iconoir-react";

import Hero from "@/components/hero";
import { Sidebar } from "@/components/home-sidebar";
import PostItem from "@/components/post-item";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="pb-10">
      <Hero />
      <div className="container mt-12 max-w-7xl">
        <div className="grid grid-cols-1 place-items-start justify-between gap-12 lg:grid-cols-3">
          <div className="col-span-1 w-full lg:col-span-2">
            <div className="grid grid-flow-row gap-2">
              <h2 className="font-heading text-2xl font-bold leading-tight tracking-tight">Featured Jobs</h2>
              <p className="text-muted-foreground">These are the latest jobs posted on Product Engineer Jobs.</p>
              <div className=" grid grid-cols-1 gap-4">
                {!posts.length ? (
                  <p className="text-muted-foreground">No jobs found.</p>
                ) : (
                  posts.map((post) => <PostItem key={post._id} post={post} />)
                )}
              </div>
            </div>
            <Link
              href="/posts"
              className="group flex items-center py-2 text-sm text-accent-foreground underline-offset-4 hover:text-muted-foreground hover:underline"
            >
              See all jobs <ArrowRight className="ml-2 h-4 w-4 duration-100 ease-in group-hover:translate-x-1" />
            </Link>
          </div>
          <aside className="w-full">
            <Sidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}
