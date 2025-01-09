"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Receipt, PiggyBank, User, Goal } from "lucide-react";

function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Budget", href: "/dashboard/budget", icon: PiggyBank },
    { name: "Transaction", href: "/dashboard/transaction", icon: Receipt },
    { name: "Goals", href: "/dashboard/goals", icon: Goal },
    { name: "Design", href: "/dashboard/Design", icon: User }, //design system

  ];

  return (
    <nav className="bg-card border-r lg:w-64 lg:min-h-screen fixed lg:relative bottom-0 left-0 w-full lg:flex lg:flex-col z-10">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block p-4">
        <h1 className="text-xl font-bold ">Budget Buddy</h1>
      </div>
      <div className="flex lg:flex-col justify-between px-2 lg:px-0 py-2 lg:py-4 bg-card md:bg-background lg:bg-transparent ">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex lg:justify-start justify-center items-center gap-2 px-3 py-2  transition-all duration-300
                ${
                  isActive
                    ? "bg-card text-primary"
                    : "text-foreground hover:bg-card hover:text-primary "
                }`}
            >
              <div className="lg:flex lg:gap-2 items-center justify-center w-full text-center md:text-start">
                <item.icon className="w-5 h-5 mx-auto" />
                <span className="w-full">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default Sidebar;
