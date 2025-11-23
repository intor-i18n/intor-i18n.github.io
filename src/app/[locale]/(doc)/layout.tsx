import "@/interfaces/styles/globals.css";
import { SidebarProvider } from "@/interfaces/components/shadcn/sidebar";
import { Navbar } from "@/interfaces/components/ui/layout/navbar";
import { AppSidebar } from "@/interfaces/components/ui/layout/sidebar/app-sidebar";
import { LAYOUT_MAX_WIDTH } from "@/interfaces/styles/constants";

type Props = Readonly<{ children: React.ReactNode }>;

export default function DocLayout({ children }: Props) {
  return (
    <SidebarProvider style={{ maxWidth: LAYOUT_MAX_WIDTH }}>
      <Navbar />

      <div className="flex w-full">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main */}
        <div className="flex-1">{children}</div>
      </div>
    </SidebarProvider>
  );
}
