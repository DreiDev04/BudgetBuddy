"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const UpdatePassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    // Simulate loading for demonstration
    setIsLoading(true);
    setTimeout(() => {
      console.log("Form submitted:", data);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="bg-secondary p-4 w-[800px] rounded-md">
      <header className="mb-4">
        <h1 className="text-xl font-bold">Update Password</h1>
        <p className="text-xs mx-2 text-muted-foreground italic">Update your account's password</p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="p-4">
          <div>
            <Label>Current Password</Label>
            <Controller
              name="currentPassword"
              control={control}
              rules={{ required: "Current password is required." }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter current password"
                  disabled={isLoading}
                />
              )}
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>
            )}
          </div>

          <div>
            <Label>New Password</Label>
            <Controller
              name="newPassword"
              control={control}
              rules={{ required: "New password is required." }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter new password"
                  disabled={isLoading}
                />
              )}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <Label>Confirm Password</Label>
            <Controller
              name="confirmPassword"
              control={control}
              rules={{ required: "Confirm password is required." }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  placeholder="Confirm new password"
                  disabled={isLoading}
                />
              )}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Updating..." : "Save"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default UpdatePassword;
