import { Benefit, Tag } from "@/types/Job";
import { sanityFetch } from "@/lib/sanity.fetch";
import { benefitsQuery, tagsQuery } from "@/lib/sanity.queries";

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
