import type { ReactNode } from "react";

export interface CodeCard {
  title: string;
  description: ReactNode;
}

export function toCodeCards(content: string): CodeCard[] {
  const cards: CodeCard[] = [];
  const regex = /^---title (.+?)---$/gm;

  let match: RegExpExecArray | null;
  let lastIndex = 0;
  let currentTitle = "";

  while ((match = regex.exec(content)) !== null) {
    if (currentTitle) {
      cards.push({
        title: currentTitle,
        description: content.slice(lastIndex, match.index).trim(),
      });
    }
    currentTitle = match[1].trim();
    lastIndex = match.index + match[0].length;
  }

  if (currentTitle) {
    cards.push({
      title: currentTitle,
      description: content.slice(lastIndex).trim(),
    });
  }

  return cards;
}
