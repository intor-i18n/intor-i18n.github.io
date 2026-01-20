"use client";

import { Link, usePathname } from "intor/next";
import { useTranslator } from "intor/react";
import {
  BookCopy,
  Bot,
  Braces,
  ChevronRight,
  Loader,
  Package,
  Plug,
  Settings,
  Sparkles,
  Type,
} from "lucide-react";
import React, { type ReactNode } from "react";
import { cn } from "@/applications/shadcn/lib/utils";
import { PAGES } from "@/config/pages";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/interfaces/components/shadcn/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/interfaces/components/shadcn/sidebar";

interface NavGroup {
  label?: string;
  items: NavItem[];
}

interface NavItem {
  icon?: ReactNode;
  title: string;
  path: string;
  items?: NavItem[];
}

export function NavMain() {
  const { t } = useTranslator("content");
  const { unprefixedPathname } = usePathname();

  const groups: NavGroup[] = [
    {
      items: [
        {
          icon: <Sparkles />,
          title: t("introduction.title.text"),
          path: PAGES.introduction.path,
          items: [
            {
              title: t("introduction.design-philosophy.title.text"),
              path: PAGES.introduction.designPhilosiphy.path,
            },
          ],
        },
        {
          icon: <Package />,
          title: t("frameworks.title.text"),
          path: PAGES.frameworks.path,
          items: [
            {
              title: t("frameworks.next-js.title.text"),
              path: PAGES.frameworks.nextJs.path,
              items: [
                {
                  title: "PAGES.frameworks.nextJs.dynamic-loading.title",
                  path: PAGES.frameworks.nextJs.dynamicLoading.path,
                },
              ],
            },
            {
              title: t("frameworks.react.title.text"),
              path: PAGES.frameworks.react.path,
              items: [
                {
                  title: t("frameworks.react.dynamic-loading.title.text"),
                  path: PAGES.frameworks.react.dynamicLoading.path,
                },
                {
                  title: t("frameworks.react.rich-translations.title.text"),
                  path: PAGES.frameworks.react.richTranslations.path,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: "核心概念",
      items: [
        {
          icon: <Settings />,
          title: t("config.title.text"),
          path: PAGES.config.path,
          items: [
            {
              title: t("config.locale.title.text"),
              path: PAGES.config.locale.path,
            },
            {
              title: t("config.messages.title.text"),
              path: PAGES.config.messages.path,
            },
            {
              title: t("config.translator.title.text"),
              path: PAGES.config.translator.path,
            },
            {
              title: t("config.routing.title.text"),
              path: PAGES.config.routing.path,
            },
            {
              title: t("config.persistence.title.text"),
              path: PAGES.config.persistence.path,
            },
            {
              title: t("config.messages-loading.title.text"),
              path: PAGES.config.messagesLoading.path,
            },
            {
              title: t("config.observability.title.text"),
              path: PAGES.config.observability.path,
            },
          ],
        },
        {
          icon: <BookCopy />,
          title: t("messages.title.text"),
          path: PAGES.messages.path,
        },
        {
          icon: <Bot />,
          title: t("translator.title.text"),
          path: PAGES.translator.path,
        },

        {
          icon: <Loader />,
          title: t("messages-loader.title.text"),
          path: PAGES.messagesLoader.path,
        },
      ],
    },

    {
      label: "擴充",
      items: [
        {
          icon: <Type />,
          title: "型別生成 & IntelliSense",
          path: "PAGES.quickStart.path",
        },
        {
          icon: <Plug />,
          title: t("handlers-and-plugins.title.text"),
          path: PAGES.handlersAndPlugins.path,
        },
        {
          icon: <Braces />,
          title: t("icu.title.text"),
          path: PAGES.icu.path,
        },
      ],
    },
  ];

  return (
    <>
      {groups.map((group, index) => (
        <SidebarGroup key={index}>
          {group.label ? (
            <SidebarGroupLabel className="text-muted-foreground text-xs">
              {group.label}
            </SidebarGroupLabel>
          ) : null}

          <SidebarMenu>
            {group.items.map((item) => RenderItem(item, unprefixedPathname))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}

function RenderItem(item: NavItem, pathname: string) {
  const isCurrentCategory = pathname.startsWith(item.path);
  const [open, setOpen] = React.useState(isCurrentCategory);

  React.useEffect(() => {
    setOpen(isCurrentCategory);
  }, [isCurrentCategory]);

  return (
    <Collapsible
      key={`${item.path}-${item.title}`}
      asChild
      open={open}
      onOpenChange={setOpen}
      defaultOpen={isCurrentCategory}
    >
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          tooltip={item.title}
          isActive={pathname === item.path}
        >
          <Link href={item.path} className={cn("font-medium")}>
            {item.icon}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>

        {item.items?.length ? (
          <>
            <CollapsibleTrigger asChild>
              <SidebarMenuAction className="data-[state=open]:rotate-90">
                <ChevronRight />
                <span className="sr-only">Toggle</span>
              </SidebarMenuAction>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items.map((sub) => RenderItem(sub, pathname))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </>
        ) : null}
      </SidebarMenuItem>
    </Collapsible>
  );
}
