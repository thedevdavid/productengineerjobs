import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { getPost } from "@/sanity/queries";
import { PortableText } from "@portabletext/react";

import { Sidebar } from "@/components/job-sidebar";
import { portableTextComponents } from "@/components/portable-text-components";

type Props = {
  params: { slug: string };
};

export default async function JobPage({ params }: Props) {
  const job = await getPost(params.slug);

  return (
    <div className="container mx-auto my-20 grid max-w-7xl grid-cols-1 place-items-start justify-between gap-8 lg:grid-cols-3">
      <div className="col-span-1 w-full lg:col-span-2">
        <div className="flex items-center justify-start text-xl font-bold leading-7 text-foreground/70 sm:truncate sm:tracking-tight">
          <Image
            src={urlForImage(job.company.logo).url()}
            alt={job.company.name}
            width={100}
            height={100}
            className="mr-2 h-8 w-8 rounded-xl bg-foreground/20 p-1"
          />
          <h2>
            {job.company.name} is hiring a {job.type}
          </h2>
        </div>
        <h1 className="mb-6 mt-4 text-5xl font-bold">{job.title}</h1>
        <div className="mb-12 font-bold leading-7 text-foreground/70 sm:truncate sm:tracking-tight">
          <h2>Skillset</h2>
          <ul className="space-x-2">
            {job.tags.map((skill) => (
              <li
                key={skill._id}
                style={{
                  borderColor: `${skill.color}20`,
                  backgroundColor: `${skill.color}30`,
                  color: skill.color,
                }}
                className="inline-flex cursor-default items-center rounded-md border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground saturate-50 transition transition-colors duration-100 hover:bg-secondary/80 hover:saturate-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                {skill.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="prose max-w-none dark:prose-invert lg:prose-xl">
          <PortableText value={job.content} components={portableTextComponents} />
        </div>
      </div>
      <aside className="sticky top-20 w-full">
        <Sidebar job={job} />
      </aside>
    </div>
  );
}
