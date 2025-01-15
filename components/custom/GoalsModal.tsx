"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const goalsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  targetGoal: z.number().min(0, "Target Goal must be greater than or equal to 0"),
  currentGoal: z.number().min(0, "Current Goal must be greater than or equal to 0"),
  targetDate: z.string().optional(),
  note: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
  currency: z.string().min(1, "Currency is required"),
  categories: z.string().min(1, "Category is required"),
});

type FormValues = z.infer<typeof goalsSchema>;

const fields: { id: keyof FormValues; label: string; type: string }[] = [
  { id: "name", label: "Name", type: "text" },
  { id: "note", label: "Note", type: "text" },
  // { id: "description", label: "Description", type: "text" },
  { id: "targetGoal", label: "Target Goal", type: "number" },
  // { id: "currentGoal", label: "Current Goal", type: "number" },
  { id: "targetDate", label: "Target Date", type: "date" },
  { id: "icon", label: "Icon", type: "text" },
  { id: "color", label: "Color", type: "text" },
  { id: "currency", label: "Currency", type: "text" },
  { id: "categories", label: "Categories", type: "text" },
];

const GoalsModal = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(goalsSchema),
    defaultValues: {
      name: "",
      description: "",
      targetGoal: 0,
      currentGoal: 0,
      targetDate: "",
      note: "",
      icon: "",
      color: "",
      currency: "",
      categories: "",
    },
  });

  // Handle number fields separately
  const handleNumberChange = (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = value ? parseFloat(value) : 0;
    form.setValue(field, parsedValue);
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
          <DialogTitle>Goals</DialogTitle>
          <DialogDescription>Set your goals</DialogDescription>
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
                          onChange={
                            field.type === "number"
                              ? handleNumberChange(field.id)
                              : controllerField.onChange
                          }
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

export default GoalsModal;
