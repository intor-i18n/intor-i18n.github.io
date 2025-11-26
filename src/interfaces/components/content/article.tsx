/* eslint-disable @typescript-eslint/no-unused-vars */
import type { HeadingItem } from "@/applications/content/use-markdown-headings";
import { SquareArrowOutUpRight } from "lucide-react";
import { type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getText } from "@/applications/content/get-text";
import { cn } from "@/applications/shadcn/lib/utils";
import { CodeHandler } from "@/interfaces/components/content/code/code";
import { CodeProvider } from "@/interfaces/components/content/code/code-context";

export function Article({
  content,
  headings,
  children,
}: {
  content: string;
  headings: HeadingItem[];
  children?: ReactNode;
}) {
  const getId = (children: ReactNode) => {
    const text = getText(children);
    return headings.find((h) => h.text === text)?.id;
  };

  return (
    <article className={cn("content", "px-4")}>
      <CodeProvider>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node: _, children, ...props }) => (
              <h1 id={getId(children)} {...props}>
                {children}
              </h1>
            ),
            h2: ({ node: _, children, ...props }) => (
              <h2 id={getId(children)} {...props}>
                {children}
              </h2>
            ),
            h3: ({ node: _, children, ...props }) => (
              <h3 id={getId(children)} {...props}>
                {children}
              </h3>
            ),
            h4: ({ node: _, children, ...props }) => (
              <h4 id={getId(children)} {...props}>
                {children}
              </h4>
            ),
            h5: ({ node: _, children, ...props }) => (
              <h5 id={getId(children)} {...props}>
                {children}
              </h5>
            ),
            p: ({ node: _, ...props }) => <p {...props} />,
            ul: ({ node: _, ...props }) => <ul className="" {...props} />,
            ol: ({ node: _, ...props }) => <ol className="" {...props} />,
            a: ({ node: _, href, children, ...props }) => {
              const isExternal =
                href?.startsWith("http") || href?.startsWith("https");
              return (
                <a
                  className="text-info underline-offset-2 hover:underline"
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  {...props}
                >
                  {children}{" "}
                  {isExternal && (
                    <SquareArrowOutUpRight className="mb-px inline size-4" />
                  )}
                </a>
              );
            },
            code: CodeHandler,
          }}
        >
          {content}
        </ReactMarkdown>
      </CodeProvider>

      {children}
    </article>
  );
}
