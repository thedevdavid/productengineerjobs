"use client";

import { PortableText } from "@portabletext/react";
import { SanityDocument } from "@sanity/client";

import { portableTextComponents } from "./portable-text-components";

export default function Post({ post }: { post: SanityDocument }) {
  return (
    <div className="prose prose-lg prose-invert mx-auto p-4 font-sans">
      {post?.content ? <PortableText value={post.content} components={portableTextComponents} /> : null}
    </div>
  );
}
