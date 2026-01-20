"use client";

import type { HTMLAttributes } from "react";
import type { ExtraProps } from "react-markdown";
import { Link } from "intor/next";
import { parseCode } from "@/applications/content/code/parse-code";
import { toCodeItems } from "@/applications/content/code/to-code-items";
import { CodeFiles } from "@/interfaces/components/content/code/code-files";
import { CodeTabs } from "@/interfaces/components/shadcn/code-tabs";
import { SpotlightCard } from "@/interfaces/components/shadcn/spotlight-card/spotlight-card";

export function Code({
  node,
  children,
}: ExtraProps & HTMLAttributes<HTMLElement>) {
  const { content, meta, lang } = parseCode(children, node);

  // Default
  if (!meta.ui) {
    return (
      <code className="text-primary bg-primary-foreground hover:bg-secondary m-[0_0.1em] inline-block rounded-md border p-[0.1em_0.5em] text-sm whitespace-pre-wrap duration-150">
        {children}
      </code>
    );
  }

  // [ui] files
  if (meta.ui === "files") {
    return <CodeFiles content={content} className="mt-6" />;
  }

  // [ui] code-tabs
  if (meta.ui === "code-tabs") {
    const codeItems = toCodeItems(content);
    const obj: Record<string, string> = {};
    for (const item of codeItems) obj[item.title] = item.content;
    return (
      <CodeTabs
        lang={lang}
        codes={obj}
        hideHeader={meta.hideHeader === "true"}
        className="mt-6"
      />
    );
  }

  // [ui] card
  if (meta.ui === "card") {
    const codeItems = toCodeItems(content);
    return (
      <div className="mt-6 grid grid-cols-2 gap-6 font-[sans-serif]">
        {codeItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <SpotlightCard className="gap-4 rounded-lg p-4">
              <p className="m-0 font-semibold">{item.title}</p>
              <p className="m-0 line-clamp-2 h-10 text-sm whitespace-pre-line opacity-75">
                {item.content}
              </p>
            </SpotlightCard>
          </Link>
        ))}
      </div>
    );
  }
}
