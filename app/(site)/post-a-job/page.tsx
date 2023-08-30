"use client"
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import Editor from "./editor";


const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const

const FormSchema = z.object({
  language: z.string({
    required_error: "Please select a language.",
  }),
})

const PostAJob = () => {


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  return (
    <div className="container mx-auto my-8 max-w-5xl">
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
      <fieldset>
      <Card className={cn("rounded-md shadow-sm")}>
        <CardHeader className="">
          <CardTitle>Job Details</CardTitle>
          <CardDescription>Basic job details</CardDescription>
        </CardHeader>
        <CardContent>


        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : "Select language"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                      {languages.map((language) => (
                        <CommandItem
                          value={language.label}
                          key={language.value}
                          onSelect={() => {
                            form.setValue("language", language.value)
                          }}
                        >
                          {language.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              language.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          <Label>Job Title</Label>
          <Input className="w-96" placeholder="Prouct Engineer with Next.js Knowledge" />
          <Label>Contract Type</Label>
          <Input className="w-96" placeholder="Prouct Engineer with Next.js Knowledge" />
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
      <Card className={cn("rounded-md shadow-sm")}>
        <CardHeader className="">
          {/* <CardTitle>Company Details</CardTitle>
          <CardDescription>Basic company details</CardDescription> */}
        </CardHeader>
        <CardContent>
          <Button type="submit">
            Start Hiring
          </Button>
        </CardContent>
      </Card>

      </form>
    </Form>
    </div>
  );
};

export default PostAJob;
