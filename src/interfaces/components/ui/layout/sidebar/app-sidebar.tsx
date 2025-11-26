"use client";

import { Link, usePathname, useTranslator } from "intor/next";
import { BookCopy, Rocket, Settings, Tag, Type } from "lucide-react";
import * as React from "react";
import { cn } from "@/applications/shadcn/lib/utils";
import { PAGES } from "@/config/pages";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/interfaces/components/shadcn/sidebar";

// This is sample data.
const data = {
  navMain: [
    {
      icon: <Rocket />,
      i18nKey: PAGES.quickStart.i18nKey,
      path: PAGES.quickStart.path,
      items: [
        {
          title: PAGES.nextJs.i18nKey,
          path: PAGES.nextJs.path,
        },
        {
          title: PAGES.viteReact.i18nKey,
          path: PAGES.viteReact.path,
        },
      ],
    },
    {
      icon: <Settings />,
      i18nKey: "設定物件",
      path: "PAGES.quickStart.path",
      items: [],
    },
    {
      icon: <BookCopy />,
      i18nKey: "語言檔",
      path: "PAGES.quickStart.path",
      items: [],
    },
    {
      icon: <Type />,
      i18nKey: "型別生成 & IntelliSense",
      path: "PAGES.quickStart.path",
      items: [],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const { t } = useTranslator();
  const { unprefixedPathname } = usePathname();

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              size="lg"
              asChild
              className={cn(isCollapsed && "hidden")}
            >
              <Link href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Tag className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Documentation</span>
                  <span className="">v2.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2 whitespace-nowrap">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.i18nKey}>
                <SidebarMenuButton
                  asChild
                  isActive={unprefixedPathname.startsWith(item.path)}
                >
                  <Link
                    href={item.path}
                    className={cn(
                      "font-medium",
                      unprefixedPathname === item.path && "pointer-events-none",
                    )}
                  >
                    {item.icon}
                    {t(item.i18nKey)}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={unprefixedPathname.startsWith(item.path)}
                        >
                          <Link href={item.path}>{t(item.title)}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
