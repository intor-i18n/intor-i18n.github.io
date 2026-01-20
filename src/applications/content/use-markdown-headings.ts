import { useMemo } from "react";

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export function useMarkdownHeadings(content: string) {
  const headings: HeadingItem[] = useMemo(() => {
    // 1. Remove fenced code blocks (``` or ~~~)
    const withoutCodeBlocks = content.replaceAll(
      /(```[\s\S]*?```|~~~[\s\S]*?~~~)/g,
      "",
    );

    // 2. Now safely match headings
    const regex = /^(#{1,4})\s+(.*)$/gm; // h1 ~ h3
    const matches: HeadingItem[] = [];
    let match;

    while ((match = regex.exec(withoutCodeBlocks)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();

      const id = text
        .toLowerCase()
        .replaceAll(/[^\p{L}\p{N}\s-]/gu, "")
        .trim()
        .replaceAll(/\s+/g, "-")
        .replaceAll(/^-+|-+$/g, "");

      matches.push({ id, text, level });
    }

    return matches;
  }, [content]);

  return { headings };
}
