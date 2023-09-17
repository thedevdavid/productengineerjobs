import Dexie, { Table } from "dexie";
import { z } from "zod";

export const formSchema = z
  .object({
    title: z.string().min(1).max(255),
    category: z.enum(["platform-engineer", "product-engineer"]),
    tags: z.array(z.object({ _id: z.string(), value: z.string(), label: z.string(), color: z.string() })),
    location: z.string(),
    type: z.string(),
    contract: z.string(),
    applyUrl: z.string().min(1).max(255),
    benefits: z.array(z.object({ _id: z.string(), value: z.string(), label: z.string(), color: z.string() })),
    salaryType: z.enum(["hourly", "project", "yearly"]),
    salaryMin: z.coerce.number().gte(1).positive(),
    salaryMax: z.coerce.number().gte(1).positive(),
    companyName: z.string().min(1).max(255),
    companyTwitter: z.string().min(1).max(255),
    companyLogo: z.string().min(1).max(255),
    companyPrivateEmail: z.string().email().min(1).max(255),
    companyInvoiceEntity: z.string().min(1).max(255),
    companyInvoiceAddress: z.string().min(1).max(255),
    companyInvoiceVAT: z.string().min(1).optional(),
    companyInvoiceEmail: z.string().email().min(1).max(255),
    packageOptions: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select the default item.",
    }),
  })
  .partial({ companyTwitter: true, companyLogo: true });

export interface Job extends z.infer<typeof formSchema> {
  id: number;
  date: number;
}

// export class PEJobsDexie extends Dexie {
//   jobs!: Table<Job>;

//   constructor() {
//     super("productengineerjobs");
//     this.version(1).stores({
//       jobs: "++id, category, date", // Primary key and indexed props
//     });
//   }
// }

// export const db = new PEJobsDexie();
