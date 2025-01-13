"use client";

import { useUser } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Receipt,
  PiggyBank,
  User,
  Goal,
  ShoppingCart,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/ui/nav-main";
import { NavUser } from "@/components/ui/nav-user";

import { ModeToggle } from "../ui/mode-toggle";

export function AppSidebar() {

  const { user } = useUser();
  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Budget", href: "/dashboard/budget", icon: PiggyBank },
    { name: "Transaction", href: "/dashboard/transaction", icon: Receipt },
    { name: "Goals", href: "/dashboard/goals", icon: Goal },
    { name: "Shopping List", href: "/dashboard/shopping-list", icon: ShoppingCart },
    { name: "Design", href: "/dashboard/Design", icon: User }, // Design system
  ];

  const navMain = navigation.map((item) => ({
    title: item.name,
    url: item.href,
    icon: item.icon,
  }));

  // Fallback user data
  const fallbackUser = {
    name: "Guest",
    email: "guest@example.com",
    avatar: "/avatars/default-avatar.jpg",
  };

  const userData = {
    name: user?.firstName || fallbackUser.name,
    email: user?.emailAddresses?.[0]?.emailAddress || fallbackUser.email,
    avatar: user?.imageUrl || fallbackUser.avatar,
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        Budget Buddy
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
