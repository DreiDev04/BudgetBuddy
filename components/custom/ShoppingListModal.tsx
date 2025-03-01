"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// Define schema with zod
const shoppingItemSchema = z.object({
  title: z.string().min(1, "Name is required"),
  link: z.string().url("Invalid URL").or(z.literal("")).optional(), // Allow empty string
  price: z.number().min(0, "Price must be 0 or more"),
});

// Form values type
type ShoppingItemFormValues = z.infer<typeof shoppingItemSchema>;

interface shoppingListModalProps {
  onItemAdded: () => void;
}

const ShoppingListModal:React.FC<shoppingListModalProps> = ({ onItemAdded }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<ShoppingItemFormValues>({
    resolver: zodResolver(shoppingItemSchema),
    defaultValues: {
      title: "",
      link: "",
      price: 0,
    },
  });

  const onSubmit = async (data: ShoppingItemFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/shopping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add item");
      }

      toast({ title: "Item added", description: "The item has been added to your shopping list" });
      form.reset();

      // Trigger the parent page update
      if (onItemAdded) onItemAdded();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to add item", variant: "destructive" });
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
          <DialogTitle>Add Item</DialogTitle>
          <DialogDescription>Add a new item to your shopping list</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      type="number"
                      min="0"
                      step="1"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^0\d/.test(value)) {
                          e.target.value = value.replace(/^0+/, "");
                        }
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
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Item"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};


export default ShoppingListModal;
