import Link from "next/link";
import { ArrowRight } from "iconoir-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "@/components/home-sidebar";
import { Searchbar } from "@/components/searchbar";

export default async function Home() {
  return (
    <div className="pb-10">
      <div className="container flex max-w-7xl flex-col items-center justify-center text-center sm:py-20">
        <h1 className="mb-2 flex items-center text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
          Search
          <span className="relative ml-3 h-[1em] w-64 overflow-hidden">
            <span className="animate-slide absolute h-full w-full -translate-y-full leading-none [animation-delay:0.83s]">
              Product
            </span>
            <span className="animate-slide absolute h-full w-full -translate-y-full leading-none [animation-delay:1.83s]">
              Platform
            </span>
          </span>{" "}
          Engineer Jobs
        </h1>
        <div className="flex content-center items-center justify-center">
          <Searchbar />
        </div>
      </div>
      <div className="container mt-12 max-w-7xl">
        <div className="grid grid-cols-1 place-items-start justify-between gap-12 lg:grid-cols-3">
          <div className="col-span-1 w-full lg:col-span-2">
            <div className="grid grid-flow-row gap-2">
              <h2 className="font-heading text-2xl font-bold leading-tight tracking-tight">Featured Jobs</h2>
              <p className="text-muted-foreground">These are the latest jobs posted on Product Engineer Jobs.</p>
              <div className=" grid grid-cols-1 gap-4">
                <Link href="/posts/1">
                  <Card className={cn("rounded-md py-4 shadow-sm")}>
                    <CardContent className="flex items-center justify-between">
                      <div className="">
                        <CardTitle>Product Engineer</CardTitle>
                        <CardDescription>ScreamingBox</CardDescription>
                        <div className="mt-3 space-x-2">
                          <Badge variant="default">Hourly</Badge>
                          <Badge variant="secondary">Remote</Badge>
                          <Badge variant="outline">Contract</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground">2 days ago</p>
                        <p className="text-muted-foreground">$45-65</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/posts/1">
                  <Card className={cn("mb-4 rounded-md shadow-sm")}>
                    <CardHeader>
                      <CardTitle>Product Engineer</CardTitle>
                      <CardDescription>ScreamingBox</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                      <div className="space-x-2">
                        <Badge variant="default">Hourly</Badge>
                        <Badge variant="secondary">Remote</Badge>
                        <Badge variant="outline">Contract</Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <p className="text-muted-foreground">$45-65</p>
                      <p className="text-muted-foreground">2 days ago</p>
                    </CardFooter>
                  </Card>
                </Link>
              </div>
            </div>
            <Link
              href="/posts"
              className="group flex items-center py-2 text-sm text-accent-foreground underline-offset-4 hover:text-muted-foreground hover:underline"
            >
              See all jobs <ArrowRight className="ml-2 h-4 w-4 duration-100 ease-in group-hover:translate-x-1" />
            </Link>
          </div>
          <aside className="w-full">
            <Sidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}
