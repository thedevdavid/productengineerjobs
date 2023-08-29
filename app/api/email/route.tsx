import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import * as z from "zod";

import JobNotification from "@/components/emails/job-notification";

const sender = process.env.EMAIL_SENDER || "There's no sender!";

const resend = new Resend(process.env.EMAIL_API_KEY || "There's no API key!");

const sendRouteSchema = z.object({
  name: z.string().min(2),
  emailList: z.array(z.string().email()),
  newJobs: z.array(
    z.object({
      position: z.string().min(2),
      company: z.string().min(2),
      salary: z.string().min(2),
      url: z.string().min(2),
    })
  ),
});

export async function POST(req: NextRequest) {
  const { name, newJobs, emailList } = await req.json().then((body) => sendRouteSchema.parse(body));

  try {
    const data = await resend.emails.send({
      from: `ProductEngineerJobs.co <${sender}>`,
      to: [...emailList],
      subject: `New product engineer jobs for ${name}`,
      react: JobNotification({ name, newJobs }),
    });

    return NextResponse.json({ data, error: null }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
