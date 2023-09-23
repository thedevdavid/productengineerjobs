import { groq } from "next-sanity";

export const pagePathsQuery = groq`
  *[_type == "page" && slug.current != null].slug.current
`;

export const jobPathsQuery = groq`
  *[_type == "job" && slug.current != null].slug.current
`;

export const jobSitemapQuery = groq`
  *[_type == "job"] | order(publishedAt desc, _updatedAt desc) {
    _updatedAt,
    publishedAt,
    "slug": slug.current
  }
`;

export const pagesSitemapQuery = groq`
  *[_type == "page"] | order(publishedAt desc, _updatedAt desc) {
    _updatedAt,
    publishedAt,
    "slug": slug.current
  }
`;

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

export const pagesQuery = groq`
  *[_type == "page"] | order(publishedAt desc, _updatedAt desc) {
    _id,
    title,
    "slug": slug.current
  }
`;

export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    content
  }
`;

export const tagsQuery = groq`
  *[_type == "tag"] | order(title asc, _updatedAt desc){
    _id,
    title,
    "slug": slug.current,
    "color": color.hex
  }
`;

export const benefitsQuery = groq`
  *[_type == "benefit"] | order(title asc, _updatedAt desc){
    _id,
    title,
    "slug": slug.current,
    "color": color.hex
  }
`;

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc, _updatedAt desc){
    _id,
    title,
    "slug": slug.current
  }
`;

export const jobsQuery = groq`
  *[_type == "job"] | order(publishedAt desc, _updatedAt desc){
    ${jobPostFields}
  }
`;

export const jobBySlugQuery = groq`
  *[_type == "job" && slug.current == $slug][0]{
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
  }
`;

// JOB POST FILTERED

export const jobsByCategoryQuery = groq`
  *[_type == "job" && references(*[_type == "category" && slug.current == $slug]._id)] | order(publishedAt desc, _updatedAt desc){
    ${jobPostFields}
  }
`;

export const jobsByTypeQuery = groq`
  *[_type == "job" && type == $slug] | order(publishedAt desc, _updatedAt desc){
    ${jobPostFields}
  }
`;

export const jobsByContractQuery = groq`
  *[_type == "job" && contract == $slug] | order(publishedAt desc, _updatedAt desc){
    ${jobPostFields}
  }
`;

export const jobsByVerifiedCompaniesOnlyQuery = groq`
  *[_type == "job" && isVerified == true] | order(publishedAt desc, _updatedAt desc){
    ${jobPostFields}
  }
`;

export const jobsByRemoteOnlyQuery = groq`
  *[_type == "job" && type == "remote"] | order(publishedAt desc, _updatedAt desc){
    ${jobPostFields}
  }
`;

export const jobsByLocationQuery = groq`
  *[_type == "job" && location == $slug] | order(publishedAt desc, _updatedAt desc){
    ${jobPostFields}
  }
`;
