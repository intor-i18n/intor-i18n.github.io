"use client";

import type { HTMLAttributes } from "react";
import type { ExtraProps } from "react-markdown";
import { parseCodeMeta } from "@/applications/content/code/parse-code-meta";
import { toCodeCards } from "@/applications/content/code/to-code-cards";
import { toCodeTabs } from "@/applications/content/code/to-code-tabs";
import { CodeFiles } from "@/interfaces/components/content/code/code-files";
import { CodeTabs } from "@/interfaces/components/shadcn/code-tabs";
import { SpotlightCard } from "@/interfaces/components/shadcn/spotlight-card/spotlight-card";

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
        codes={toCodeTabs(children?.toString() || "")}
        className="mt-6"
      />
    );
  }

  // [ui] Card
  if (meta.ui === "Card") {
    const cards = toCodeCards(children?.toString() || "");

    return (
      <div className="mt-6 grid grid-cols-2 gap-6 font-[sans-serif]">
        {cards.map((card, index) => (
          <SpotlightCard key={index} className="rounded-lg p-4">
            <p className="m-0">{card.title}</p>
            <p className="m-0">{card.description}</p>
          </SpotlightCard>
        ))}
      </div>
    );
  }
}
