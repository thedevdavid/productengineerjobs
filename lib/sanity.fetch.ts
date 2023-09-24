import "server-only";

import type { QueryParams } from "@sanity/client";

import { revalidateSecret } from "@/lib/sanity.api";
import { client } from "@/lib/sanity.client";

export const token = process.env.SANITY_API_READ_TOKEN;

const DEFAULT_PARAMS = {} as QueryParams;
const DEFAULT_TAGS = [] as string[];

export async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
}: {
  query: string;
  params?: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {
    // We only cache if there's a revalidation webhook setup
    cache: revalidateSecret ? "force-cache" : "no-store",
    next: {
      //revalidate: 30, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  });
}
