"use client";

import type { HeadingItem } from "@/applications/content/use-markdown-headings";
import { CircleChevronUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/applications/shadcn/hooks/use-mobile";
import { cn } from "@/applications/shadcn/lib/utils";
import { Button } from "@/interfaces/components/shadcn/button";
import { Separator } from "@/interfaces/components/shadcn/separator";
import {
  BREADCRUMBS_HEIGHT,
  NAVBAR_HEIGHT,
} from "@/interfaces/styles/constants";

export function Toc({ headings }: { headings: HeadingItem[] }) {
  const isMobile = useIsMobile();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isToTopVisible, setIsToTopVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const handleScroll = () => {
        const scrollMiddle = globalThis.innerHeight * 0.08;
        const headingElements = [
          ...document.querySelectorAll("h1, h2, h3"),
        ] as HTMLElement[];
        let currentId: string | null = null;

        const tryFind = () => {
          let allRendered = true;

          for (const el of headingElements) {
            const top = el.getBoundingClientRect().top;
            if (top === 0) allRendered = false;
            if (top - NAVBAR_HEIGHT <= scrollMiddle) currentId = el.id;
            else break;
          }

          if (allRendered) {
            if (currentId) setActiveId(currentId);
          } else {
            requestAnimationFrame(tryFind);
          }
        };

        tryFind();
        const shouldShow = window.scrollY > 200;
        setIsToTopVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
      };

      handleScroll();
      globalThis.addEventListener("scroll", handleScroll, { passive: true });
      globalThis.addEventListener("hashchange", handleScroll, {
        passive: true,
      });

      return () => {
        globalThis.removeEventListener("scroll", handleScroll);
        globalThis.removeEventListener("hashchange", handleScroll);
      };
    }, 50);

    return () => clearTimeout(timeout);
  }, [isMobile]);

  // line style
  const containerRef = useRef<HTMLUListElement>(null);
  const [lineStyle, setLineStyle] = useState<{
    top: number;
    left: number;
    height: number;
  }>({ top: 0, left: 0, height: 0 });
  useEffect(() => {
    if (!activeId || !containerRef.current) return;
    const li = containerRef.current!.querySelector<HTMLLIElement>(
      `li[data-id="${activeId}"]`,
    );
    queueMicrotask(() =>
      setLineStyle({
        top: !li ? 0 : li.offsetTop,
        left: !li ? 0 : li.dataset.level === "3" ? 12 : 0,
        height: !li ? 0 : li.offsetHeight,
      }),
    );
  }, [activeId, headings]);

  return (
    <div
      className="sticky h-fit overflow-auto p-2"
      style={{ top: NAVBAR_HEIGHT + BREADCRUMBS_HEIGHT }}
    >
      <p className="text-primary/60 font-semibold">On this page</p>

      <ul className="relative px-2 text-sm" ref={containerRef}>
        {/* Line */}
        <span
          className="bg-secondary-foreground absolute w-1 rounded transition-all duration-200"
          style={{ ...lineStyle }}
        />

        {headings.map(({ id, text, level }) => {
          if (level === 1) return null;
          const isActive = id === activeId;

          return (
            <li
              key={id}
              data-id={id}
              data-level={level}
              style={{ paddingLeft: level === 2 ? 4 : 16 }}
              className="mt-4 w-full"
            >
              <Link
                href={`#${id}`}
                className={cn(
                  "block w-full",
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

      <div className="mt-4 flex flex-col gap-2">
        <Separator />

        <Link
          href={"#web-root"}
          className={cn(
            "duration-200",
            isToTopVisible
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0",
          )}
        >
          <Button
            variant={"ghost"}
            className="flex w-full justify-start font-semibold opacity-50"
          >
            <CircleChevronUp
              className={cn(
                "duration-500",
                !isToTopVisible && "scale-75 rotate-450",
              )}
            />{" "}
            Top
          </Button>
        </Link>
      </div>
    </div>
  );
}
