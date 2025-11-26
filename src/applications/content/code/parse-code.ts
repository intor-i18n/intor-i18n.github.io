import type { ReactNode } from "react";
import type { ExtraProps } from "react-markdown";

export function parseCode(children: ReactNode, node: ExtraProps["node"]) {
  const content = children?.toString() || "";
  const meta = node?.data?.meta;
  const className = node?.properties.className;

  if (!node || !meta || !className || !Array.isArray(className)) {
    return {
      content,
      meta: { ui: undefined },
      lang: undefined,
    };
  }

  const metaEntries: [string, string][] = [];
  meta.split(/\s+/).forEach((pair) => {
    if (!pair) return;
    const idx = pair.indexOf("=");
    if (idx === -1) return;
    const key = pair.slice(0, idx).trim();
    const value = pair.slice(idx + 1).trim();
    if (key && value) metaEntries.push([key, value]);
  });

  return {
    content,
    meta: Object.fromEntries(metaEntries),
    lang: String(className[0]).split("language-").slice(1).join(""),
  };
}
