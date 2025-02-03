"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { accountTypes } from "@/helper/helper";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const AccountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  value: z.number().min(1, "Value is required")
})

const page = () => {
  return (
    <div className="p-4">
      <section className="p-2 flex justify-between items-center rounded">
        <h1 className="text-2xl font-bold">Overview</h1>
        <Select defaultValue="all-account">
          <SelectTrigger className="w-[150px] border-none">
            <SelectValue placeholder="All Account" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all-account">All Account</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="savings">Savings</SelectItem>
              <SelectLabel>
                <Dialog>
                  <DialogTrigger>Add Account</DialogTrigger>
                  <DialogForm />
                </Dialog>
              </SelectLabel>
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>
    </div>
  );
};

const DialogForm = () => {

  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: "",
      type: "",
      value: 0,
    },
  })

  const onSubmit = (data: z.infer<typeof AccountSchema>) => {
    console.log("Form Submitted", data);
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Select onValueChange={field.onChange} value={field.value}>
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
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Value</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    min="0"
                    step="1"
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
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
          <Button type="submit">Add Account</Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default page;
