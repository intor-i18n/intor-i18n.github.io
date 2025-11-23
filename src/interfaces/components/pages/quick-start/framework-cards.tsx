"use client";

import { Link } from "intor/next";
import { PAGES } from "@/config/pages";
import Nextjs from "@/interfaces/components/icons/nextjs";
import Vite from "@/interfaces/components/icons/vite";
import { Card } from "@/interfaces/components/shadcn/card";

export function FrameworkCards() {
  return (
    <div className="mt-6 grid grid-cols-4 gap-6">
      <Link href={PAGES.nextJs.path}>
        <Card className="items-center gap-3">
          <Nextjs />
          Next.js
        </Card>
      </Link>
      <Link href={PAGES.viteReact.path}>
        <Card className="items-center gap-3">
          <Vite />
          Vite React
        </Card>
      </Link>
    </div>
  );
}
