"use client";
import { Pencil } from "lucide-react";
import { Card } from "@/components/ui/card";
import AccountBalanceGraph from "../../../components/graphs/AccountBalanceGraph";
import LastRecords from "../../../components/graphs/LastRecords";
import { useUser } from "@clerk/clerk-react";
import { AccountData, SpendingData } from "@/components/data/data";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import BudgetModal from "@/components/custom/BudgetModal";

const page = () => {
  const { user } = useUser();
  const [accountBalance, setAccountBalance] = useState<number>(0);

  useEffect(() => {
    if (AccountData.length > 0) {
      // Calculate the total account balance
      const totalBalance = AccountData.reduce((acc, record) => {
        return acc + record.income - record.expenses;
      }, 0);

      setAccountBalance(totalBalance);
    }
  }, []);

  if (!user) return null;

  return (
    <section className="flex flex-col gap-4">
      <Card className="flex items-center gap-4 border-b p-5 justify-center lg:justify-end sm:flex-row">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold">Balance Today:</h3>
          <Input
            className="text-xl font-medium w-28"
            placeholder={`$${accountBalance.toLocaleString()}`}
            value={`$${accountBalance.toLocaleString()}`}
            readOnly
          />
          <Pencil className="w-5 h-5" aria-hidden="true" />
        </div>
      </Card>
      <AccountBalanceGraph data={AccountData} />
      {/* Last Records Overview */}
      <LastRecords data={SpendingData} />
      {/* Modal for Budget */}
      <div className="fixed bottom-6 right-6 p-4 py-6 z-10 ">
        <BudgetModal />
      </div>
    </section>
  );
};

export default page;
