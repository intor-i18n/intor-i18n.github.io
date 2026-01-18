"use client";

import { Link } from "intor/next";
import { Fragment, type ReactNode } from "react";
import { useMarkdownHeadings } from "@/applications/content/use-markdown-headings";
import { Article } from "@/interfaces/components/content/article";
import { Toc } from "@/interfaces/components/content/toc";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/interfaces/components/shadcn/breadcrumb";
import { BREADCRUMBS_HEIGHT } from "@/interfaces/styles/constants";

const TOC_WIDTH = 256;

export function Content({
  content = "",
  children,
  breadcrumbs,
}: {
  content?: string;
  children?: ReactNode;
  breadcrumbs: Array<{ title: string; path?: string }>;
}) {
  const { headings } = useMarkdownHeadings(content);

  return (
    <div className="flex w-full">
      <div
        style={{ "--toc-width": `${TOC_WIDTH}px` } as React.CSSProperties}
        className="flex w-full flex-col lg:w-[calc(100%-var(--toc-width))]"
      >
        {/* breadcrumbs */}
        <Breadcrumb
          className="px-6 pt-6"
          style={{ height: BREADCRUMBS_HEIGHT }}
        >
          <BreadcrumbList>
            {breadcrumbs.map(({ title, path }, index) => {
              const isLast = breadcrumbs.length === index + 1;
              return (
                <Fragment key={index}>
                  <BreadcrumbItem>
                    {!isLast ? (
                      <BreadcrumbLink asChild>
                        <Link href={path}>{title}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{title}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>

                  {!isLast && <BreadcrumbSeparator />}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>

        {/* article */}
        <Article content={content} headings={headings}>
          {children}
        </Article>

        {/* Bottom */}
        <div className="h-64"></div>
      </div>

      {/* toc */}
      <div className="pt-14 max-lg:hidden" style={{ width: TOC_WIDTH }}>
        <Toc headings={headings} />
      </div>
    </div>
  );
}
