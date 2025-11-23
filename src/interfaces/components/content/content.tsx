"use client";

import { Link, useTranslator } from "intor/next";
import { Fragment, type ReactNode } from "react";
import { useMarkdownHeadings } from "@/applications/content/use-markdown-headings";
import { useIsMobile } from "@/applications/shadcn/hooks/use-mobile";
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
  breadcrumbs: Array<{ i18nKey: string; path?: string }>;
}) {
  const { t } = useTranslator();
  const { headings } = useMarkdownHeadings(content);

  const isMobile = useIsMobile();

  return (
    <div className="flex">
      <div
        className="flex flex-col"
        style={{ width: isMobile ? "100%" : `calc(100% - ${TOC_WIDTH}px)` }}
      >
        {/* breadcrumbs */}
        <Breadcrumb
          className="px-3 pt-6"
          style={{ height: BREADCRUMBS_HEIGHT }}
        >
          <BreadcrumbList>
            {breadcrumbs.map(({ i18nKey, path }, index) => {
              const isLast = breadcrumbs.length === index + 1;
              return (
                <Fragment key={index}>
                  <BreadcrumbItem>
                    {!isLast ? (
                      <BreadcrumbLink asChild>
                        <Link href={path}>{t(i18nKey)}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{t(i18nKey)}</BreadcrumbPage>
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
      </div>

      {/* toc */}
      <div className="pt-14 max-md:hidden" style={{ width: TOC_WIDTH }}>
        <Toc headings={headings} />
      </div>
    </div>
  );
}
