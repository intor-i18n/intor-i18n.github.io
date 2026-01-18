"use client";

import { Link, usePathname } from "intor/next";
import { useTranslator } from "intor/react";
import {
  BookCopy,
  Braces,
  ChevronRight,
  Package,
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
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/interfaces/components/shadcn/sidebar";

interface NavItem {
  icon?: ReactNode;
  title: string;
  path: string;
  items?: NavItem[];
}

export function NavMain() {
  const { t } = useTranslator("content");
  const { unprefixedPathname } = usePathname();

  const items: NavItem[] = [
    {
      icon: <Sparkles />,
      title: t("introduction.title.text"),
      path: PAGES.introduction.path,
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
          title: t("frameworks.vite-react.title.text"),
          path: PAGES.frameworks.viteReact.path,
          items: [
            {
              title: t("frameworks.vite-react.dynamic-loading.title.text"),
              path: PAGES.frameworks.viteReact.dynamicLoading.path,
            },
          ],
        },
      ],
    },
    {
      icon: <Braces />,
      title: t("icu.title.text"),
      path: PAGES.icu.path,
    },
    {
      icon: <Settings />,
      title: "Intor 設定檔",
      path: "PAGES.quickStart.path",
    },
    {
      icon: <BookCopy />,
      title: "語言檔",
      path: "PAGES.quickStart.path",
    },
    {
      icon: <Type />,
      title: "型別生成 & IntelliSense",
      path: "PAGES.quickStart.path",
    },
  ];

  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item) => RenderItem(item, unprefixedPathname))}
      </SidebarMenu>
    </SidebarGroup>
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
