"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { IBudget } from "@/types/budget-types";

// Schema for form validation
const formSchema = z.object({
  transactionType: z.enum(["income", "expense"]),
  amount: z.number().min(1, "Amount must be at least 1"),
});

type FormData = z.infer<typeof formSchema>;

interface BudgetModalProps {
  setBudgets: React.Dispatch<React.SetStateAction<IBudget[]>>; //subject to change
  setDialogOpen: (open: boolean) => void;
}

const BudgetModal = ({ setBudgets, setDialogOpen }: BudgetModalProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionType: "income",
      amount: 0
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted", data);
    setDialogOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 mx-[40px]">
        {/* Toggle for Income/Expense */}
        <FormField
          control={form.control}
          name="transactionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Type</FormLabel>
              <ToggleGroup type="single" value={field.value} onValueChange={field.onChange}>
                <ToggleGroupItem value="income">Income</ToggleGroupItem>
                <ToggleGroupItem value="expense">Expense</ToggleGroupItem>
              </ToggleGroup>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Amount Input */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                type="number"
                placeholder="Enter amount"
                onChange={(e) => {
                  const value = e.target.value;
                  // Prevent leading zeros
                  if (/^0\d/.test(value)) {
                    e.target.value = value.replace(/^0+/, "");
                  }
                  field.onChange(parseFloat(e.target.value) || 0);
                }}
                onKeyDown={(e) => {
                  // Prevent invalid characters
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
        <Button
        type="submit"
        className="w-full"
        >Submit</Button>
      </form>
    </Form>
  );
};

export default BudgetModal;
