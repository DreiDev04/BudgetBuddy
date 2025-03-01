"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IBudget } from "@/types/budget-types";
import { useToast } from "@/hooks/use-toast";
import { Colors } from "@/helper/categoriesColor";
import BudgetForm from "@/components/custom/BudgetForm";


// Schema for form validation
const formSchema = z.object({
  transactionType: z.enum(["income", "expense"]),
  amount: z.preprocess((val) => Number(val), z.number().min(1, "Amount must be at least 1")),
   category: z.object({
      name: z.string().min(1, "Category name must be at least 1 character"),
      hex: z.string().min(1, "Color hex is required"),
    })
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
        category: { name: "", hex: "" }
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
      <BudgetForm form={form} Colors={Colors} isSubmitting={isSubmitting} onSubmit={onSubmit} />
    </div>
  );
};

export default BudgetModal;
