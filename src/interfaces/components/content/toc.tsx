"use client";

import type { HeadingItem } from "@/applications/content/use-markdown-headings";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/applications/shadcn/hooks/use-mobile";
import { cn } from "@/applications/shadcn/lib/utils";
import {
  BREADCRUMBS_HEIGHT,
  NAVBAR_HEIGHT,
} from "@/interfaces/styles/constants";

export function Toc({ headings }: { headings: HeadingItem[] }) {
  const isMobile = useIsMobile();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const headingElements = [...document.querySelectorAll("h2, h3")];

      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .toSorted((a, b) => {
              return (
                (a.target as HTMLElement).offsetTop -
                (b.target as HTMLElement).offsetTop
              );
            });
          if (visible.length > 0) {
            setActiveId(visible[0].target.id);
          }
        },
        { rootMargin: "-5% 0px -80% 0px", threshold: 0.1 },
      );
      headingElements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 0);
    return () => clearTimeout(timeout);
  }, [isMobile]);

  return (
    <div
      className="sticky h-fit overflow-auto p-2"
      style={{ top: NAVBAR_HEIGHT + BREADCRUMBS_HEIGHT }}
    >
      <p className="text-primary/60 mb-4 font-semibold">On this page</p>

      <ul className="space-y-1 px-2 text-sm">
        {headings.map(({ id, text, level }) => {
          if (level === 1) return null;
          const isActive = id === activeId;

          return (
            <li key={id} style={{ paddingLeft: level === 2 ? 0 : 12 }}>
              <Link
                href={`#${id}`}
                className={cn(
                  "duration-150",
                  isActive
                    ? "text-secondary-foreground font-medium"
                    : "text-secondary-foreground/50 hover:text-secondary-foreground",
                )}
              >
                {text}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
