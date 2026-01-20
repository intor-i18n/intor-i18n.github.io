"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import { cn } from "@/applications/shadcn/lib/utils";
import { CopyButton } from "../copy-button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TabsContents,
  useTabs,
  type TabsProps,
} from "../tabs";

type CodeTabsProps = {
  codes: Record<string, string>;
  lang?: string;
  themes?: {
    light: string;
    dark: string;
  };
  copyButton?: boolean;
  onCopy?: (content: string) => void;
  hideHeader?: boolean;
} & Omit<TabsProps, "children">;

function CodeTabsContent({
  codes,
  lang = "bash",
  themes = {
    light: "github-light",
    dark: "github-dark",
  },
  copyButton = true,
  onCopy,
  hideHeader = false,
}: {
  codes: Record<string, string>;
  lang?: string;
  themes?: { light: string; dark: string };
  copyButton?: boolean;
  onCopy?: (content: string) => void;
  hideHeader?: boolean;
}) {
  const { resolvedTheme } = useTheme();
  const { activeValue } = useTabs();

  const [highlightedCodes, setHighlightedCodes] =
    React.useState<Record<string, string>>(codes); // Start with raw codes for instant rendering

  React.useEffect(() => {
    async function loadHighlightedCode() {
      try {
        const { codeToHtml } = await import("shiki");
        const newHighlightedCodes: Record<string, string> = {};

        for (const [command, val] of Object.entries(codes)) {
          const highlighted = await codeToHtml(val, {
            lang,
            themes: {
              light: themes.light,
              dark: themes.dark,
            },
            defaultColor: resolvedTheme === "dark" ? "dark" : "light",
          });

          newHighlightedCodes[command] = highlighted;
        }

        setHighlightedCodes(newHighlightedCodes);
      } catch (error) {
        console.error("Error highlighting codes", error);
      }
    }
    loadHighlightedCode();
  }, [resolvedTheme, lang, themes.light, themes.dark, codes]);

  return (
    <>
      {!hideHeader && (
        <TabsList
          data-slot="install-tabs-list"
          className="bg-muted border-border/75 dark:border-border/50 relative h-10 w-full justify-between rounded-none border-b px-4 py-0 text-current"
          activeClassName="rounded-none shadow-none bg-transparent after:content-[''] after:absolute after:inset-x-0 after:h-0.5 after:bottom-0 dark:after:bg-white after:bg-black after:rounded-t-full"
        >
          <div className="flex h-full gap-x-3">
            {Object.keys(codes).map((code) => (
              <TabsTrigger
                key={code}
                value={code}
                className="text-muted-foreground px-0 data-[state=active]:text-current"
              >
                {code}
              </TabsTrigger>
            ))}
          </div>

          {copyButton && (
            <CopyButton
              content={codes[activeValue]}
              size="sm"
              variant="ghost"
              className="-me-2 bg-transparent hover:bg-black/5 dark:hover:bg-white/10"
              onCopy={onCopy}
            />
          )}
        </TabsList>
      )}
      <TabsContents data-slot="install-tabs-contents">
        {Object.entries(codes).map(([code, rawCode]) => (
          <TabsContent
            data-slot="install-tabs-content"
            key={code}
            className="flex w-full items-center overflow-auto p-4 text-sm"
            value={code}
          >
            <div className="w-full [&_.shiki]:bg-transparent! [&_code]:bg-transparent! [&_code]:text-[13px] [&_code]:leading-relaxed [&>pre]:m-0 [&>pre]:border-none [&>pre]:bg-transparent! [&>pre]:p-0 [&>pre]:text-[13px] [&>pre]:leading-relaxed">
              {highlightedCodes[code] !== rawCode ? (
                <div
                  dangerouslySetInnerHTML={{ __html: highlightedCodes[code] }}
                />
              ) : (
                <pre>
                  <code>{rawCode}</code>
                </pre>
              )}
            </div>
          </TabsContent>
        ))}
      </TabsContents>
    </>
  );
}

function CodeTabs({
  codes,
  lang = "bash",
  themes = {
    light: "github-light",
    dark: "github-dark",
  },
  className,
  defaultValue,
  value,
  onValueChange,
  copyButton = true,
  onCopy,
  hideHeader = false,
  ...props
}: CodeTabsProps) {
  const firstKey = React.useMemo(() => Object.keys(codes)[0] ?? "", [codes]);

  // Handle controlled vs uncontrolled properly
  const tabsProps =
    value !== undefined
      ? { value, onValueChange }
      : { defaultValue: defaultValue ?? firstKey };

  return (
    <Tabs
      data-slot="install-tabs"
      className={cn(
        "bg-muted/50 w-full gap-0 overflow-hidden rounded-xl border",
        className,
      )}
      {...tabsProps}
      {...props}
    >
      <CodeTabsContent
        codes={codes}
        lang={lang}
        themes={themes}
        copyButton={copyButton}
        onCopy={onCopy}
        hideHeader={hideHeader}
      />
    </Tabs>
  );
}

export { CodeTabs, type CodeTabsProps };
