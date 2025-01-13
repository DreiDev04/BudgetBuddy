"use client";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Extract the last segment of the pathname
  const currentPage = pathname
    .split("/")
    .filter((segment) => segment) // Remove empty segments
    .pop() // Get the last segment
    ?.replace(/-/g, " ") // Replace dashes with spaces
    ?.replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter

  return (
    <div className="min-h-screen flex lg:flex-row flex-col-reverse">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbPage>{currentPage || "Dashboard"}</BreadcrumbPage>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex-1">
            <main className="p-6">{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
