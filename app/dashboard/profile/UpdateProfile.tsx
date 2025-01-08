"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const UpdateProfile = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [date, setDate] = useState<Date | undefined>(
    user?.birthdate ? new Date(user.birthdate) : undefined
  );
  const [gender, setGender] = useState(user?.gender || "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setGender(user.gender || "");
      setDate(user.birthdate ? new Date(user.birthdate) : undefined);
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Format the date as 'YYYY-MM-DD' before sending
      const formattedDate = date ? format(date, "yyyy-MM-dd") : undefined;

      const payload = {
        email,
        name,
        birthdate: formattedDate, // Send as 'YYYY-MM-DD'
        gender,
      };

      console.log("Sending payload:", payload);

      const response = await fetch("/api/auth/update-profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to update profile.");
      }

      console.log("Profile updated successfully:", result.user);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <section className="bg-secondary p-4 lg:w-[800px] w-full rounded-md mx-auto">
      <header className="mb-4 text-center lg:text-left">
        <h1 className="text-xl font-bold">User Profile</h1>
        <p className="text-xs mx-2 text-muted-foreground italic">
          Update your account's profile information
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="col-span-1">
            <Label htmlFor="username" className="block mb-2">Username</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="dark:border-2 w-full"
              disabled={isLoading}
            />
            <Label htmlFor="email" className="block mb-2 mt-4">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="dark:border-2 w-full"
              disabled={isLoading}
            />
          </div>
          <div className="col-span-1">
            <Label htmlFor="dob" className="block mb-2">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full md:w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                  disabled={isLoading}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(day) => setDate(day)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Label htmlFor="gender" className="block mb-2 mt-4">Gender</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full md:w-[125px] justify-start text-left font-normal",
                    !gender && "text-muted-foreground"
                  )}
                  disabled={isLoading}
                >
                  {gender || "Select Gender"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <div className="flex flex-col text-center">
                  {["Male", "Female", "Other"].map((option) => (
                    <Button
                      key={option}
                      variant="ghost"
                      onClick={() => setGender(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
            {isLoading ? "Updating..." : "Save"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default UpdateProfile;
