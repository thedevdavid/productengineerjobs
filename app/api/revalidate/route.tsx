import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { revalidateSecret } from "@/sanity/lib/api";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string | undefined;
    }>(req, revalidateSecret);

    if (!isValidSignature) {
      const message = "Invalid signature";
      return new Response(JSON.stringify({ message, isValidSignature, body }), { status: 401 });
    }

    if (!body?._type) {
      const message = "Bad Request";
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    // If the `_type` is `page`, then all `client.fetch` calls with
    // `{next: {tags: ['page']}}` will be revalidated
    revalidateTag(body._type);
    if (body._type === "job") {
      revalidatePath("/");
      revalidatePath("/contract");
      revalidatePath("/location");
      revalidatePath("/position");
      revalidatePath("/type");
    } else if (body._type === "tag" || body._type === "benefit") {
      revalidatePath("/post-a-job");
    }
    if (body.slug) {
      revalidateTag(`${body._type}:${body.slug}`);
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (err: any) {
    console.error(err);
    return new Response(err.message, { status: 500 });
  }
}
