import { cachedClient } from "@/sanity/lib/client";
import { groq } from "next-sanity";

import { Benefit, Job, Tag } from "@/types/Job";
import { Page } from "@/types/Page";

const jobPostFields = `
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
salaryType,
salaryRange
`;

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

export async function getTags(): Promise<Tag[]> {
  return cachedClient(
    groq`*[_type == "tag"] | order(title asc, _updatedAt desc){
      _id,
      title,
      "slug": slug.current,
      "color": color.hex
    }`
  );
}

export async function getBenefits(): Promise<Benefit[]> {
  return cachedClient(
    groq`*[_type == "benefit"] | order(title asc, _updatedAt desc){
      _id,
      title,
      "slug": slug.current,
      "color": color.hex
    }`
  );
}

export async function getPosts(): Promise<Job[]> {
  return cachedClient(
    groq`*[_type == "job"] | order(publishedAt desc, _updatedAt desc){
      ${jobPostFields}
    }`
  );
}

export const postsQuery = groq`*[_type == "job" && defined(slug.current)]{
  _id, title, slug
}`;

export const postQuery = groq`*[_type == "job" && slug.current == $slug][0]{
  title, mainImage, content
}`;

export const postPathsQuery = groq`*[_type == "job" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`;

export const pagePathsQuery = groq`*[_type == "page" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`;

export async function getPost(slug: string): Promise<Job> {
  return cachedClient(
    groq`*[_type == "job" && slug.current == $slug][0]{
        ${jobPostFields},
        applyUrl,
        content,
        tags[]->{
          _id,
          title,
          "slug": slug.current,
          "color": color.hex
        },
        benefits[]->{
          _id,
          title,
          "slug": slug.current,
          "color": color.hex
        }
    }`,
    { slug }
  );
}

export async function getMorePosts(slug: string): Promise<Job[]> {
  return cachedClient(
    groq`*[_type == "job" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc) [0...3] {
      _id,
      publishedAt,
      title,
      category->{title, slug},
      "slug": slug.current
    }`,
    { slug }
  );
}

// JOB POST FILTERED

export async function getPostsByCategory(category: string): Promise<Job[]> {
  return cachedClient(
    groq`*[_type == "job" && references(*[_type == "category" && slug.current == $category]._id)] | order(publishedAt desc, _updatedAt desc) {
      ${jobPostFields}
    }`,
    { category }
  );
}

export async function getPostsByType(type: string): Promise<Job[]> {
  return cachedClient(
    groq`*[_type == "job" && type == $type] | order(publishedAt desc, _updatedAt desc) {
      ${jobPostFields}
    }`,
    { type }
  );
}

export async function getPostsByContract(contract: string): Promise<Job[]> {
  return cachedClient(
    groq`*[_type == "job" && contract == $contract] | order(publishedAt desc, _updatedAt desc) {
      ${jobPostFields}
    }`,
    { contract }
  );
}

export async function getPostsByVerifiedCompaniesOnly(): Promise<Job[]> {
  return cachedClient(
    groq`*[_type == "job" && isVerified == true] | order(publishedAt desc, _updatedAt desc) {
      ${jobPostFields}
    }`
  );
}

export async function getPostsByLocation(country: string): Promise<Job[]> {
  return cachedClient(
    groq`*[_type == "job" && location == $country] | order(publishedAt desc, _updatedAt desc) {
      ${jobPostFields}
    }`,
    { country }
  );
}
