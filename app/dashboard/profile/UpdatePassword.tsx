"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { json } from "stream/consumers";

const formSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues =z.infer<typeof formSchema>

const UpdatePassword = () => {
  const { data:session } = useSession();
  const user = session?.user;
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      currentPassword:"",
      newPassword:"",
      confirmPassword:"",
    },
  });

  useEffect(() => {
    if (user){
      form.reset({
        currentPassword:"",
        newPassword:"",
        confirmPassword:"",
      })
    }
  }, [user, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      if (!user?.id) {
        throw new Error("User ID is missing");
      }

      setIsLoading(true);

      const response = await fetch("/api/auth/update-password", { // haven't set it yet
        method: 'PATCH',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: user.id, ...values}),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error(error.message || "Failed to update Password.");
      } else {
        console.log("Password updated successfully");
      }

    } catch(error) {
      console.error("Error updating password");
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <section className="bg-card p-10 lg:w-[800px] w-full rounded-md mx-auto">
      <header className="mb-4 text-center lg:text-left">
        <h1 className="text-xl font-bold">Update Password</h1>
        <p className="text-xs text-muted-foreground italic">
          Update your account's password
        </p>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col lg:w-[400px] w-full gap-4 p-4">
            {/* Current Password */}
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter current password"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New Password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter new password"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Confirm new password"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-center md:justify-end">
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? "Updating..." : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default UpdatePassword;
