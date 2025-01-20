"use client";

import { Pencil } from "lucide-react";
import { Card } from "@/components/ui/card";
import AccountBalanceGraph from "@/components/graphs/AccountBalanceGraph";
import LastRecords from "@/components/graphs/LastRecords";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { getUserBudget } from "./actions";
import BudgetModal from "@/components/custom/BudgetModal";

interface Budget {
  id: string;
  title: string;
  amount: number;
}

const Page = () => {
  const { user } = useUser();
  const [userBudget, setUserBudget] = useState<Budget | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchUserBudget = async () => {
      try {
        const budget = await getUserBudget(user.id);
        setUserBudget(budget || null);  // Set the budget to null if not found
      } catch (error) {
        console.error("Error fetching user budget:", error);
      }
    };

    fetchUserBudget();
  }, [user]);

  if (!user) return null;  // Ensure user is available before rendering the component

  return (
    <section className="flex flex-col gap-4">
      <pre>{JSON.stringify(userBudget, null, 2)}</pre>
      <Card className="flex items-center gap-4 border-b p-5 justify-center lg:justify-end sm:flex-row">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Balance Today:</h2>
          <p className="text-xl font-medium">$50,000</p>
          <Pencil className="w-5 h-5" aria-hidden="true" />
        </div>
      </Card>
      <AccountBalanceGraph />
      <LastRecords />
      <div className="fixed bottom-6 right-6 p-4 py-6 z-10 ">
        <BudgetModal />
      </div>
    </section>
  );
};

export default Page;
