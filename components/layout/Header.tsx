"use client";
import React from "react";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import SignOutButton from "../shared/SignOutButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="w-full px-4 py-2 flex items-center justify-end border-b gap-2 bg-card">
      <ModeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild >
          <Button variant="outline">
            {user?.name || <Skeleton className="w-[50px] h-[20px]" />}
            <span>
              <ChevronDown />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href="/dashboard/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
