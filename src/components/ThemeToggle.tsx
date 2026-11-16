"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="تغییر تم" onClick={() => setTheme(dark ? "light" : "dark")} className={`rounded-full text-inherit hover:bg-white/10 hover:text-inherit ${className}`}>
          <Sun className="size-5 hidden dark:block" /><Moon className="size-5 dark:hidden" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{dark ? "تم روشن" : "تم تیره"}</TooltipContent>
    </Tooltip>
  );
}
