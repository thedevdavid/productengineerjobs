"use client";

import { useEffect, useState } from "react";
import { MoonSat, SunLight } from "iconoir-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      size="icon"
      variant="link"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="group hidden items-center justify-center border text-muted-foreground hover:bg-accent hover:text-accent-foreground sm:flex"
    >
      <span className="sr-only">Toggle dark/light mode</span>
      {theme !== "dark" ? (
        <MoonSat className="h-4 w-4 duration-300 group-hover:rotate-[360deg]" />
      ) : (
        <SunLight className="h-4 w-4 duration-300 group-hover:rotate-180" />
      )}
    </Button>
  );
}
