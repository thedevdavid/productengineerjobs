"use client";

import { useState } from "react";
import { MultiSelectOptions } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookmarkIcon } from "@radix-ui/react-icons";
import { ArrowUnionVertical, Check, CheckCircle, Send } from "iconoir-react";
import { Field, useForm } from "react-hook-form";
import * as z from "zod";

import { Benefit, Tag } from "@/types/Job";
import { countriesAndRegions } from "@/lib/countries-and-regions";
import { formSchema } from "@/lib/db";
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
import { MultiSelect } from "@/components/multi-select";

// import { SavedJobsDialog } from "@/components/saved-jobs-dialog";

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

type JobFormProps = {
  tags: MultiSelectOptions[];
  benefits: MultiSelectOptions[];
};

export const JobForm = ({ tags, benefits }: JobFormProps) => {
  const [saveStatus, setSaveStatus] = useState(false);
  const [content] = useLocalStorage("productengineerjobs_jobpost__content", "");

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

  // async function onSavedJobsDialogOpen(isOpen: boolean) {
  //   console.log("modal open ", isOpen);
  // }

  // const handleLoad = async (id: number) => {
  //   try {
  //     await db.jobs.where("id").equals(id).toArray();
  //   } catch (error) {
  //     console.log("load indexeddb error ", error);
  //   }
  // };

  // async function onSave() {
  //   const now = Date.now();
  //   setSaveStatus("Saving...");

  //   const data: z.infer<typeof formSchema> = form.getValues();

  //   try {
  //     const id = await db.jobs.add({
  //       id: now,
  //       date: now,
  //       ...data,
  //     });

  //     console.log("indexeddb success ", id);
  //   } catch (error) {
  //     console.log("indexdb error", error);
  //   }
  //   // Simulate a delay in saving.
  //   setTimeout(() => {
  //     setSaveStatus("Saved");
  //   }, 500);
  //   toast({
  //     title: "Job post saved for later",
  //     description: (
  //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //         <code className="text-white">nice</code>
  //       </pre>
  //     ),
  //   });
  // }

  const onSelectMulti = (item: MultiSelectOptions[], formField: "tags" | "benefits") => {
    form.setValue(formField, item);
    // const currentItems = form.getValues(formField);
    // if (currentItems.includes(item.value)) {
    //   form.setValue(
    //     formField,
    //     currentItems.filter((i) => i !== item.value)
    //   );
    // } else {
    //   form.setValue(formField, [...currentItems, item.value]);
    // }
  };

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
      <div className="mb-8 flex flex-row items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Get your position listed now</h1>
          <p className="text-sm text-muted-foreground">It takes less than 10 minutes</p>
        </div>
        {/* <SavedJobsDialog handleLoad={handleLoad} onOpenChange={onSavedJobsDialogOpen} /> */}
      </div>
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
                    <FormControl>
                      <MultiSelect options={tags} onSelect={onSelectMulti} formField="tags" />
                    </FormControl>
                    {/* <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn("max-w-[256px] justify-between", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? tags.find((item) => item.value === field.value)?.label : "Select item"}
                            <ArrowUnionVertical className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[256px] p-0">
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
                    </Popover> */}
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
                            className={cn("max-w-[256px] justify-between", !field.value && "text-muted-foreground")}
                          >
                            {field.value
                              ? countriesAndRegions.find((item) => item.value === field.value)?.title
                              : "Select item"}
                            <ArrowUnionVertical className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[256px] p-0">
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
                    <FormLabel>How to apply</FormLabel>
                    <FormControl>
                      <Input placeholder="https://mycompany.com/apply" {...field} />
                    </FormControl>
                    <FormDescription>Email address or application form URL</FormDescription>
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
                storageKey="productengineerjobs_jobpost__content"
                onUpdate={() => {
                  setSaveStatus(false);
                }}
                onDebouncedUpdate={() => {
                  setTimeout(() => {
                    setSaveStatus(true);
                  }, 500);
                }}
              />
            </CardContent>
          </Card>
        </fieldset>
        <fieldset>
          <Card className={cn("h-auto flex-grow rounded-md shadow-sm")}>
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
                    <MultiSelect options={benefits} formField="benefits" onSelect={onSelectMulti} />
                    {/* <Popover>
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
                    </Popover> */}
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
            <CardFooter className="flex-col items-stretch space-y-4">
              <p className="text-sm text-muted-foreground">
                Job posts are a) published for 30 days, b) cannot be refunded, and c) renew automatically after 30 days
                unless you 1) disable auto renew after posting on the edit page, or 2) close your job post on the edit
                link. We send a reminder 7 days by email before renewing. Renewing is the same price as the original job
                post for 30 days + add-ons. Automatic renewals can be self-refunded within 7 days after renewing with
                the link in the email.
              </p>
            </CardFooter>
          </Card>
        </fieldset>
        <Card
          className={cn(
            " rounded-md border-foreground/25 bg-background/95 pt-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)] supports-[backdrop-filter]:bg-background/60 supports-[backdrop-filter]:bg-clip-padding supports-[backdrop-filter]:backdrop-blur"
          )}
        >
          <CardContent className="mx-auto flex max-w-5xl flex-row items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Almost done...</p>
            </div>
            <Button type="submit" disabled={form.formState.isSubmitting && form.formState.isSubmitted}>
              {form.formState.isSubmitting ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  className="mr-2 h-4 w-4 animate-spin"
                  viewBox="0 0 14 14"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 .88v2.5m-5 0l1.84 1.69M1 8.88l2.42-.9m.97 5.14l1.11-2.24m6.5-7.5l-1.84 1.69M13 8.88l-2.42-.9m-.97 5.14L8.5 10.88"
                  ></path>
                </svg>
              ) : (
                <Send className="mr-2" />
              )}
              Start Hiring
            </Button>
          </CardContent>
        </Card>

        {/* <Button onClick={onSave} variant="secondary">
            {saveStatus ? (
              <>
                <Check className="mr-2" /> Saved
              </>
            ) : (
              <>
                <BookmarkIcon className="mr-2" /> Save for later
              </>
            )}
          </Button> */}
      </form>
    </Form>
  );
};
