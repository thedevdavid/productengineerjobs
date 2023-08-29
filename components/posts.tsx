import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight } from "iconoir-react";

import { Post } from "@/types/Post";

export default function Posts({ posts = [] }: { posts: Post[] }) {
  return (
    <section className="container mx-auto max-w-6xl">
      <div className="divide-y-2 divide-gray-100">
        {posts.map((post) => (
          <div key={post._id} className="flex flex-wrap py-8 font-sans text-primary md:flex-nowrap">
            <div className="mb-6 flex flex-shrink-0 flex-col md:mb-0 md:w-64">
              <p className="font-semibold">
                in:{" "}
                <Link href={`/support/category/${post.category.slug.current}`}>
                  {post.category.title.toLowerCase()}
                </Link>
              </p>
              <time className="mt-1 text-sm text-muted-foreground" dateTime={post?.publishedAt?.toString()}>
                {format(new Date(post.publishedAt), "LLLL d, yyyy")}
              </time>
              <p className="mt-1 text-sm text-muted-foreground">Apply</p>
            </div>
            <div className="md:flex-grow">
              <h2 className="title-font mb-2 text-2xl font-extrabold capitalize">{post.title}</h2>
              <p className="line-clamp-3 leading-relaxed">asdsdd</p>
              <Link
                href={`/support/${post.slug}`}
                className="hover:unerline mt-4 inline-flex items-center text-secondary transition-all duration-150 hover:translate-x-1"
              >
                Read More <ArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
