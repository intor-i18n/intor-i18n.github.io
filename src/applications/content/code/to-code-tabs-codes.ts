import type { ReactNode } from "react";

export interface CodeTab {
  label: string;
  code: ReactNode;
}

export function toCodeTabsCodes(content: string): Record<string, string> {
  const tabs: CodeTab[] = [];
  const regex = /^---tab (.+?)---$/gm;

  let match: RegExpExecArray | null;
  let lastIndex = 0;
  let currentLabel = "";

  while ((match = regex.exec(content)) !== null) {
    if (currentLabel) {
      tabs.push({
        label: currentLabel,
        code: content.slice(lastIndex, match.index).trim(),
      });
    }
    currentLabel = match[1].trim();
    lastIndex = match.index + match[0].length;
  }

  if (currentLabel) {
    tabs.push({
      label: currentLabel,
      code: content.slice(lastIndex).trim(),
    });
  }

  const obj: Record<string, string> = {};
  for (const tab of tabs) {
    obj[tab.label] = tab.code?.toString() || "";
  }
  return obj;
}
