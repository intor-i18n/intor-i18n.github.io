"use client";

import { Link } from "intor/next";
import { PAGES } from "@/config/pages";
import Nextjs from "@/interfaces/components/icons/nextjs";
import Vite from "@/interfaces/components/icons/vite";
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
      <Link href={PAGES.frameworks.viteReact.path}>
        <SpotlightCard className="items-center gap-3">
          <Vite />
          Vite React
        </SpotlightCard>
      </Link>
    </div>
  );
}
