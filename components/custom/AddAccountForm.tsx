"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { accountTypes } from "@/helper/helper";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IAccount } from "@/types/account-types";
import { useToast } from "@/hooks/use-toast";
import { Loader2} from "lucide-react";


const AccountSchema = z.object({
    accountName: z.string().min(1, "Account name is required"),
    type: z.string().min(1, "Account type is required"),
    initialValue: z.number().min(0, "Initial value must be positive"),
  });

const DialogForm = ({
    setAccounts,
    setDialogOpen,
  }: {
    setAccounts: React.Dispatch<React.SetStateAction<IAccount[]>>;
    setDialogOpen: (open: boolean) => void;
  }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const form = useForm({
      resolver: zodResolver(AccountSchema),
      defaultValues: {
        accountName: "",
        type: "",
        initialValue: 0,
      },
    });

    const onSubmit = async (data: any) => {
      setIsSubmitting(true);
      try {
        const response = await fetch("/api/accounts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Failed to add account");
        }

        const newAccount = await response.json();
        setAccounts((prev) => [...prev, newAccount]);

        toast({
          title: "Success",
          description: "Account added successfully!",
        });

        setDialogOpen(false);
        form.reset();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to add account. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Account</DialogTitle>
          <DialogDescription>
            Add a new account to your dashboard.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="accountName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Name</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isSubmitting}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {accountTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="initialValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      type="number"
                      min="0"
                      step="1"
                      name={field.name}
                      value={field.value}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^0\d/.test(value)) {
                          e.target.value = value.replace(/^0+/, "");
                        }
                        field.onChange(parseFloat(e.target.value) || 0);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "-" || e.key === "e") {
                          e.preventDefault();
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Account"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    );
  };

export default DialogForm