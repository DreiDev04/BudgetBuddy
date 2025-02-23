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
  Wallet,
  PiggyBank,
  TrendingUp,
  ArrowLeft,
  ArrowRight,
  DollarSign,
  Coins,
  CircleEllipsis,
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
import { currencies, getCurrencySymbol } from "@/helper/helper";

// Zod schema for validation. Here, the budgetLimit is required to be a positive number.
const accountFormSchema = z.object({
  accountName: z.string().nonempty({ message: "Account name is required" }),
  accountType: z.enum([
    "Cash",
    "Savings",
    "Investment",
    "Credit Card",
    "Other",
  ]),
  currency: z.enum([
    "PHP",
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
  ]),
  budgetLimit: z.preprocess(
    (a) => (typeof a === "string" && a.trim() === "" ? undefined : Number(a)),
    z.number({ required_error: "Budget limit is required" }).positive({
      message: "Budget limit must be greater than 0",
    })
  ),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

const AccountSetup = () => {
  const router = useRouter();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      accountName: "",
      accountType: "Cash",
      currency: "USD",
      budgetLimit: 0,
    },
  });

  // Watch values from the form to compute dynamic UI changes
  const accountNameValue = form.watch("accountName") as string;
  const budgetLimitValue = form.watch("budgetLimit");
  const watchedCurrency = form.watch("currency");

  // Disable the submit button if accountName (after trimming) or budgetLimit is empty.
  const isSubmitDisabled = !accountNameValue?.trim() || budgetLimitValue === 0;

  const getAccountTypeIcon = (type: string) => {
    switch (type) {
      case "Cash":
        return <Wallet className="mr-2 h-4 w-4" />;
      case "Savings":
        return <PiggyBank className="mr-2 h-4 w-4" />;
      case "Investment":
        return <TrendingUp className="mr-2 h-4 w-4" />;
      case "Credit Card":
        return <DollarSign className="mr-2 h-4 w-4" />;
      case "Other":
        return <CircleEllipsis className="mr-2 h-4 w-4" />;
      default:
        return null;
    }
  };

  const onSubmit = (data: AccountFormValues) => {
    // Extra manual checks (in addition to Zod validations)
    if (!data.accountName.trim()) {
      alert("Please enter an account name.");
      return;
    }
    if (!data.budgetLimit) {
      alert("Please enter a budget limit.");
      return;
    }

    localStorage.setItem("accountType", data.accountType);
    localStorage.setItem("accountName", data.accountName);
    localStorage.setItem("budgetLimit", data.budgetLimit.toString());
    localStorage.setItem("currency", data.currency);
    router.push("/onboarding/complete");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-full max-w-md">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Account Setup
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Let's set up your first account and budget. You can adjust
                  these settings later.
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Account Details Section */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-muted-foreground">
                  Account Details
                </h3>

                {/* Account Name */}
                <FormField
                  control={form.control}
                  name="accountName"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="accountName">Account Name</FormLabel>
                      <FormControl>
                        <Input
                          id="accountName"
                          type="text"
                          placeholder="e.g., My Daily Expenses"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Account Type */}
                <FormField
                  control={form.control}
                  name="accountType"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="accountType">Account Type</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="accountType" className="w-full">
                            <SelectValue placeholder="Select account type">
                              <div className="flex items-center">
                                {getAccountTypeIcon(field.value)}
                                {field.value}
                              </div>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Cash">
                              <div className="flex items-center">
                                <Wallet className="mr-2 h-4 w-4" />
                                Cash
                              </div>
                            </SelectItem>
                            <SelectItem value="Savings">
                              <div className="flex items-center">
                                <PiggyBank className="mr-2 h-4 w-4" />
                                Savings
                              </div>
                            </SelectItem>
                            <SelectItem value="Investment">
                              <div className="flex items-center">
                                <TrendingUp className="mr-2 h-4 w-4" />
                                Investment
                              </div>
                            </SelectItem>
                            <SelectItem value="Credit Card">
                              <div className="flex items-center">
                                <DollarSign className="mr-2 h-4 w-4" />
                                Credit Card
                              </div>
                            </SelectItem>
                            <SelectItem value="Other">
                              <div className="flex items-center">
                                <CircleEllipsis className="mr-2 h-4 w-4" />
                                Other
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Account Currency */}
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="currency">Account Currency</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger id="currency" className="w-full">
                            <SelectValue placeholder="Select currency">
                              <div className="flex items-center">
                                <Coins className="mr-2 h-4 w-4" />
                                {field.value} - {getCurrencySymbol(field.value)}
                              </div>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {currencies.map((curr) => (
                              <SelectItem key={curr.code} value={curr.code}>
                                <div className="flex items-center">
                                  <Coins className="mr-2 h-4 w-4" />
                                  {curr.code} - {curr.name} ({curr.symbol})
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
              </div>

              {/* Budget Settings Section */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-medium text-sm text-muted-foreground">
                  Budget Settings
                </h3>
                <FormField
                  control={form.control}
                  name="budgetLimit"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel htmlFor="budgetLimit">
                        Monthly Budget Limit
                      </FormLabel>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                          {getCurrencySymbol(watchedCurrency)}
                        </div>
                        <FormControl>
                          <Input
                            id="budgetLimit"
                            type="number"
                            placeholder="Enter your monthly budget"
                            {...field}
                            className="pl-9"
                          />
                        </FormControl>
                      </div>
                      <FormDescription>
                        Set a monthly spending limit to help track your expenses
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-between pt-6">
              <Link href="/onboarding">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
              <Button type="submit" size="sm" disabled={isSubmitDisabled}>
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

export default AccountSetup;
