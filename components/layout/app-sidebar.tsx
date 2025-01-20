"use client";

import { useUser } from "@clerk/nextjs";
import {
  LayoutDashboard,
  PiggyBank,
  User,
  Goal,
  ShoppingCart,
  Command,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/ui/nav-main";
import { NavUser } from "@/components/ui/nav-user";
import Logo from "../custom/Logo.png";
import Image from "next/image";
import LightToggle from "@/components/custom/LightToggle";

export function AppSidebar() {
  const { user } = useUser();
  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Budget", href: "/dashboard/budget", icon: PiggyBank },
    { name: "Goals", href: "/dashboard/goals", icon: Goal },
    {
      name: "Shopping List",
      href: "/dashboard/shopping-list",
      icon: ShoppingCart,
    },
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
    avatar: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
  };

  const userData = {
    name: user?.firstName || fallbackUser.name,
    email: user?.emailAddresses?.[0]?.emailAddress || fallbackUser.email,
    avatar: user?.imageUrl || fallbackUser.avatar,
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton size="lg" asChild>
          <a href="/dashboard">
            <div className="flex aspect-square size-8 items-center justify-center text-sidebar-primary-foreground">
              <Image src={Logo} alt="Logo" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">BUDGET BUDDY</span>
            </div>
          </a>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <LightToggle />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export default AppSidebar;
