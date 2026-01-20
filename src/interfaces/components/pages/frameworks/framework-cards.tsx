"use client";

import { Link } from "intor/next";
import { PAGES } from "@/config/pages";
import { Nextjs } from "@/interfaces/components/icons/next-js";
import { React } from "@/interfaces/components/icons/react";
import { SpotlightCard } from "@/interfaces/components/shadcn/spotlight-card/spotlight-card";

export function FrameworkCards() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-6">
      <Link href={PAGES.frameworks.nextJs.path}>
        <SpotlightCard className="items-center gap-3">
          <Nextjs />
          Next.js
        </SpotlightCard>
      </Link>

      <Link href={PAGES.frameworks.react.path}>
        <SpotlightCard className="items-center gap-3">
          <React />
          React
        </SpotlightCard>
      </Link>
    </div>
  );
}
