import { sanityFetch } from "@/sanity/lib/client";
import { benefitsQuery, tagsQuery } from "@/sanity/queries";

import { Benefit, Tag } from "@/types/Job";

import { JobForm } from "./form";

const PostAJob = async () => {
  const tagRes = await sanityFetch<Tag[]>({
    query: tagsQuery,
    tags: [`tag`],
  });
  const benefitRes = await sanityFetch<Benefit[]>({
    query: benefitsQuery,
    tags: [`benefit`],
  });
  const tags = tagRes.map((tag) => ({ id: tag._id, label: tag.title, value: tag.slug.current, ...tag }));
  const benefits = benefitRes.map((benefit) => ({
    id: benefit._id,
    label: benefit.title,
    value: benefit.slug.current,
    ...benefit,
  }));

  return (
    <div className="container mx-auto my-8 max-w-5xl">
      <JobForm benefits={benefits} tags={tags} />
    </div>
  );
};

export default PostAJob;
