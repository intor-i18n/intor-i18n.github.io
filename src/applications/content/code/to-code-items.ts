import matter from "gray-matter";

export interface CodeItem {
  title: string;
  href: string;
  content: string;
}

export function toCodeItems(content: string): CodeItem[] {
  const codeItems: CodeItem[] = [];

  const blocks = content.match(/---([\s\S]*?)---([\s\S]*?)(?=---|$)/g) ?? [];

  for (const block of blocks) {
    const parsed = matter(block);

    const data = parsed.data as Omit<CodeItem, "content">;

    if (!data.title) {
      continue;
    }

    codeItems.push({
      title: data.title,
      href: data.href,
      content: parsed.content.trim(),
    });
  }

  return codeItems;
}
