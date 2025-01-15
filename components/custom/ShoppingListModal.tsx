"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define schema with zod
const shoppingItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  link: z.string().url("Invalid URL").optional(),
  price: z.number().min(0, "Price must be 0 or more"),
});

// Define form values type
type ShoppingItemFormValues = z.infer<typeof shoppingItemSchema>;

const fields: { id: keyof ShoppingItemFormValues; label: string; type: string }[] = [
  { id: "title", label: "Title", type: "text" },
  { id: "link", label: "Link", type: "text" },
  { id: "price", label: "Price", type: "number" },
];

const ShoppingListModal = () => {
  const form = useForm<ShoppingItemFormValues>({
    resolver: zodResolver(shoppingItemSchema),
    defaultValues: {
      title: "",
      link: "",
      price: 0,
    },
  });

  // Fix for number input: ensure price is treated as a number
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = value ? parseFloat(value) : 0;
    form.setValue("price", parsedValue); // Update the form value with a number
  };

  const onSubmit = (data: ShoppingItemFormValues) => {
    console.log("Form data:", data);
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
            {fields.map((field) => (
              <FormField
                key={field.id}
                control={form.control}
                name={field.id}
                render={({ field: controllerField }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-right col-span-1" htmlFor={field.id}>
                        {field.label}
                      </FormLabel>
                      <FormControl className="col-span-3">
                        <Input
                          {...controllerField}
                          id={field.id}
                          type={field.type}
                          value={controllerField.value ?? ""}
                          onChange={field.id === "price" ? handlePriceChange : controllerField.onChange}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <DialogFooter>
              <Button type="submit">Add Item</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ShoppingListModal;
