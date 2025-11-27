"use client";

import { Link } from "intor/next";
import { BookCopy, Package, Settings, Sparkles, Tag, Type } from "lucide-react";
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
  useSidebar,
} from "@/interfaces/components/shadcn/sidebar";
import { NavMain } from "@/interfaces/components/ui/layout/sidebar/nav-main";

type NavItem = {
  icon?: React.ReactNode;
  title: string;
  path: string;
  items?: NavItem[];
};

// This is sample data.
const data: { navMain: NavItem[] } = {
  navMain: [
    {
      icon: <Sparkles />,
      title: PAGES.introduction.title,
      path: PAGES.introduction.path,
    },

    {
      icon: <Package />,
      title: PAGES.frameworks.title,
      path: PAGES.frameworks.path,
      items: [
        {
          title: PAGES.frameworks.nextJs.title,
          path: PAGES.frameworks.nextJs.path,
        },
        {
          title: PAGES.frameworks.viteReact.title,
          path: PAGES.frameworks.viteReact.path,
          items: [
            {
              title: PAGES.frameworks.viteReact.messagesLoading.title,
              path: PAGES.frameworks.viteReact.messagesLoading.path,
            },
          ],
        },
      ],
    },
    {
      icon: <Settings />,
      title: "設定物件",
      path: "PAGES.quickStart.path",
      items: [],
    },
    {
      icon: <BookCopy />,
      title: "語言檔",
      path: "PAGES.quickStart.path",
      items: [],
    },
    {
      icon: <Type />,
      title: "型別生成 & IntelliSense",
      path: "PAGES.quickStart.path",
      items: [],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

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
            <NavMain items={data.navMain} />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
