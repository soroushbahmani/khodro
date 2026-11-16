"use client";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="kg-theme" disableTransitionOnChange>
      <TooltipProvider delayDuration={150}>
        {children}
        <Toaster position="top-center" dir="rtl" richColors />
      </TooltipProvider>
    </ThemeProvider>
  );
}
