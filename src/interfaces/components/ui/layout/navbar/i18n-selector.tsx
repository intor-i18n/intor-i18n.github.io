"use client";

import { Link } from "intor/next";
import { Languages } from "lucide-react";
import { LOCALE_DISPLAY, LOCALES_ARRAY } from "@/infrastructure/i18n/locale";
import { Button } from "@/interfaces/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/interfaces/components/shadcn/dropdown-menu";

export function I18nSelector() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon-lg">
          <Languages />
          <span className="sr-only">Switch Languages</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LOCALES_ARRAY.map((locale) => (
          <Link locale={locale} key={locale}>
            <DropdownMenuItem>{LOCALE_DISPLAY[locale]}</DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
