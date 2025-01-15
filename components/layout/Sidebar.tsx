"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Receipt,
  PiggyBank,
  User,
  Goal,
  ShoppingCart,
} from "lucide-react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Budget", href: "/dashboard/budget", icon: PiggyBank },
    { name: "Transaction", href: "/dashboard/transaction", icon: Receipt },
    { name: "Goals", href: "/dashboard/goals", icon: Goal },
    {
      name: "Shopping List",
      href: "/dashboard/shoping-list",
      icon: ShoppingCart,
    },
    { name: "Design", href: "/dashboard/Design", icon: User }, //design system
  ];

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
      </SidebarProvider>
    </>
  );
}

export default Sidebar;
