"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSession} from "next-auth/react";
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type FormValues = z.infer<typeof formSchema>;

const UpdateProfile = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user, form]);

  const onSubmit = async (values: FormValues) => {
    try {
      if (!user?.id) {
        throw new Error("User ID is missing");
      }

      setIsLoading(true);

      const response = await fetch("/api/auth/update-profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id, ...values }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error(error.message || "Failed to update profile.");
      } else {
        console.log("Profile updated successfully");

        //Ignore Troubleshooting
        const result = await response.json();
        console.log("What should Show:", result);

        console.log(user);

      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-card p-10 lg:w-[800px] w-full rounded-md mx-auto">
      <header className="mb-4 text-center lg:text-left">
        <h1 className="text-xl font-bold">User Profile</h1>
        <p className="text-xs text-muted-foreground italic">
          Update your account's profile information
        </p>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col lg:w-[400px] w-full gap-4 p-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your name"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
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

export default UpdateProfile;
