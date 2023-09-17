import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  console.log(res);

  // TODO: job renewal reminder email at 14, 28, and 84 days

  return NextResponse.json({ res });
}
