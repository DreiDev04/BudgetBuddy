"use client";
import React from "react";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full px-4 py-2 flex items-center justify-end border-b gap-2 bg-card">
      <ModeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {/* //TODO: Replace with user name */}
            {<Skeleton className="w-[50px] h-[20px]" />}
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
            {/* //TODO: Add SignOutButton */}
            {/* <SignOutButton /> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
