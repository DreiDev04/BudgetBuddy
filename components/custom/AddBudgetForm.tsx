"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Colors } from "@/helper/color";
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
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { IBudget } from "@/types/budget-types";

const BudgetSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  budget: z.number().min(1, "Budget must be at least 1"),
  color: z.object({
    name: z.string().min(1, "Color name is required"),
    hex: z.string().min(1, "Color hex is required"),
  }),
});

const AddBudgetForm = ({
  setBudgets,
  setDialogOpen,
}: {
  setBudgets: React.Dispatch<React.SetStateAction<IBudget[]>>;
  setDialogOpen: (open: boolean) => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(BudgetSchema),
    defaultValues: {
      title: "",
      description: "",
      budget: 0,
      color: { name: "", hex: "" },
    },
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        color: [data.color],
        categories: [],
        expenses: [],
      };

      const response = await fetch("/api/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add budget");
      }

      const newBudget = await response.json();
      setBudgets((prev) => [...prev, newBudget]);

      toast({
        title: "Success",
        description: "Budget added successfully!",
      });

      setDialogOpen(false);
      form.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to add budget. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Budget Field */}
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  type="number"
                  min="1"
                  step="1"
                  name={field.name}
                  value={field.value}
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

        {/* Color Selection */}
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Select
                  disabled={isSubmitting}
                  onValueChange={(selected) => {
                    if (!selected) return;
                    field.onChange(JSON.parse(selected));
                  }}
                  value={field.value ? JSON.stringify(field.value) : ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Color" />
                  </SelectTrigger>
                  <SelectContent>
                    {Colors.map((color) => (
                      <SelectItem
                        key={color.value}
                        value={JSON.stringify({
                          name: color.name,
                          hex: color.hex,
                        })}
                      >
                        {color.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* Submit Button */}
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            "Add Budget"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AddBudgetForm;
