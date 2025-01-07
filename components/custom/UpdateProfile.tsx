"use client";

import React, { useState } from "react";
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
  const email = user?.email;

  const [date, setDate] = useState<Date>();
  const [gender, setGender] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form's default submission behavior
    setIsLoading(true);

    try {
      // Simulate an async operation
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2 seconds delay
      console.log("Profile updated:", {
        username: user?.name,
        email,
        dateOfBirth: date,
        gender,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-secondary p-4 w-[800px] rounded-md">
        <header className="mb-4">
          <h1 className="text-xl font-bold">User Profile</h1>
          <p className="text-xs mx-2 text-muted-foreground italic">
            Update your account's profile information
          </p>
        </header>

        {/* User info */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 p-4">
            {/* User Details */}
            <div className="col-span-1">
              <div className="mb-4">
                <Label htmlFor="username" className="block mb-2">
                  Username
                </Label>
                <Input
                  type="text"
                  id="username"
                  placeholder={user?.name || "Enter your username"}
                  className="dark:border-2"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="email" className="block mb-2">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder={email || "Enter your email"}
                  className="dark:border-2"
                />
              </div>
            </div>

            {/* User Date and Gender */}
            <div className="col-span-1">
              <div className="mb-4 gap-2">
                <Label htmlFor="dob" className="block mb-2">
                  Date of Birth
                </Label>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="mb-4 gap-2">
                <Label htmlFor="gender" className="block mb-2">
                  Gender
                </Label>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-[100px] justify-start text-left font-normal",
                          !gender && "text-muted-foreground"
                        )}
                      >
                        {gender ? gender : <span>None</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <div className="flex flex-col text-center">
                        <Button
                          variant="ghost"
                          onClick={() => setGender("Male")}
                        >
                          Male
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setGender("Female")}
                        >
                          Female
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Save"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateProfile;
