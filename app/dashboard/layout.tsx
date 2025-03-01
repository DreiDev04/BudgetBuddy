"use client";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState<string | null>(null);

  // for breadcrumb
  useEffect(() => {
    const segments = pathname.split("/").filter((segment) => segment);
    const lastSegment = segments.pop();

    if (lastSegment && /^[0-9a-fA-F]{24}$/.test(lastSegment)) {
      // If the last segment is a MongoDB ObjectId, fetch the title
      fetch(`/api/details/${lastSegment}`)
        .then((res) => res.json())
        .then((data) => {
          setCurrentPage(data.title || "Untitled");
        })
        .catch(() => {
          setCurrentPage("Not Found");
        });
    } else {
      // Otherwise, format the last segment as usual
      setCurrentPage(
        lastSegment
          ?.replace(/-/g, " ")
          ?.replace(/^\w/, (c) => c.toUpperCase()) || "Dashboard"
      );
    }
  }, [pathname]);

  return (
    <div className="min-h-screen flex lg:flex-row flex-col-reverse">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbPage>{currentPage || "Dashboard"}</BreadcrumbPage>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex-1 overflow-hidden">
            <main className="px-6 py-2">{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
