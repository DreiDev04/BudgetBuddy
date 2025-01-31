"use client";

import { Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import AccountBalanceGraph from "@/components/graphs/AccountBalanceGraph";
import LastRecords from "@/components/graphs/LastRecords";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Input } from "@/components/ui/input";
import BudgetModal from "@/components/custom/BudgetModal";
import { IBudget } from "@/types/budget-types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Page = () => {
  const { user } = useUser();
  const [userBudget, setUserBudget] = useState<IBudget[] | null>(null);
  const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>("all");

  useEffect(() => {
    if (!user) return;
    const fetchUserBudget = async () => {
      try {
        const response = await fetch(`/api/budget/${user.id}`);
        if (!response.ok) {
          console.error("Error fetching user budget:", response.statusText);
          return;
        }
        const data: IBudget[] = await response.json();
        setUserBudget(data);
        console.log("User budget data:", data);
      } catch (error) {
        console.error("Error fetching user budget:", error);
      }
    };

    fetchUserBudget();
  }, [user]);

  if (!user || !userBudget) return null;

  // Get selected budget or all budgets
  const selectedBudget =
    selectedBudgetId === "all"
      ? userBudget
      : userBudget.filter((budget) => budget._id === selectedBudgetId);

  // Get total balance
  const accountBalance =
    selectedBudget?.reduce((sum, budget) => sum + (budget.budget || 0), 0) ?? 0;

  // Process data for graphs
  const accountData =
    selectedBudget?.map((budget) => ({
      date: new Date(budget.createdAt).toISOString().split("T")[0],
      income: budget.budget || 0,
      expenses:
        budget.expenses?.reduce((sum, exp) => sum + exp.amount, 0) ?? 0,
    })) ?? [];

  const spendingData =
    selectedBudget?.flatMap((budget) =>
      budget.expenses?.map((expense) => ({
        id: `${budget._id}-${expense._id}`,
        label: expense.name,
        category: expense.category?.name || "Uncategorized",
        amount: expense.amount,
        date: new Date(expense.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
        fill: expense.category?.color?.hex || "#ccc",
      })) ?? []
    ) ?? [];

  return (
    <section className="flex flex-col gap-4">
      <pre>{JSON.stringify(userBudget, null, 2)}</pre>
      <Card className="flex items-center gap-4 border-b p-5 justify-center lg:justify-end sm:flex-row">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold">Balance Today:</h3>
          <Input
              className="text-xl font-medium w-28"
              // placeholder={`$$userBudget?.budget.toLocaleString()`}
              placeholder={`$${(
                selectedBudgetId === "all"
                  ? userBudget.reduce((sum, b) => sum + b.budget, 0) // Sum all budgets
                  : userBudget.find((b) => b._id === selectedBudgetId)?.budget || 0 // Find selected budget
              ).toLocaleString()}`}
              value={`$${accountBalance.toLocaleString()}`}
              readOnly
            />
          <Pencil className="w-5 h-5" aria-hidden="true" />
        </div>
        {/* Drop down for selecting budget */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                {selectedBudgetId === "all"
                  ? "All Budgets"
                  : userBudget.find((b) => b._id === selectedBudgetId)?.title ||
                    "Select Budget"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedBudgetId("all")}>
                All Budgets
              </DropdownMenuItem>
              {userBudget.map((budget) => (
                <DropdownMenuItem
                  key={String(budget._id)}
                  onClick={() => setSelectedBudgetId(String(budget._id))}
                >
                  {budget.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
      </Card>
      <AccountBalanceGraph data={accountData} />
      <LastRecords data={spendingData} />
      <div className="fixed bottom-6 right-6 p-4 py-6 z-10 ">
        <BudgetModal />
      </div>
    </section>
  );
};

export default Page;
