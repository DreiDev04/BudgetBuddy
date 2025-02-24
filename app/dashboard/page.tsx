"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import BudgetInfo from "@/components/custom/BudgetInfo";
import DialogForm from "@/components/custom/AddAccountForm";

import { IAccount } from "@/types/account-types";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Loader2 } from "lucide-react";
import Image from "next/image";
import { get } from "http";
import { getCurrencySymbol } from "@/helper/helper";
import AccountBalanceGraph from "@/components/graphs/AccountBalanceGraph";
import { AccountOverviewGraph } from "@/components/graphs/AccountOverviewGraph";
import OverviewModal from "@/components/custom/OverviewModal";
import RecordsOverview from "@/components/graphs/RecordsOverview";
import ReportsGraph from "@/components/graphs/ReportsGraph";
import CategoriesGraph from "@/components/graphs/CategoriesGraph";

const chartData = [
  { date: "2024-04-01", income: 222, expenses: 0 },
  { date: "2024-04-02", income: 97, expenses: 0 },
  { date: "2024-04-03", income: 167, expenses: 120 },
  { date: "2024-04-04", income: 242, expenses: 260 },
  { date: "2024-04-05", income: 373, expenses: 290 },
  { date: "2024-04-06", income: 301, expenses: 340 },
  { date: "2024-04-07", income: 245, expenses: 180 },
  { date: "2024-04-08", income: 409, expenses: 320 },
  { date: "2024-04-09", income: 59, expenses: 110 },
  { date: "2024-04-10", income: 261, expenses: 190 },
  { date: "2024-04-11", income: 327, expenses: 350 },
  { date: "2024-04-12", income: 292, expenses: 210 },
  { date: "2024-04-13", income: 342, expenses: 380 },
  { date: "2024-04-14", income: 137, expenses: 220 },
  { date: "2024-04-15", income: 120, expenses: 170 },
  { date: "2024-04-16", income: 138, expenses: 190 },
  { date: "2024-04-17", income: 446, expenses: 360 },
  { date: "2024-04-18", income: 364, expenses: 410 },
  { date: "2024-04-19", income: 243, expenses: 180 },
  { date: "2024-04-20", income: 89, expenses: 150 },
  { date: "2024-04-21", income: 137, expenses: 200 },
  { date: "2024-04-22", income: 224, expenses: 170 },
  { date: "2024-04-23", income: 138, expenses: 230 },
  { date: "2024-04-24", income: 387, expenses: 290 },
  { date: "2024-04-25", income: 215, expenses: 250 },
  { date: "2024-04-26", income: 75, expenses: 130 },
  { date: "2024-04-27", income: 383, expenses: 420 },
  { date: "2024-04-28", income: 122, expenses: 180 },
  { date: "2024-04-29", income: 315, expenses: 240 },
  { date: "2024-04-30", income: 454, expenses: 380 },
  { date: "2024-05-01", income: 165, expenses: 220 },
  { date: "2024-05-02", income: 293, expenses: 310 },
  { date: "2024-05-03", income: 247, expenses: 190 },
  { date: "2024-05-04", income: 385, expenses: 420 },
  { date: "2024-05-05", income: 481, expenses: 390 },
  { date: "2024-05-06", income: 498, expenses: 520 },
  { date: "2024-05-07", income: 388, expenses: 300 },
  { date: "2024-05-08", income: 149, expenses: 210 },
  { date: "2024-05-09", income: 227, expenses: 180 },
  { date: "2024-05-10", income: 293, expenses: 330 },
  { date: "2024-05-11", income: 335, expenses: 270 },
  { date: "2024-05-12", income: 197, expenses: 240 },
  { date: "2024-05-13", income: 197, expenses: 160 },
  { date: "2024-05-14", income: 448, expenses: 490 },
  { date: "2024-05-15", income: 473, expenses: 380 },
  { date: "2024-05-16", income: 338, expenses: 400 },
  { date: "2024-05-17", income: 499, expenses: 420 },
  { date: "2024-05-18", income: 315, expenses: 350 },
  { date: "2024-05-19", income: 235, expenses: 180 },
  { date: "2024-05-20", income: 177, expenses: 230 },
  { date: "2024-05-21", income: 82, expenses: 140 },
  { date: "2024-05-22", income: 81, expenses: 120 },
]


export const useSpendingData = () =>
  useState([
    { id: '1', label: "Income", category: 'rent', amount: 1200, date: "2024-05-22", fill: 'var(--color-rent)' },
    { id: '2', label: "Expense", category: 'groceries', amount: 350, date: "2024-05-22", fill: 'var(--color-groceries)' },
    { id: '3', label: "Expense", category: 'transportation', amount: 150, date: "2024-05-22", fill: 'var(--color-transportation)' },
    { id: '4', label: "Expense", category: 'entertainment', amount: 200, date: "2024-05-22", fill: 'var(--color-entertainment)' },
    { id: '5', label: "Income", category: 'utilities', amount: 100, date: "2024-05-22", fill: 'var(--color-utilities)' },
    { id: '6', label: "Income", category: 'rent', amount: 1800, date: "2024-05-22", fill: 'var(--color-rent)' },

  ]);

  export const useAggregatedSpendingData = (spendingData: any[]) =>
    useState(() =>
      spendingData.reduce((acc: any[], record) => {
        const existingCategory = acc.find(item => item.category === record.category);

        if (existingCategory) {
          existingCategory.amount += record.amount;
        } else {
          acc.push({
            category: record.category,
            amount: record.amount,
            fill: record.fill,
          });
        }

        return acc;
      }, [])
    );


const page = () => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>("all-account");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  const [spendingData] = useSpendingData();
  const [aggregatedSpendingData] = useAggregatedSpendingData(spendingData);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(`/api/accounts/`);
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch accounts. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  const filteredAccounts =
    selectedAccount === "all-account"
      ? accounts
      : accounts.filter((account) => account.accountName === selectedAccount);

  console.log(accounts);

  return (
    // <div className="p-4">
    //   <section className="p-2 flex justify-between items-center rounded">
    //     <h1 className="text-2xl font-bold">
    //       {selectedAccount === "all-account"
    //         ? "Overview - All Accounts"
    //         : `Overview - ${selectedAccount}`}
    //     </h1>
    //     <Select
    //       value={selectedAccount}
    //       onValueChange={(value) => setSelectedAccount(value)}
    //       defaultValue="all-account"
    //     >
    //       <SelectTrigger className="w-[150px] border-none">
    //         <SelectValue placeholder="All Account" />
    //       </SelectTrigger>
    //       <SelectContent>
    //         <SelectGroup>
    //           <SelectItem value="all-account">All Account</SelectItem>
    //           {accounts.map((account, index) => (
    //             <SelectItem key={index} value={account.accountName}>
    //               {account.accountName}
    //             </SelectItem>
    //           ))}
    //           <SelectLabel>
    //             <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
    //               <DialogTrigger asChild>
    //                 <Button variant="ghost" className="w-full justify-start">
    //                   Add Account
    //                 </Button>
    //               </DialogTrigger>
    //               <DialogForm
    //                 setAccounts={setAccounts}
    //                 setDialogOpen={setDialogOpen}
    //               />
    //             </Dialog>
    //           </SelectLabel>
    //         </SelectGroup>
    //       </SelectContent>
    //     </Select>
    //   </section>

    //   <BudgetInfo income={300} expenses={200} balance={100} />

    //   {isLoading ? (
    //     <div className="flex justify-center items-center h-40">
    //       <Loader2 className="h-8 w-8 animate-spin" />
    //     </div>
    //   ) : (
    //     <>
    //       {filteredAccounts.length > 0 ? (
    //         filteredAccounts.map((account, index) => (
    //           <div key={index} className="space-y-2">
    //             <h2 className="font-bold">{account.accountName}</h2>
    //             {/* <p>Initial Value: ${account.initialValue}</p> */}
    //           </div>
    //         ))
    //       ) : (
    //         <p>No accounts found.</p>
    //       )}
    //     </>
    //   )}
    //   <pre>{JSON.stringify(accounts, null, 2)}</pre>
    // </div>
    <section className="min-h-screen flex flex-col lg:p-4 md:p-2">
      <article className="w-full bg-card rounded-md p-4 border space-y-4">
        <header className="flex items-center gap-4">
          <figure className="flex-shrink-0">
            <Image
              src="https://cdn-icons-png.flaticon.com/128/781/781831.png"
              alt=""
              width={75}
              height={75}
              className="bg-blue-400 rounded-sm p-3 max-w-[75px] w-full"
              aria-hidden="true"
            />
          </figure>
          <ul className="space-y-1">
            {accounts.map((account, index) => (
              <li key={index}>
                <h2 className="font-bold text-lg">{account.accountName}</h2>
                <p className="text-card-foreground text-sm">{account.type}</p>
              </li>
            ))}
          </ul>
        </header>
            {/* <div className="w-full flex justify-between items-center">
          <div>
            <h2 className="text-card-foreground text-sm">Today</h2>
            <p className="text-primary text-3xl font-bold">
              {accounts.map((account, index) => (
                <span key={index}>
                  {getCurrencySymbol(account.currency)} {account.budgetLimit}
                </span>
              ))}
            </p>
          </div>
        </div> */}
        <section className="grid grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-12 lg:row-span-1">
            <AccountOverviewGraph data={chartData}  />
          </div>

          <div className="col-span-12 lg:col-span-6 lg:row-span-4 md:col-span-6 md:row-span-4">
            <RecordsOverview data={spendingData} />
          </div>

          <div className="col-span-12 lg:col-span-6 lg:row-span-2 md:col-span-6 md:row-span-2">
            <CategoriesGraph data={aggregatedSpendingData} />
          </div>

          <div className="col-span-12 lg:col-span-6 lg:row-span-2 md:col-span-6 md:row-span-2">
            <ReportsGraph reportsData={chartData} />
          </div>

        </section>
      </article>
      <OverviewModal />
    </section>
  );
};

export default page;
