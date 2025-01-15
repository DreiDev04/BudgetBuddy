"use client";
import { Pencil } from "lucide-react";
import { Card } from "@/components/ui/card";
import AccountBalanceGraph from "../graphs/AccountBalanceGraph";
import LastRecords from "../graphs/LastRecords";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { getUserBudget } from "./actions";

const page = () => {
  const { user } = useUser();

  if (!user) return null;

  useEffect(() => {
    const userBudget = getUserBudget(user.id);
    console.log(userBudget);
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <Card className="flex items-center gap-4 border-b p-5 justify-center lg:justify-end sm:flex-row">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Balance Today:</h2>
          <p className="text-xl font-medium">$50,000</p>
          <Pencil className="w-5 h-5" aria-hidden="true" />
        </div>
      </Card>
      <AccountBalanceGraph />
      <LastRecords />
    </section>
  );
};

export default page;
