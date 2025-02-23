"use client";
import React, { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Schema for form validation
const formSchema = z.object({
  transactionType: z.enum(["income", "expense"]),
  amount: z.preprocess((val) => Number(val), z.number().min(1, "Amount must be at least 1")),
});

type FormData = z.infer<typeof formSchema>;

interface BudgetModalProps {
  budget: IBudget | null;
  setBudgets: React.Dispatch<React.SetStateAction<IBudget | null>>;
  setDialogOpen: (open: boolean) => void;
}

const BudgetModal = ({ budget, setBudgets, setDialogOpen }: BudgetModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionType: "income",
      amount: 0,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (!budget) {
      toast({ title: "Error", description: "No budget selected", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const updatedBudgetLimit =
        data.transactionType === "income"
          ? budget.budgetLimit + data.amount
          : budget.budgetLimit - data.amount;

      const response = await fetch(`/api/budget/${budget._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ budgetLimit: updatedBudgetLimit }),
      });

      if (!response.ok) throw new Error("Failed to update budget");

      // Update the UI
      setBudgets({ ...budget, budgetLimit: updatedBudgetLimit });  //Argument of type 'IBudget' is not assignable to parameter of type 'SetStateAction<IBudget | null>'.

      toast({
        title: "Budget Updated",
        description: `₱${data.amount} ${
          data.transactionType === "income" ? "added to" : "subtracted from"
        } your budget.`,
      });

      setDialogOpen(false);
      form.reset();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mx-[40px]">
        {/* Tabs for Income/Expense */}
        <FormField
          control={form.control}
          name="transactionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Type</FormLabel>
              <Tabs value={field.value} onValueChange={field.onChange} defaultValue="income">
                <div className="flex justify-center">
                  <TabsList className="flex space-x-4">
                    <TabsTrigger value="income">Income</TabsTrigger>
                    <TabsTrigger value="expense">Expense</TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
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
                  min={1}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^0\d/.test(value)) e.target.value = value.replace(/^0+/, "");
                    field.onChange(parseFloat(e.target.value) || 0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") e.preventDefault();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Submit"}
        </Button>
      </form>
    </Form>
    </div>
  );
};

export default BudgetModal;
