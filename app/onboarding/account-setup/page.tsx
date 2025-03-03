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
  Coins,
  CircleEllipsis,
  DollarSign,
} from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ACCOUNT_TYPE, CURRENCY } from "@/helper/constants";

// Zod schema for account setup step
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
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

const AccountSetup = () => {
  const router = useRouter();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      accountName: "",
      accountType: "Cash",
      currency: "PHP",
    },
  });

  const accountNameValue = form.watch("accountName") as string;

  const isSubmitDisabled = !accountNameValue?.trim();

  // const getAccountTypeIcon = (type: string) => {
  //   switch (type) {
  //     case "Cash":
  //       return <Wallet className="mr-2 h-4 w-4" />;
  //     case "Savings":
  //       return <PiggyBank className="mr-2 h-4 w-4" />;
  //     case "Investment":
  //       return <TrendingUp className="mr-2 h-4 w-4" />;
  //     case "Credit Card":
  //       return <DollarSign className="mr-2 h-4 w-4" />;
  //     case "Other":
  //       return <CircleEllipsis className="mr-2 h-4 w-4" />;
  //     default:
  //       return null;
  //   }
  // };

  const onSubmit = (data: AccountFormValues) => {
    if (!data.accountName.trim()) {
      alert("Please enter an account name.");
      return;
    }

    localStorage.setItem("accountType", data.accountType);
    localStorage.setItem("accountName", data.accountName);
    localStorage.setItem("currency", data.currency);

    // Navigate to budget setup
    router.push("/onboarding/budget-setup");
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
                  Account Setup (Step 1 of 2)
                </h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Let's set up your first account. You can adjust these settings
                  later.
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
                                {field.value}
                              </div>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {ACCOUNT_TYPE.map((type) => (
                              <SelectItem key={type} value={type}>
                                <div className="flex items-center">{type}</div>
                              </SelectItem>
                            ))}
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
                                {field.value}
                              </div>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {CURRENCY.map((curr) => (
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
            </CardContent>

            <CardFooter className="flex justify-between pt-6">
              <Link href="/onboarding">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
              <Button size="sm" disabled={isSubmitDisabled} type="submit">
                Next
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
