import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  console.log(res);

  // TODO: job active email
  // TODO: set automated emails for renewal reminders

  return NextResponse.json({ res });
}
