import { getTags } from "@/sanity/queries";

import { JobForm } from "./form";

const PostAJob = async () => {
  const tagRes = await getTags();
  const tags = tagRes.map((tag) => ({ label: tag.title, value: tag.slug.current }));

  return (
    <div className="container mx-auto my-8 max-w-5xl">
      <JobForm tags={tags} />
    </div>
  );
};

export default PostAJob;
