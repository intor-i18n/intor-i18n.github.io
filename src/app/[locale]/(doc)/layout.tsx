import "@/interfaces/styles/globals.css";
import { SidebarProvider } from "@/interfaces/components/shadcn/sidebar";
import { Navbar } from "@/interfaces/components/ui/layout/navbar";
import { AppSidebar } from "@/interfaces/components/ui/layout/sidebar/app-sidebar";
import { LAYOUT_MAX_WIDTH } from "@/interfaces/styles/constants";

type Props = Readonly<{ children: React.ReactNode }>;

export default function DocLayout({ children }: Props) {
  return (
    <SidebarProvider>
      <Navbar />

      <div
        className="mx-auto flex w-full"
        style={{ maxWidth: LAYOUT_MAX_WIDTH }}
      >
        {/* Sidebar */}
        <AppSidebar className="w-[16rem]" />

        {/* Main */}
        <div className="w-full md:w-[calc(100%-16rem)]">{children}</div>
      </div>

      <footer className="mt-12 h-96 border-t bg-linear-0 from-slate-100/10 to-slate-300/10"></footer>
    </SidebarProvider>
  );
}
