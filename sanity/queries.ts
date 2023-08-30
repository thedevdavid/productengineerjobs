import { cachedClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";

import { Page } from "@/types/Page";
import { Post } from "@/types/Post";

export async function getPages(): Promise<Page[]> {
  return cachedClient(
    groq`*[_type == "page"]{
      _id,
      title,
      "slug": slug.current
    }`
  );
}

export async function getPage(slug: string): Promise<Page> {
  return cachedClient(
    groq`*[_type == "page" && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      content
    }`,
    { slug }
  );
}
export async function getPosts(): Promise<Post[]> {
  return cachedClient(
    groq`*[_type == "post"] | order(publishedAt desc, _updatedAt desc){
      _id,
      title,
      isPromoted,
      isVerified,
      publishedAt,
      "slug": slug.current,
      category->{title, slug},
      company->{name, slug, logo, twitter},
      location,
      type,
      contract,
      salaryRange,
    }`
  );
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  return cachedClient(
    groq`*[_type == "post" && references(*[_type == "category" && slug.current == $category]._id)] | order(publishedAt desc, _updatedAt desc) {
      _id,
      publishedAt,
      title,
      category->{title, slug},
      "slug": slug.current
    }`,
    { category }
  );
}

export const postsQuery = groq`*[_type == "post" && defined(slug.current)]{
  _id, title, slug
}`;

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  title, mainImage, content
}`;

export const postPathsQuery = groq`*[_type == "post" && defined(slug.current)][]{
  "params": { "job": slug.current }
}`;

export const pagePathsQuery = groq`*[_type == "page" && defined(slug.current)][]{
  "params": { "page": slug.current }
}`;

export async function getPost(slug: string): Promise<Post> {
  return cachedClient(
    groq`*[_type == "post" && slug.current == $slug][0]{
        _id,
        title,
        isPromoted,
        isVerified,
        publishedAt,
        "slug": slug.current,
        category->{title, slug},
        company->{name, slug, logo, twitter},
        location,
        type,
        contract,
        applyUrl,
        salaryRange,
        content,
        tags[]->{
          _id,
          title,
          "slug": slug.current
        }
    }`,
    { slug }
  );
}

export async function getMorePosts(slug: string): Promise<Post[]> {
  return cachedClient(
    groq`*[_type == "post" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc) [0...3] {
      _id,
      publishedAt,
      title,
      category->{title, slug},
      "slug": slug.current
    }`,
    { slug }
  );
}
