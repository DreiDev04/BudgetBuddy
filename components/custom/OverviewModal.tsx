'use client'

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Colors } from "@/helper/categoriesColor";
import BudgetForm from "@/components/custom/BudgetForm";

// Schema for form validation
const formSchema = z.object({
  transactionType: z.enum(["income", "expense"]),
  amount: z.number().min(1, "Amount must be at least 1"),
  category: z.object({
    name: z.string().min(1, "Category name must be at least 1 character"),
    hex: z.string().min(1, "Color hex is required"),
  })
});

type FormData = z.infer<typeof formSchema>;

const OverviewModal = () => {
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
    setIsSubmitting(true);
    try {
      console.log("Form submitted:", data);
      toast({
        title: "Transaction Processed",
        description: `$${data.amount} ${
          data.transactionType === "income" ? "added to" : "subtracted from"
        } your budget in the ${data.category.name} category.`,
      });
      form.reset();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 p-4 py-6 rounded-full z-10 shadow-lg">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full md:w-[500px] m-auto">
        <DialogHeader>
          <DialogTitle>Add Income or Expense</DialogTitle>
        </DialogHeader>
        <BudgetForm form={form} Colors={Colors} isSubmitting={isSubmitting} onSubmit={onSubmit}/>
      </DialogContent>
    </Dialog>
  );
};

export default OverviewModal;
