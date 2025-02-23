'use client'

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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

//schema for form validation
const formSchema = z.object({
  transactionType: z.enum(["income", "expense"]),
  amount: z.preprocess((val) => Number(val), z.number().min(1, "Amount must be at least 1")),
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
    },
  });

  const onSubmit = async() => {
    console.log()
  }

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
        </DialogContent>
    </Dialog>
  )
}

export default OverviewModal