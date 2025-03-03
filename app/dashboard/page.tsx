"use client";
import React, { useEffect, useState } from "react";
import { IAccount } from "@/types/account-types";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Loader2 } from "lucide-react";
import Image from "next/image";
import { getCurrencySymbol } from "@/helper/helper";
import AccountBalanceGraph from "@/components/graphs/BudgetBalanceGraph";
import { AccountOverviewGraph } from "@/components/graphs/AccountOverviewGraph";
import OverviewModal from "@/components/custom/OverviewModal";
import RecordsOverview from "@/components/graphs/RecordsOverview";
import ReportsGraph from "@/components/graphs/ReportsGraph";
import CategoriesGraph from "@/components/graphs/CategoriesGraph";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { any } from "zod";

// const chartData = [
//   { date: "2024-04-01", income: 222, expenses: 0 },
//   { date: "2024-04-02", income: 97, expenses: 0 },
//   { date: "2024-04-03", income: 167, expenses: 120 },
//   { date: "2024-04-04", income: 242, expenses: 260 },
//   { date: "2024-04-05", income: 373, expenses: 290 },
//   { date: "2024-04-06", income: 301, expenses: 340 },
//   { date: "2024-04-07", income: 245, expenses: 180 },
//   { date: "2024-04-08", income: 409, expenses: 320 },
//   { date: "2024-04-09", income: 59, expenses: 110 },
//   { date: "2024-04-10", income: 261, expenses: 190 },
//   { date: "2024-04-11", income: 327, expenses: 350 },
//   { date: "2024-04-12", income: 292, expenses: 210 },
//   { date: "2024-04-13", income: 342, expenses: 380 },
//   { date: "2024-04-14", income: 137, expenses: 220 },
//   { date: "2024-04-15", income: 120, expenses: 170 },
//   { date: "2024-04-16", income: 138, expenses: 190 },
//   { date: "2024-04-17", income: 446, expenses: 360 },
//   { date: "2024-04-18", income: 364, expenses: 410 },
//   { date: "2024-04-19", income: 243, expenses: 180 },
//   { date: "2024-04-20", income: 89, expenses: 150 },
//   { date: "2024-04-21", income: 137, expenses: 200 },
//   { date: "2024-04-22", income: 224, expenses: 170 },
//   { date: "2024-04-23", income: 138, expenses: 230 },
//   { date: "2024-04-24", income: 387, expenses: 290 },
//   { date: "2024-04-25", income: 215, expenses: 250 },
//   { date: "2024-04-26", income: 75, expenses: 130 },
//   { date: "2024-04-27", income: 383, expenses: 420 },
//   { date: "2024-04-28", income: 122, expenses: 180 },
//   { date: "2024-04-29", income: 315, expenses: 240 },
//   { date: "2024-04-30", income: 454, expenses: 380 },
//   { date: "2024-05-01", income: 165, expenses: 220 },
//   { date: "2024-05-02", income: 293, expenses: 310 },
//   { date: "2024-05-03", income: 247, expenses: 190 },
//   { date: "2024-05-04", income: 385, expenses: 420 },
//   { date: "2024-05-05", income: 481, expenses: 390 },
//   { date: "2024-05-06", income: 498, expenses: 520 },
//   { date: "2024-05-07", income: 388, expenses: 300 },
//   { date: "2024-05-08", income: 149, expenses: 210 },
//   { date: "2024-05-09", income: 227, expenses: 180 },
//   { date: "2024-05-10", income: 293, expenses: 330 },
//   { date: "2024-05-11", income: 335, expenses: 270 },
//   { date: "2024-05-12", income: 197, expenses: 240 },
//   { date: "2024-05-13", income: 197, expenses: 160 },
//   { date: "2024-05-14", income: 448, expenses: 490 },
//   { date: "2024-05-15", income: 473, expenses: 380 },
//   { date: "2024-05-16", income: 338, expenses: 400 },
//   { date: "2024-05-17", income: 499, expenses: 420 },
//   { date: "2024-05-18", income: 315, expenses: 350 },
//   { date: "2024-05-19", income: 235, expenses: 180 },
//   { date: "2024-05-20", income: 177, expenses: 230 },
//   { date: "2024-05-21", income: 82, expenses: 140 },
//   { date: "2024-05-22", income: 81, expenses: 120 },
// ]

export const useSpendingData = () =>
  useState([
    {
      id: "1",
      label: "Income",
      category: "misc",
      income: 222,
      expense: 0,
      date: "2025-04-01",
      fill: "hsl(var(--chart-10))",
    },
    {
      id: "2",
      label: "Income",
      category: "misc",
      income: 97,
      expense: 0,
      date: "2024-04-02",
      fill: "hsl(var(--chart-10))",
    },
    {
      id: "3",
      label: "Expense",
      category: "misc",
      income: 167,
      expense: 120,
      date: "2024-04-03",
      fill: "hsl(var(--chart-10))",
    },
    {
      id: "4",
      label: "Expense",
      category: "rent",
      income: 242,
      expense: 260,
      date: "2024-04-04",
      fill: "hsl(var(--chart-1))",
    },
    {
      id: "5",
      label: "Expense",
      category: "groceries",
      income: 373,
      expense: 290,
      date: "2024-04-05",
      fill: "hsl(var(--chart-2))",
    },
    {
      id: "6",
      label: "Expense",
      category: "transportation",
      income: 301,
      expense: 340,
      date: "2024-04-06",
      fill: "hsl(var(--chart-3))",
    },
    {
      id: "7",
      label: "Expense",
      category: "entertainment",
      income: 245,
      expense: 180,
      date: "2024-04-07",
      fill: "hsl(var(--chart-4))",
    },
    {
      id: "8",
      label: "Expense",
      category: "utilities",
      income: 409,
      expense: 320,
      date: "2024-04-08",
      fill: "hsl(var(--chart-5))",
    },
    {
      id: "9",
      label: "Expense",
      category: "subscriptions",
      income: 59,
      expense: 110,
      date: "2024-04-09",
      fill: "hsl(var(--chart-8))",
    },
    {
      id: "10",
      label: "Expense",
      category: "healthcare",
      income: 261,
      expense: 190,
      date: "2024-04-10",
      fill: "hsl(var(--chart-6))",
    },
    {
      id: "11",
      label: "Expense",
      category: "savings",
      income: 327,
      expense: 350,
      date: "2024-04-11",
      fill: "hsl(var(--chart-9))",
    },
    {
      id: "12",
      label: "Expense",
      category: "dining",
      income: 292,
      expense: 210,
      date: "2024-04-12",
      fill: "hsl(var(--chart-7))",
    },
    {
      id: "13",
      label: "Expense",
      category: "entertainment",
      income: 342,
      expense: 380,
      date: "2024-04-13",
      fill: "hsl(var(--chart-4))",
    },
    {
      id: "14",
      label: "Expense",
      category: "groceries",
      income: 137,
      expense: 220,
      date: "2024-04-14",
      fill: "hsl(var(--chart-2))",
    },
    {
      id: "15",
      label: "Expense",
      category: "transportation",
      income: 120,
      expense: 170,
      date: "2024-04-15",
      fill: "hsl(var(--chart-3))",
    },
    {
      id: "16",
      label: "Expense",
      category: "subscriptions",
      income: 138,
      expense: 190,
      date: "2024-04-16",
      fill: "hsl(var(--chart-8))",
    },
    {
      id: "17",
      label: "Expense",
      category: "rent",
      income: 446,
      expense: 360,
      date: "2024-04-17",
      fill: "hsl(var(--chart-1))",
    },
    {
      id: "18",
      label: "Expense",
      category: "utilities",
      income: 364,
      expense: 410,
      date: "2024-04-18",
      fill: "hsl(var(--chart-5))",
    },
    {
      id: "19",
      label: "Expense",
      category: "entertainment",
      income: 243,
      expense: 180,
      date: "2024-04-19",
      fill: "hsl(var(--chart-4))",
    },
    {
      id: "20",
      label: "Expense",
      category: "dining",
      income: 89,
      expense: 150,
      date: "2024-04-20",
      fill: "hsl(var(--chart-7))",
    },
    {
      id: "21",
      label: "Expense",
      category: "misc",
      income: 224,
      expense: 170,
      date: "2024-04-22",
      fill: "hsl(var(--chart-10))",
    },
    {
      id: "22",
      label: "Income",
      category: "groceries",
      income: 387,
      expense: 0,
      date: "2024-04-24",
      fill: "hsl(var(--chart-2))",
    },
    {
      id: "23",
      label: "Expense",
      category: "groceries",
      income: 0,
      expense: 290,
      date: "2024-04-24",
      fill: "hsl(var(--chart-2))",
    },
    // {
    //   id: "24",
    //   label: "Monthly Income",
    //   expense: 5000,
    //   transactionType: "income",
    //   category: "Salary"
    // },
  ]);

export const useAggregatedSpendingData = (spendingData: any[]) =>
  useState(() =>
    spendingData.reduce((acc: any[], record) => {
      const existingCategory = acc.find(
        (item) => item.category === record.category
      );

      if (existingCategory) {
        existingCategory.expense += record.expense;
      } else {
        acc.push({
          category: record.category,
          expense: record.expense,
        });
      }

      return acc;
    }, [])
  );

const page = () => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [dataPayload, setDataPayload] = useState<{
    accounts: IAccount[];
    isOnboardingCompleted: boolean;
  } | null>(null);

  const [selectedAccount, setSelectedAccount] = useState<string>("all-account");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  const [spendingData] = useSpendingData();
  const [aggregatedSpendingData] = useAggregatedSpendingData(spendingData);

  const router = useRouter();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(`/api/accounts/`);
        const data = await response.json();

        if (response.ok) {
          setDataPayload(data);
          // data.accounts.forEach((acc: { accountName: string; accountBudgets: { label: string; amount: number; transactionType: string; category: string }[] }) => {
          //   console.log(`Account: ${acc.accountName}`);
          //   console.log("Budgets:", acc.accountBudgets);
          // });


          if (data.isOnboardingCompleted === false) {
            router.push("/onboarding");
          }
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: data.error,
          });
        }
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
  }, [router]);

  const reportsData = selectedAccount === "all-account"
  ? dataPayload?.accounts.flatMap(acc => acc.accountBudgets) || []
  : dataPayload?.accounts.find(acc => acc.accountName === selectedAccount)?.accountBudgets || [];

  console.log("Selected Reports Data:", reportsData);



  console.log(dataPayload?.accounts);

  return (
    <section className="min-h-screen flex flex-col lg:p-4 md:p-2 space-y-4">

        <section className="w-full rounded-md space-y-4 bg-card p-4 border">

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
              <li>
                <h2 className="font-bold text-lg">{dataPayload?.accounts[0]?.accountName}</h2>
                <p className="text-card-foreground text-sm">
                  {dataPayload?.accounts[0]?.type}
                </p>
              </li>
            </ul>



          </header>

          <section className="grid grid-cols-12 gap-5">
            <div className="col-span-12 lg:col-span-12 lg:row-span-1">
              <AccountOverviewGraph data={spendingData} />
            </div>
          </section>
        </section>

        <section className="grid grid-cols-12 gap-5">

          <div className="col-span-12 lg:col-span-6 lg:row-span-4 md:col-span-6 md:row-span-4">
            <RecordsOverview data={spendingData} />
          </div>

          <div className="col-span-12 lg:col-span-6 lg:row-span-2 md:col-span-6 md:row-span-2">
            <CategoriesGraph data={aggregatedSpendingData} />
          </div>

          <div className="col-span-12 lg:col-span-6 lg:row-span-2 md:col-span-6 md:row-span-2">
            <ReportsGraph reportsData={spendingData} />
          </div>
        </section>

      <pre>{JSON.stringify(dataPayload, null, 2)}</pre>
      <OverviewModal />
    </section>
  );
};

export default page;
