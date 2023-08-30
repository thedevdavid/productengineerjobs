"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BookmarkIcon } from "@radix-ui/react-icons";
import { ArrowUnionVertical, Check, Send } from "iconoir-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { countriesAndRegions } from "@/lib/countries-and-regions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

import Editor from "./editor";

const formSchema = z.object({
  title: z.string().min(1).max(255),
  category: z.string(),
  tags: z.string(),
  location: z.string(),
  type: z.string(),
  contract: z.string(),
  benefits: z.string(),
  salaryType: z.string(),
  salaryMin: z.coerce.number(),
  salaryMax: z.number().gte(1),
  applyUrl: z.string().min(1).max(255),
  companyTitle: z.string().min(1).max(255),
  companyTwitter: z.string().min(1).max(255),
  companyLogo: z.string().min(1).max(255),
  companyPrivateEmail: z.string().email().min(1).max(255),
  companyInvoiceEntity: z.string().min(1).max(255),
  companyInvoiceAddress: z.string().min(1).max(255),
  companyInvoiceVAT: z.string().min(1).optional(),
  companyInvoiceEmail: z.string().email().min(1).max(255),
});

const tags = [
  { label: "Next.js", value: "nextjs" },
  { label: "React", value: "react" },
  { label: "React Native", value: "react-native" },
  { label: "Vercel", value: "vercel" },
  { label: "Tailwind.css", value: "tailwindcss" },
  { label: "SwiftUI", value: "swiftui" },
  { label: "Flutter", value: "flutter" },
  { label: "Supabase", value: "supabase" },
  { label: "Firebase", value: "firebase" },
  { label: "AWS", value: "aws" },
  { label: "UX", value: "ux" },
  { label: "Product Design", value: "product-design" },
];
const benefits = [
  { label: "Unlimited PTO", value: "unlimited-pto" },
  { label: "401(k)", value: "401k" },
  { label: "Async", value: "async" },
  { label: "4 Day Workweek", value: "4-day-workweek" },
];
export const JobForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      salaryMin: 1,
      salaryMax: 1,
      applyUrl: "string",
      companyTitle: "",
      companyTwitter: "string",
      companyLogo: "string",
      companyPrivateEmail: "string",
      companyInvoiceEntity: "string",
      companyInvoiceAddress: "string",
      companyInvoiceVAT: "string",
      companyInvoiceEmail: "string",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
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
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="Product Engineer for Startup" {...field} />
                    </FormControl>
                    <FormDescription>The Position</FormDescription>
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
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="platform-engineer" />
                          </FormControl>
                          <FormLabel className="font-normal">Platform Engineer</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="product-engineer" />
                          </FormControl>
                          <FormLabel className="font-normal">Product Engineer</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="sounds-like" />
                          </FormControl>
                          <FormLabel className="font-normal">Sounds like...</FormLabel>
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
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="remote" />
                          </FormControl>
                          <FormLabel className="font-normal">Remote</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="contract" />
                          </FormControl>
                          <FormLabel className="hybrid">Hybrid</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="on-site" />
                          </FormControl>
                          <FormLabel className="font-normal">On-Site</FormLabel>
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
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="full-time" />
                          </FormControl>
                          <FormLabel className="font-normal">Full-Time</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="contract" />
                          </FormControl>
                          <FormLabel className="font-normal">Contract</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="part-time" />
                          </FormControl>
                          <FormLabel className="font-normal">Part-Time</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="internship" />
                          </FormControl>
                          <FormLabel className="font-normal">Internship</FormLabel>
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
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Editor />
            </CardContent>
          </Card>
        </fieldset>
        <fieldset>
          <Card className={cn("rounded-md shadow-sm")}>
            <CardHeader className="">
              <CardTitle>Salary Details</CardTitle>
            </CardHeader>
            <CardContent>
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
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="hourly" />
                          </FormControl>
                          <FormLabel className="font-normal">Hourly</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yearly" />
                          </FormControl>
                          <FormLabel className="font-normal">Yearly</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="project" />
                          </FormControl>
                          <FormLabel className="font-normal">Project</FormLabel>
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
                      <Input type="number" placeholder="Select a value" {...field} />
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
                      <Input type="number" placeholder="Select a value" {...field} />
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
            <CardContent>
              <FormField
                control={form.control}
                name="companyTitle"
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
                    <FormLabel>Company Logo</FormLabel>
                    <FormControl>
                      <Input placeholder="TODO: Image" {...field} />
                    </FormControl>
                    <FormDescription>Possibly a 1:1 aspect ratio without background</FormDescription>
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
            </CardContent>
          </Card>
        </fieldset>
        <fieldset>
          <Card className={cn("rounded-md shadow-sm")}>
            <CardHeader className="">
              <CardTitle>Ready, set, go!</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between">
              <Button type="submit">
                <Send /> Start Hiring
              </Button>
              <Button variant="secondary">
                <BookmarkIcon /> Save for later
              </Button>
            </CardContent>
          </Card>
        </fieldset>
      </form>
    </Form>
  );
};