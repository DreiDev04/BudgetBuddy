"use client";

import { useState } from "react";
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

const AccountSetup = () => {
  const [accountType, setAccountType] = useState("Cash");
  const [accountName, setAccountName] = useState("");
  const [budgetLimit, setBudgetLimit] = useState("");
  const [currency, setCurrency] = useState("USD");
  const router = useRouter();

  const currencies = [
    { code: "PHP", symbol: "₱", name: "Philippine Peso" },
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
    { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  ];

  const handleComplete = () => {
    if (!accountName.trim()) return alert("Please enter an account name.");
    if (!budgetLimit) return alert("Please enter a budget limit.");

    localStorage.setItem("accountType", accountType);
    localStorage.setItem("accountName", accountName);
    localStorage.setItem("budgetLimit", budgetLimit);
    localStorage.setItem("currency", currency);
    router.push("/onboarding/complete");
  };

  const getAccountTypeIcon = (type: any) => {
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

  const getCurrencySymbol = (code: any) => {
    return currencies.find((c) => c.code === code)?.symbol || code;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Wallet className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Account Setup</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Let's set up your first account and budget. You can adjust these
              settings later.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Account Details Section */}
          <div className="space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground">
              Account Details
            </h3>
            <div className="space-y-2">
              <label htmlFor="accountName" className="text-sm font-medium">
                Account Name
              </label>
              <Input
                id="accountName"
                type="text"
                placeholder="e.g., My Daily Expenses"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="accountType" className="text-sm font-medium">
                Account Type
              </label>
              <Select value={accountType} onValueChange={setAccountType}>
                <SelectTrigger id="accountType" className="w-full">
                  <SelectValue placeholder="Select account type">
                    <div className="flex items-center">
                      {getAccountTypeIcon(accountType)}
                      {accountType}
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
            </div>

            <div className="space-y-2">
              <label htmlFor="currency" className="text-sm font-medium">
                Account Currency
              </label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger id="currency" className="w-full">
                  <SelectValue placeholder="Select currency">
                    <div className="flex items-center">
                      <Coins className="mr-2 h-4 w-4" />
                      {currency} - {getCurrencySymbol(currency)}
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
            </div>
          </div>

          {/* Budget Section */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-medium text-sm text-muted-foreground">
              Budget Settings
            </h3>
            <div className="space-y-2">
              <label htmlFor="budgetLimit" className="text-sm font-medium">
                Monthly Budget Limit
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  {getCurrencySymbol(currency)}
                </div>
                <Input
                  id="budgetLimit"
                  type="number"
                  placeholder="Enter your monthly budget"
                  value={budgetLimit}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (parseInt(value) >= 0 || value === "") {
                      setBudgetLimit(value);
                    }
                  }}
                  className="pl-9"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Set a monthly spending limit to help track your expenses
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between pt-6">
          <Link href="/onboarding">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <Button
            onClick={handleComplete}
            disabled={!accountName.trim() || !budgetLimit}
            size="sm"
          >
            Complete
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccountSetup;
