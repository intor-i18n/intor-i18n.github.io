/* eslint-disable unicorn/no-array-reduce */
"use client";

import type { CodeTab } from "@/interfaces/components/content/code/code-context";
import type { HTMLAttributes } from "react";
import type { ExtraProps } from "react-markdown";
import { useIsClient } from "@/applications/shadcn/hooks/use-is-client";
import { useCode } from "@/interfaces/components/content/code/code-context";
import { CodeFiles } from "@/interfaces/components/content/code/code-files";
import { CodeTabs } from "@/interfaces/components/shadcn/code-tabs";

const toCodes = (array: CodeTab[]) =>
  array.reduce(
    (acc, cur) => {
      acc[cur.label] = cur.code?.toString() || "";
      return acc;
    },
    {} as Record<string, string>,
  );

function parseMeta(meta?: string | null): Record<string, string> {
  if (!meta) return {};
  const entries: [string, string][] = [];
  meta.split(/\s+/).forEach((pair) => {
    if (!pair) return;
    const idx = pair.indexOf("=");
    if (idx === -1) return;
    const key = pair.slice(0, idx).trim();
    const value = pair.slice(idx + 1).trim();
    if (key && value) entries.push([key, value]);
  });
  return Object.fromEntries(entries);
}

export function CodeHandler({
  node,
  children,
}: ExtraProps & HTMLAttributes<HTMLElement>) {
  const isClient = useIsClient();
  const groupMap = useCode();

  const meta = parseMeta(node?.data?.meta);

  if (!meta.ui) {
    return (
      <code className="code text-primary bg-primary-foreground hover:bg-secondary m-[0_0.1em] inline-block rounded-md border p-[0.1em_0.5em] whitespace-pre-wrap duration-150">
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
    if (!groupMap.has(meta.groupId)) {
      groupMap.set(meta.groupId, []);
    }

    const tabs = groupMap.get(meta.groupId)!;

    if (!tabs.some((t) => t.code === children)) {
      tabs.push({ label: meta.label, code: children });
    }

    const isFirst = tabs[0].code === children;
    if (!isClient || !isFirst) return null;

    return <CodeTabs codes={toCodes(tabs)} className="mt-4" />;
  }
}
