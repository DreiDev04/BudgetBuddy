"use client";

import { Pencil } from "lucide-react";
import { Card } from "@/components/ui/card";
import AccountBalanceGraph from "@/components/graphs/AccountBalanceGraph";
import LastRecords from "@/components/graphs/LastRecords";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useAccountData, useSpendingData } from "@/app/dashboard/page";
import { Input } from "@/components/ui/input";
import BudgetModal from "@/components/custom/BudgetModal";
import { IBudget } from "@/types/budget-types";
import Budget from "@/models/Budget";

const Page = () => {
  const { user } = useUser();
  const [userBudget, setUserBudget] = useState<IBudget[] | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchUserBudget = async () => {
      try {
        const response = await fetch(`/api/budget/${user.id}`);
        if (!response.ok) {
          console.error("Error fetching user budget:", response.statusText);
          return;
        }
        const data = await response.json();
        setUserBudget(data);
        console.log("User budget data:", data);
      } catch (error) {
        console.error("Error fetching user budget:", error);
      }
    };

    fetchUserBudget();
  }, [user]);

  if (!user) return null;

  const accountBalance = userBudget?.reduce((sum, amount) => sum + amount.budget, 0) ?? 0;

  const accountData = (userBudget || []).map((budget) => ({
    date: new Date(budget.createdAt).toISOString().split("T")[0],
    income: budget.budget,
    expenses: budget.expenses ? budget.expenses.reduce((sum, exp) => sum + exp.amount, 0) : 0,
  }));

  const spendingData = (userBudget || []).map((budget) => ({

  }));


  return (
    <section className="flex flex-col gap-4">
      <pre>{JSON.stringify(userBudget, null, 2)}</pre>
      <Card className="flex items-center gap-4 border-b p-5 justify-center lg:justify-end sm:flex-row">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold">Balance Today:</h3>
          <Input
            className="text-xl font-medium w-28"
            // placeholder={`$${userBudget?.budget.toLocaleString()}`}
            value={`$${accountBalance.toLocaleString()}`}
            readOnly
          />
          <Pencil className="w-5 h-5" aria-hidden="true" />
        </div>
      </Card>
      <AccountBalanceGraph data={accountData} />
      {/* <LastRecords data={spendingData} /> */}
      <div className="fixed bottom-6 right-6 p-4 py-6 z-10 ">
        <BudgetModal />
      </div>
    </section>
  );
};

export default Page;
