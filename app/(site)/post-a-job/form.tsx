"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookmarkIcon } from "@radix-ui/react-icons";
import { ArrowUnionVertical, Check, CheckCircle, Send } from "iconoir-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { countriesAndRegions } from "@/lib/countries-and-regions";
import { defaultEditorContent } from "@/lib/default-editor-content";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Editor } from "@/components/editor";

export type PackageOption = {
  id: string;
  label: string;
  description: string;
};

const packageOptions: PackageOption[] = [
  {
    id: "default",
    label: "30 day job post - $49 / month (package base, required)",
    description: "Automatically updating job post every 30 days.",
  },
  {
    id: "companyVerification",
    label: "Company Verification (+$99)",
    description: "Get a verified company badge on all your company job post.",
  },
  {
    id: "promoted",
    label: "Highlighted Post (+$19)",
    description: "Get the job post highlighted on the homepage for 30 days with a special badge & background color.",
  },
  {
    id: "emailBlast",
    label: "Email Blast (+$19)",
    description: "Send an immediate email to 512 product engineers looking for job.",
  },
];

const formSchema = z
  .object({
    title: z.string().min(1).max(255),
    category: z.string(),
    tags: z.string(),
    location: z.string(),
    type: z.string(),
    contract: z.string(),
    applyUrl: z.string().min(1).max(255),
    benefits: z.string(),
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

const benefits = [
  { label: "Unlimited PTO", value: "unlimited-pto" },
  { label: "401(k)", value: "401k" },
  { label: "Async", value: "async" },
  { label: "4 Day Workweek", value: "4-day-workweek" },
];

type JobFormProps = {
  tags: {
    label: string;
    value: string;
  }[];
};

export const JobForm = ({ tags }: JobFormProps) => {
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [content, setContent] = useLocalStorage("productengineerjobs_jobpost__content", "");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "remote",
      category: "product-engineer",
      contract: "contract",
      salaryMin: 25,
      salaryMax: 65,
      applyUrl: "",
      companyName: "",
      companyTwitter: "",
      companyLogo: "",
      companyPrivateEmail: "",
      companyInvoiceEntity: "",
      companyInvoiceAddress: "",
      companyInvoiceVAT: "",
      companyInvoiceEmail: "",
      packageOptions: ["default"],
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const res = await fetch("/api/job-submission", {
      method: "POST",
      body: JSON.stringify({ ...data, content: content }),
    });
    const result = await res.json();

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(result, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <fieldset>
          <Card className={cn("rounded-md shadow-sm")}>
            <CardHeader className="">
              <CardTitle>Job Details</CardTitle>
              <CardDescription>Please be detailed. Candidates love good descriptions.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Product Engineer with Next.js Knowledge" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please add a specific knowledge or company type. Examples: &quot;Product Engineer for YC
                      Startup&quot; or &quot;Platform Engineer with Shopify Knowledge&quot;
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-wrap">
                        <FormItem className="flex space-x-1 space-y-1">
                          <FormControl>
                            <RadioGroupItem value="platform-engineer" className="peer hidden" />
                          </FormControl>
                          <FormLabel className="block cursor-pointer rounded-md border border-border p-4 font-normal shadow-sm hover:border-primary peer-aria-checked:border-primary peer-aria-checked:ring-1 peer-aria-checked:ring-ring">
                            <CheckCircle className="mr-2 hidden h-4 w-4 peer-aria-checked:inline" />
                            Platform Engineer
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex space-x-1 space-y-1">
                          <FormControl>
                            <RadioGroupItem value="product-engineer" className="peer hidden" />
                          </FormControl>
                          <FormLabel className="block cursor-pointer rounded-md border border-border p-4 font-normal shadow-sm hover:border-primary peer-aria-checked:border-primary peer-aria-checked:ring-1 peer-aria-checked:ring-ring">
                            <CheckCircle className="mr-2 hidden h-4 w-4 peer-aria-checked:inline" />
                            Product Engineer
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tags</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? tags.find((item) => item.value === field.value)?.label : "Select item"}
                            <ArrowUnionVertical className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search tags..." />
                          <CommandEmpty>No tags found.</CommandEmpty>
                          <CommandGroup>
                            {tags.map((item) => (
                              <CommandItem
                                value={item.label}
                                key={item.value}
                                onSelect={() => {
                                  form.setValue("tags", item.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    item.value === field.value ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {item.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Skills, technologies, stack, platform, etc.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Location</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}
                          >
                            {field.value
                              ? countriesAndRegions.find((item) => item.value === field.value)?.title
                              : "Select item"}
                            <ArrowUnionVertical className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search location..." />
                          <CommandEmpty>No location found.</CommandEmpty>
                          <CommandGroup>
                            {countriesAndRegions.map((item) => (
                              <CommandItem
                                value={item.title}
                                key={item.value}
                                onSelect={() => {
                                  form.setValue("location", item.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    item.value === field.value ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {item.title}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>Any geographical restrictions</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work from...</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-wrap">
                        <FormItem className="flex space-x-1 space-y-1">
                          <FormControl>
                            <RadioGroupItem value="remote" className="peer hidden" />
                          </FormControl>
                          <FormLabel className="block cursor-pointer rounded-md border border-border p-4 font-normal shadow-sm hover:border-primary peer-aria-checked:border-primary peer-aria-checked:ring-1 peer-aria-checked:ring-ring">
                            <CheckCircle className="mr-2 hidden h-4 w-4 peer-aria-checked:inline" />
                            🏖️ Remote
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex space-x-1 space-y-1">
                          <FormControl>
                            <RadioGroupItem value="hybrid" className="peer hidden" />
                          </FormControl>
                          <FormLabel className="block cursor-pointer rounded-md border border-border p-4 font-normal shadow-sm hover:border-primary peer-aria-checked:border-primary peer-aria-checked:ring-1 peer-aria-checked:ring-ring">
                            <CheckCircle className="mr-2 hidden h-4 w-4 peer-aria-checked:inline" />
                            🤏 Hybrid
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex space-x-1 space-y-1">
                          <FormControl>
                            <RadioGroupItem value="on-site" className="peer hidden" />
                          </FormControl>
                          <FormLabel className="block cursor-pointer rounded-md border border-border p-4 font-normal shadow-sm hover:border-primary peer-aria-checked:border-primary peer-aria-checked:ring-1 peer-aria-checked:ring-ring">
                            <CheckCircle className="mr-2 hidden h-4 w-4 peer-aria-checked:inline" />
                            🏢 On-Site
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>Office, remote, or a little bit of both?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contract"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Contract Type</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-wrap">
                        <FormItem className="flex space-x-1 space-y-1">
                          <FormControl>
                            <RadioGroupItem value="full-time" className="peer hidden" />
                          </FormControl>
                          <FormLabel className="block cursor-pointer rounded-md border border-border p-4 font-normal shadow-sm hover:border-primary peer-aria-checked:border-primary peer-aria-checked:ring-1 peer-aria-checked:ring-ring">
                            <CheckCircle className="mr-2 hidden h-4 w-4 peer-aria-checked:inline" />
                            Full-Time
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex space-x-1 space-y-1">
                          <FormControl>
                            <RadioGroupItem value="contract" className="peer hidden" />
                          </FormControl>
                          <FormLabel className="block cursor-pointer rounded-md border border-border p-4 font-normal shadow-sm hover:border-primary peer-aria-checked:border-primary peer-aria-checked:ring-1 peer-aria-checked:ring-ring">
                            <CheckCircle className="mr-2 hidden h-4 w-4 peer-aria-checked:inline" />
                            Contract
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex space-x-1 space-y-1">
                          <FormControl>
                            <RadioGroupItem value="part-time" className="peer hidden" />
                          </FormControl>
                          <FormLabel className="block cursor-pointer rounded-md border border-border p-4 font-normal shadow-sm hover:border-primary peer-aria-checked:border-primary peer-aria-checked:ring-1 peer-aria-checked:ring-ring">
                            <CheckCircle className="mr-2 hidden h-4 w-4 peer-aria-checked:inline" />
                            Part-Time
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex space-x-1 space-y-1">
                          <FormControl>
                            <RadioGroupItem value="internship" className="peer hidden" />
                          </FormControl>
                          <FormLabel className="block cursor-pointer rounded-md border border-border p-4 font-normal shadow-sm hover:border-primary peer-aria-checked:border-primary peer-aria-checked:ring-1 peer-aria-checked:ring-ring">
                            <CheckCircle className="mr-2 hidden h-4 w-4 peer-aria-checked:inline" />
                            Internship
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="applyUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://mycompany.com/apply" {...field} />
                    </FormControl>
                    <FormDescription>The website for applicants to send their data</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </fieldset>
        <fieldset>
          <Card className={cn("rounded-md shadow-sm")}>
            <CardHeader className="">
              <CardTitle>Post Content</CardTitle>
              <CardDescription>Detailed job description with requirements, and benefits</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6">
              <Editor
                defaultValue={defaultEditorContent}
                onUpdate={() => {
                  setSaveStatus("Unsaved");
                }}
                onDebouncedUpdate={() => {
                  setSaveStatus("Saving...");
                  // Simulate a delay in saving.
                  setTimeout(() => {
                    setSaveStatus("Saved");
                  }, 500);
                }}
              />
            </CardContent>
          </Card>
        </fieldset>
        <fieldset>
          <Card className={cn("rounded-md shadow-sm")}>
            <CardHeader className="">
              <CardTitle>Salary Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="benefits"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Benefits</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? benefits.find((item) => item.value === field.value)?.label : "Select item"}
                            <ArrowUnionVertical className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search benefits..." />
                          <CommandEmpty>No benefits found.</CommandEmpty>
                          <CommandGroup>
                            {benefits.map((item) => (
                              <CommandItem
                                value={item.label}
                                key={item.value}
                                onSelect={() => {
                                  form.setValue("benefits", item.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    item.value === field.value ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {item.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>The convincing stuff</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salaryType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Salary Type</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-wrap">
                        <FormItem className="flex space-x-1 space-y-1">
                          <FormControl>
                            <RadioGroupItem value="hourly" className="peer hidden" />
                          </FormControl>
                          <FormLabel className="block cursor-pointer rounded-md border border-border p-4 font-normal shadow-sm hover:border-primary peer-aria-checked:border-primary peer-aria-checked:ring-1 peer-aria-checked:ring-ring">
                            <CheckCircle className="mr-2 hidden h-4 w-4 peer-aria-checked:inline" />
                            Hourly
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex space-x-1 space-y-1">
                          <FormControl>
                            <RadioGroupItem value="yearly" className="peer hidden" />
                          </FormControl>
                          <FormLabel className="block cursor-pointer rounded-md border border-border p-4 font-normal shadow-sm hover:border-primary peer-aria-checked:border-primary peer-aria-checked:ring-1 peer-aria-checked:ring-ring">
                            <CheckCircle className="mr-2 hidden h-4 w-4 peer-aria-checked:inline" />
                            Yearly
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex space-x-1 space-y-1">
                          <FormControl>
                            <RadioGroupItem value="project" className="peer hidden" />
                          </FormControl>
                          <FormLabel className="block cursor-pointer rounded-md border border-border p-4 font-normal shadow-sm hover:border-primary peer-aria-checked:border-primary peer-aria-checked:ring-1 peer-aria-checked:ring-ring">
                            <CheckCircle className="mr-2 hidden h-4 w-4 peer-aria-checked:inline" />
                            Project
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salaryMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Range Min</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={9999999} placeholder="Select a value" {...field} />
                    </FormControl>
                    <FormDescription>Minimum paid (USD)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salaryMax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary Range Max</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={9999999} placeholder="Select a value" {...field} />
                    </FormControl>
                    <FormDescription>Maximum paid (USD)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </fieldset>
        <fieldset>
          <Card className={cn("rounded-md shadow-sm")}>
            <CardHeader className="">
              <CardTitle>Company Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Pier 418" {...field} />
                    </FormControl>
                    <FormDescription>Company Name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyTwitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Twitter</FormLabel>
                    <FormControl>
                      <Input placeholder="@thedevdavid" {...field} />
                    </FormControl>
                    <FormDescription>Just the handle</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyLogo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Logo URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://mycompany.com/logo.svg" {...field} />
                    </FormControl>
                    <FormDescription>
                      From your website or a public Google Drive link. Possibly a 1:1 aspect ratio without background
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyPrivateEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Private Contact Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Private Contact Email" {...field} />
                    </FormControl>
                    <FormDescription>Will NOT be visible for applicants. Only admin.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </fieldset>
        <fieldset>
          <Card className={cn("rounded-md shadow-sm")}>
            <CardHeader className="">
              <CardTitle>Payment & Invoicing</CardTitle>
              <CardDescription>Last step to get your job published</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="companyInvoiceEntity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Invoice Entity</FormLabel>
                      <FormControl>
                        <Input placeholder="Pier 418 OÜ" {...field} />
                      </FormControl>
                      <FormDescription>Legal name of the company to invoice</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyInvoiceAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Invoice Address</FormLabel>
                      <FormControl>
                        <Input placeholder="15551 Sepapaja 6, Tallinn, EE" {...field} />
                      </FormControl>
                      <FormDescription>Legal address</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyInvoiceVAT"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Invoice VAT</FormLabel>
                      <FormControl>
                        <Input placeholder="EE12345678" {...field} />
                      </FormControl>
                      <FormDescription>VAT number or TAX ID (if you have)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyInvoiceEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Invoice Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Company Invoice Email" {...field} />
                      </FormControl>
                      <FormDescription>Email address for INVOICING purposes</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator className="my-4" />
              <FormField
                control={form.control}
                name="packageOptions"
                render={() => (
                  <FormItem className="">
                    <div className="mb-6">
                      <FormLabel className="text-base">Package & Add-ons</FormLabel>
                      <FormDescription>Pick the best package options for you.</FormDescription>
                    </div>

                    {packageOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="packageOptions"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0 rounded border p-4 shadow"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={item.id === "default" || field.value?.includes(item.id)}
                                  disabled={item.id === "default"}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item.id])
                                      : field.onChange(field.value?.filter((value) => value !== item.id));
                                  }}
                                />
                              </FormControl>

                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-medium">{item.label}</FormLabel>

                                <FormDescription>{item.description}</FormDescription>
                              </div>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Job posts are a) published for 30 days, b) cannot be refunded, and c) renew automatically after 30 days
              unless you 1) disable auto renew after posting on the edit page, or 2) close your job post on the edit
              link. We send a reminder 7 days by email before renewing. Renewing is the same price as the original job
              post for 30 days + add-ons. Automatic renewals can be self-refunded within 7 days after renewing with the
              link in the email.
            </CardFooter>
          </Card>
        </fieldset>
        <fieldset>
          <Card className={cn("rounded-md shadow-sm")}>
            <CardHeader className="">
              <CardTitle>Ready, set, go!</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between">
              <Button type="submit">
                <Send className="mr-2" /> Start Hiring
              </Button>
              <Button variant="secondary">
                <BookmarkIcon className="mr-2" /> Save for later
              </Button>
            </CardContent>
          </Card>
        </fieldset>
      </form>
    </Form>
  );
};
