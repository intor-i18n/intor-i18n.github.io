"use client";

import { Link } from "intor/next";
import { cn } from "@/applications/shadcn/lib/utils";
import { SidebarTrigger } from "@/interfaces/components/shadcn/sidebar";
import { I18nSelector } from "@/interfaces/components/ui/layout/navbar/i18n-selector";
import { ThemeSelector } from "@/interfaces/components/ui/layout/navbar/theme-selector";
import { LAYOUT_MAX_WIDTH, NAVBAR_HEIGHT } from "@/interfaces/styles/constants";

export function Navbar() {
  return (
    <header
      className={cn(
        "sticky inset-x-0 top-0 z-50 w-full",

        "flex justify-center",
        "bg-background border-b",
        "px-2 md:px-4",
      )}
      style={{ height: NAVBAR_HEIGHT }}
    >
      <div
        className={cn("size-full", "flex shrink-0 items-center gap-2")}
        style={{ maxWidth: LAYOUT_MAX_WIDTH - 48 }}
      >
        <div className="flex-1 md:hidden">
          <SidebarTrigger className="size-10" />
        </div>
        {/* Logo */}
        <Link href={"/"}>
          <div className="size-6 rounded-full bg-linear-150 from-blue-500 to-blue-100" />
        </Link>
        <div className="flex flex-1 justify-end gap-2">
          <I18nSelector />
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
}
