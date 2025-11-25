"use client";

import type { HTMLAttributes } from "react";
import type { ExtraProps } from "react-markdown";
import { parseCodeMeta } from "@/applications/content/code/parse-code-meta";
import { toCodeTabsCodes } from "@/applications/content/code/to-code-tabs-codes";
import { CodeFiles } from "@/interfaces/components/content/code/code-files";
import { CodeTabs } from "@/interfaces/components/shadcn/code-tabs";

export function CodeHandler({
  node,
  children,
}: ExtraProps & HTMLAttributes<HTMLElement>) {
  const meta = parseCodeMeta(node?.data?.meta);

  if (!meta.ui) {
    return (
      <code className="text-primary bg-primary-foreground hover:bg-secondary m-[0_0.1em] inline-block rounded-md border p-[0.1em_0.5em] text-sm whitespace-pre-wrap duration-150">
        {children}
      </code>
    );
  }

  // [ui] Files
  if (meta.ui === "Files") {
    return <CodeFiles value={children?.toString() || ""} />;
  }

  // [ui] CodeTabs
  if (meta.ui === "CodeTabs") {
    return (
      <CodeTabs
        codes={toCodeTabsCodes(children?.toString() || "")}
        className="mt-4"
      />
    );
  }
}
