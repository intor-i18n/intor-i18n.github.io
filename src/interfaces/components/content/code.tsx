/* eslint-disable unicorn/no-array-reduce */
"use client";

import type { HTMLAttributes } from "react";
import type { ExtraProps } from "react-markdown";
import React, { createContext, useContext } from "react";
import { useIsClient } from "@/applications/shadcn/hooks/use-is-client";
import { CodeTabs } from "@/interfaces/components/shadcn/code-tabs";

interface CodeTab {
  label: string;
  code: React.ReactNode;
}

const permanentGroupMap = new Map<string, CodeTab[]>();

export const CodeContext =
  createContext<Map<string, CodeTab[]>>(permanentGroupMap);

export function CodeProvider({ children }: { children: React.ReactNode }) {
  return (
    <CodeContext.Provider value={permanentGroupMap}>
      {children}
    </CodeContext.Provider>
  );
}

const toCodes = (array: CodeTab[]) =>
  array.reduce(
    (acc, cur) => {
      acc[cur.label] = cur.code?.toString() || "";
      return acc;
    },
    {} as Record<string, string>,
  );

export function CodeHandler({
  node,
  children,
}: ExtraProps & HTMLAttributes<HTMLElement>) {
  const isClient = useIsClient();
  const groupMap = useContext(CodeContext);

  if (!node?.data) return <code>{children}</code>;

  let groupId = "";
  let value = "";
  if (node.data.meta) {
    [groupId, value] = node.data.meta.split("=");
  }

  if (!groupMap.has(groupId)) {
    groupMap.set(groupId, []);
  }

  const tabs = groupMap.get(groupId)!;

  if (!tabs.some((t) => t.code === children)) {
    tabs.push({ label: value, code: children });
  }

  const isFirst = tabs[0].code === children;

  if (!isClient || !isFirst) return null;
  return <CodeTabs lang="bash" codes={toCodes(tabs)} className="my-4" />;
}
