"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type FormValues = {
  title: string;
  description: string | null;
  categories: string;
  color: string | null;
  currency: string;
  budget: number;
  expenses: number;
};

const budgetSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  categories: z.string().min(1, "Category is required"),
  color: z.string().optional(),
  currency: z.string().min(1, "Currency is required"),
  budget: z.number().min(0, "Budget must be greater than or equal to 0"),
  expenses: z.number().min(0, "Expenses must be greater than or equal to 0"),
});

const fields: { id: keyof FormValues; label: string; type: string }[] = [
  { id: "title", label: "Title", type: "text" },
  { id: "description", label: "Description", type: "text" },
  { id: "categories", label: "Categories", type: "text" },
  { id: "color", label: "Color", type: "text" },
  { id: "currency", label: "Currency", type: "text" },
  { id: "budget", label: "Budget", type: "number" },
  { id: "expenses", label: "Expenses", type: "number" },
];

export const BudgetModal = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      title: "",
      description: "",
      categories: "",
      color: "",
      currency: "",
      budget: 0,
      expenses: 0,
    },
  });

  // Handle number fields separately to ensure they are treated as numbers
  const handleNumberChange = (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = value ? parseFloat(value) : 0;
    form.setValue(field, parsedValue); // Update the form value with a number
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
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
          <DialogTitle>Add Budget</DialogTitle>
          <DialogDescription>Add a budget to track your expenses</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field) => (
              <FormField
                key={field.id}
                control={form.control}
                name={field.id}
                render={({ field: controllerField }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <FormLabel htmlFor={field.id} className="text-right col-span-1">
                        {field.label}
                      </FormLabel>
                      <FormControl className="col-span-3">
                        <Input
                          {...controllerField}
                          id={field.id}
                          type={field.type}
                          value={controllerField.value ?? ""}
                          onChange={field.id === "budget" || field.id === "expenses" ? handleNumberChange(field.id) : controllerField.onChange}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetModal;
