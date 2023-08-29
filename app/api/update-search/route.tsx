import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import algoliasearch from "algoliasearch";
import indexer, { flattenBlocks } from "sanity-algolia";

import { Post } from "@/types/Post";

import { algolia } from "../../lib/algolia";

export async function POST(req) {
  try {
    const sanityAlgolia = indexer(
      {
        post: {
          index: algolia.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX),
        },
      },
      (document) => {
        switch (document._type) {
          case "post":
            return {
              title: document.title,
              path: document.slug,
              category: document.category.title,
            };
          default:
            throw new Error(`Unknown type: ${document.type}`);
        }
      }
    );

    const body = await req.json();

    const webhook = await sanityAlgolia.webhookSync(client, body);

    return webhook && NextResponse.json({ msg: "lessgoo" });
  } catch (err) {
    let error_response = {
      status: "error",
      msg: err,
    };
    return new NextResponse(JSON.stringify(error_response));
  }
}
