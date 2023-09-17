import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  console.log(res);

  // TODO: stripe payment
  // TODO: onSuccess: stripe long-lived customer portal URL
  // TODO: onSuccess: airtable submission
  // TODO: onSuccess: auto-email to company

  return NextResponse.json({ res });
}
