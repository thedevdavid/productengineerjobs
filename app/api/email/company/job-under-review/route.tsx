import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  console.log(res);

  // TODO: job successfully paid, under review email

  return NextResponse.json({ res });
}
