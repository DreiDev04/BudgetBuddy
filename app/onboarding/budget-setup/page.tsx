"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  PiggyBank,
  ArrowLeft,
  ArrowRight,
  DollarSign,
  PlusCircle,
  Wallet,
} from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { getCurrencySymbol } from "@/helper/helper";
import { INCOME_CATEGORY_NAME } from "@/helper/constants";
import { IAccountBudget, IncomeCategoryNameType } from "@/types/budget-types";

const budgetFormSchema = z.object({
  label: z.string().nonempty({ message: "Income label is required" }),
  amount: z.preprocess(
    (a) => (typeof a === "string" && a.trim() === "" ? undefined : Number(a)),
    z.number({ required_error: "Amount is required" }).positive({
      message: "Amount must be greater than 0",
    })
  ),
  category: z.string().nonempty({ message: "Category is required" }),
});

export type BudgetFormValues = z.infer<typeof budgetFormSchema>;

const BudgetSetup = () => {
  const router = useRouter();
  const [currency, setCurrency] = useState("PHP");
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountId, setAccountId] = useState("");

  useEffect(() => {
    const storedCurrency = localStorage.getItem("currency");
    const storedAccountName = localStorage.getItem("accountName");
    const storedAccountType = localStorage.getItem("accountType");

    if (storedCurrency) setCurrency(storedCurrency);
    if (storedAccountName) setAccountName(storedAccountName);
    if (storedAccountType) setAccountType(storedAccountType);
  }, []);

  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: {
      label: "Monthly Income",
      amount: 0,
      category: "",
    },
  });

  const amount = form.watch("amount");
  const label = form.watch("label");
  const category = form.watch("category");

  const isSubmitDisabled = !amount || amount <= 0 || !label.trim() || !category;

  const onSubmit = (data: BudgetFormValues) => {
    const budgetEntry = {
      label: data.label,
      amount: data.amount,
      transactionType: "income",
      category: data.category,
      isDeleted: false,
    };
    localStorage.setItem("accountBudgets", JSON.stringify(budgetEntry));
    router.push("/onboarding/complete");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-full max-w-md">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Income Setup (Step 2 of 2)
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Let's set up your monthly income for{" "}
                  {accountName || "your account"}.
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Account Summary */}
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-medium text-sm mb-2">Account Summary</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Account Name:</div>
                  <div className="font-medium">{accountName || "N/A"}</div>
                  <div className="text-muted-foreground">Account Type:</div>
                  <div className="font-medium">{accountType || "N/A"}</div>
                  <div className="text-muted-foreground">Currency:</div>
                  <div className="font-medium">{currency}</div>
                </div>
              </div>

              {/* Income Setup Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-600">
                  <PlusCircle className="h-5 w-5" />
                  <h3 className="font-medium text-sm">Monthly Income</h3>
                </div>

                {/* Income Label */}
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="label">Income Label</FormLabel>
                      <FormControl>
                        <Input
                          id="label"
                          placeholder="e.g., Monthly Salary, Freelance Income"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Income Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="category">Income Category</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Select income category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {INCOME_CATEGORY_NAME.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Income Amount */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="amount">
                        Monthly Income Amount
                      </FormLabel>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                          {getCurrencySymbol(currency)}
                        </div>
                        <FormControl>
                          <Input
                            id="amount"
                            type="number"
                            min="0"
                            step="0.01"
                            onKeyDown={(e) => {
                              if (
                                e.key === "-" ||
                                e.key === "e" ||
                                e.key === "+"
                              ) {
                                e.preventDefault();
                              }
                            }}
                            placeholder="Enter your monthly income"
                            {...field}
                            className="pl-9"
                          />
                        </FormControl>
                      </div>
                      <FormDescription>
                        Set your expected monthly income before taxes and
                        deductions
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-between pt-6">
              <Link href="/onboarding/account-setup">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
              <Button
                type="submit"
                size="sm"
                disabled={isSubmitDisabled}
                className="bg-primary hover:bg-green-700"
              >
                Complete
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default BudgetSetup;
