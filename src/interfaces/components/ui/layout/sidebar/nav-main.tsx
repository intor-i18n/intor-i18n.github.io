"use client";

import { Link, usePathname, useTranslator } from "intor/next";
import { ChevronRight } from "lucide-react";
import React, { type ReactNode } from "react";
import { cn } from "@/applications/shadcn/lib/utils";
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

type NavItem = {
  icon?: ReactNode;
  title: string;
  path: string;
  items?: NavItem[];
};

export function NavMain({ items }: { items: NavItem[] }) {
  const { t } = useTranslator();
  const { unprefixedPathname } = usePathname();

  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item) => RenderItem(item, unprefixedPathname, t))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function RenderItem(
  item: NavItem,
  pathname: string,
  t: (key?: string) => string,
) {
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
            <span>{t(item.title)}</span>
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
                {item.items.map((sub) => RenderItem(sub, pathname, t))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </>
        ) : null}
      </SidebarMenuItem>
    </Collapsible>
  );
}
