import { getPage } from "@/sanity/queries";
import { PortableText } from "@portabletext/react";

import { portableTextComponents } from "@/components/portable-text-components";

type Props = {
  params: { page: string };
};

export default async function Page({ params }: Props) {
  const page = await getPage(params.page);

  return (
    <div className="container mx-auto my-20 max-w-5xl">
      <div className="prose max-w-none dark:prose-invert lg:prose-xl">
        <PortableText value={page.content} components={portableTextComponents} />
      </div>
    </div>
  );
}

export const revalidate = 60;
