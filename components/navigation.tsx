"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { NavItem } from "@/types";

import siteMetadata from "@/lib/metadata";
import { cn, debounce } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Navbar } from "@/components/navbar";

const SCROLL_OFFSET = 200;

export function Navigation({ navigationLinks }: { navigationLinks: NavItem[] }) {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = useCallback(
    () =>
      debounce(() => {
        const currentScrollPos = window.scrollY;

        if ((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10) {
          setVisible(true);
        } else {
          setVisible(false);
        }

        setPrevScrollPos(currentScrollPos);
      }, 100),
    [prevScrollPos, setPrevScrollPos, setVisible]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 -bottom-32 z-20 mx-auto mb-4 px-4 transition-all duration-1000 animate-out sm:top-0 sm:h-16 sm:px-0 sm:transition-none",
          visible && "bottom-0 animate-in"
        )}
      >
        <div className="flex items-center gap-2 rounded-full border-b border-foreground/25 bg-background/95 px-3 py-2 shadow-md supports-[backdrop-filter]:bg-background/60 supports-[backdrop-filter]:bg-clip-padding supports-[backdrop-filter]:backdrop-blur sm:justify-between sm:rounded-none sm:px-3">
          <div className="container mx-auto flex max-w-7xl">
            <div className="flex items-center justify-start">
              <Link href="/" aria-label="Go to Home" className="font-extrabold hover:text-foreground/60">
                <svg
                  viewBox="0 0 390 390"
                  fill="currentColor"
                  className="mr-2 inline-block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M79 222V168H133H156H258V71H171V17H258H312V71V168V222H258H241H165H133H79ZM79 319V370V373H133V319H79ZM171 319V373H312V370V319H258H241H171ZM133 17H79V71H133V17Z"
                  />
                </svg>
                <span className="hidden md:inline">ProductEngineerJobs.co</span>
              </Link>
            </div>
            <div className="order-3 sm:order-2 sm:ml-auto">
              <nav className="ml-auto hidden space-x-6 text-sm font-medium sm:block sm:w-full">
                <Navbar navigationLinks={navigationLinks} />
              </nav>
              <nav className="sm:hidden">
                <MobileNav navigationLinks={navigationLinks} />
              </nav>
            </div>
            <div className="order-2 flex w-full items-center gap-2 sm:order-3 sm:w-fit">
              <Button asChild className="hidden md:flex">
                <Link href="/post-a-job">Post a Job</Link>
              </Button>
              {/* <ModeToggle /> */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
