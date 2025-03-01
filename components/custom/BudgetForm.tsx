import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BudgetFormProps {
    form: any;
    Colors: any;
    isSubmitting: boolean;
    onSubmit: any;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ form, Colors, isSubmitting, onSubmit }) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mx-[40px]">
        <FormField
          control={form.control}
          name="transactionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Type</FormLabel>
              <Tabs value={field.value} onValueChange={field.onChange}>
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
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "e") e.preventDefault();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose Category</FormLabel>
              <FormControl>
                <Select
                  disabled={isSubmitting}
                  onValueChange={(selected) => {
                    if (selected) {
                      field.onChange(JSON.parse(selected));
                    }
                  }}
                  value={JSON.stringify(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Colors.map((color: any) => (
                      <SelectItem
                        key={color.value}
                        value={JSON.stringify({ name: color.name, hex: color.color })}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="flex h-3 w-3 shrink-0 rounded-sm"
                            style={{ backgroundColor: color.color }}
                          />
                          {color.icon}
                          {color.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
  );
};

export default BudgetForm;

// Now, you can use this component like this:
// <BudgetForm form={form} Colors={Colors} isSubmitting={isSubmitting} onSubmit={onSubmit} />
// Let me know if you’d like me to add anything else! 🚀
