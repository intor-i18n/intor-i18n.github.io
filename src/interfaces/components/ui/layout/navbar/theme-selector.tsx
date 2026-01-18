"use client";

import { useTranslator } from "intor/react";
import { Moon, Sun, TvMinimal } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/interfaces/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/interfaces/components/shadcn/dropdown-menu";

export function ThemeSelector() {
  const { t } = useTranslator("ui.theme");
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon-lg">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* Light */}
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun />
          {t("light.display")}
        </DropdownMenuItem>

        {/* Dark */}
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon />
          {t("dark.display")}
        </DropdownMenuItem>

        {/* System */}
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <TvMinimal />
          {t("system.display")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
