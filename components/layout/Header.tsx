import React from "react";
import { ModeToggle } from "../ui/mode-toggle";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SignOutButton } from "@clerk/nextjs";

const Header = async () => {
  const user = await currentUser();
  console.log(user);

  if (!user) {
    return null;
  }

  return (
    <header className="w-full px-4 py-2 flex items-center justify-end border-b gap-2 bg-card">
      <ModeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>{user.firstName?.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user.fullName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/user-profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <SignOutButton>
              <div className="w-full text-start flex"> 
                <button>Sign out</button>
              </div>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
