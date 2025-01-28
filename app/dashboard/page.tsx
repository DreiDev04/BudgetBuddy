"use client";
import GoalsGraph from "../../components/graphs/GoalsGraph";
import Categories from "../../components/graphs/Categories";
import AccountBalanceGraph from "../../components/graphs/AccountBalanceGraph";
import AccountBalanceCard from "../../components/graphs/AccountBalanceCard";
import LastRecords from "../../components/graphs/LastRecords";
import { useState } from "react";

// Account data (stateful)
export const useAccountData = () =>
  useState([
    { date: "2024-04-01", income: 10000, expenses: 5000 },
    { date: "2024-04-02", income: 8000, expenses: 4500 },
    { date: "2024-04-03", income: 12000, expenses: 6000 },
    { date: "2024-04-04", income: 15000, expenses: 7000 },
    { date: "2024-04-05", income: 11000, expenses: 5500 },
    { date: "2024-04-06", income: 9000, expenses: 5000 },
    { date: "2024-04-07", income: 13000, expenses: 6500 },
    { date: "2024-04-08", income: 14000, expenses: 7500 },
    { date: "2024-04-09", income: 12500, expenses: 6000 },
    { date: "2024-04-10", income: 11500, expenses: 5800 },
    { date: "2024-04-11", income: 10500, expenses: 5400 },
    { date: "2024-04-12", income: 9500, expenses: 5200 },
    { date: "2024-04-13", income: 14500, expenses: 8000 },
    { date: "2024-04-14", income: 13500, expenses: 7000 },
    { date: "2024-04-15", income: 12500, expenses: 6800 },
    { date: "2024-04-16", income: 15000, expenses: 7500 },
    { date: "2024-04-17", income: 14000, expenses: 7200 },
    { date: "2024-04-18", income: 12000, expenses: 6500 },
    { date: "2024-04-19", income: 11000, expenses: 6000 },
    { date: "2024-04-20", income: 10000, expenses: 5500 },
  ]);

// Spending data (stateful)
export const useSpendingData = () =>
  useState([
    { id: 1, label: "Record 1", category: "foods", amount: 10, date: new Date("2025-01-12").getTime(), fill: "var(--color-rent)" },
    { id: 2, label: "Record 2", category: "transport", amount: 15, date: new Date("2025-01-14").getTime(), fill: "var(--color-transportation)" },
    { id: 3, label: "Record 3", category: "entertainment", amount: 20, date: new Date("2025-01-16").getTime(), fill: "var(--color-entertainment)" },
    { id: 4, label: "Record 4", category: "utilities", amount: 25, date: new Date("2025-01-17").getTime(), fill: "var(--color-utilities)" },
    { id: 5, label: "Record 5", category: "utilities", amount: 50, date: new Date("2024-12-15").getTime(), fill: "var(--color-utilities)" },
    { id: 6, label: "Record 6", category: "groceries", amount: 35, date: new Date("2024-12-01").getTime(), fill: "var(--color-groceries)" },
    { id: 7, label: "Record 7", category: "foods", amount: 40, date: new Date("2024-11-20").getTime(), fill: "var(--color-rent)" },
    { id: 8, label: "Record 8", category: "utilities", amount: 60, date: new Date("2024-11-05").getTime(), fill: "var(--color-utilities)" },
    { id: 9, label: "Record 9", category: "entertainment", amount: 75, date: new Date("2024-10-25").getTime(), fill: "var(--color-entertainment)" },
    { id: 10, label: "Record 10", category: "foods", amount: 90, date: new Date("2024-10-15").getTime(), fill: "var(--color-rent)" },
    { id: 11, label: "Record 11", category: "transport", amount: 20, date: new Date("2024-09-01").getTime(), fill: "var(--color-transportation)" },
    { id: 12, label: "Record 12", category: "utilities", amount: 80, date: new Date("2024-08-15").getTime(), fill: "var(--color-utilities)" },
    { id: 13, label: "Record 13", category: "groceries", amount: 100, date: new Date("2024-08-01").getTime(), fill: "var(--color-groceries)" },
  ]);

// Goals data (stateful)
export const useGoalsData = () =>
  useState([
    { id: 1, title: "Car", progress: 50, category: "Savings", target: 10000, note: "short note", color: "bg-blue-600", fill: "var(--color-savings)", date: "2025-12-31" },
    { id: 2, title: "Vacation", progress: 20, category: "Travel", target: 5000, note: "short note", color: "bg-emerald-500", fill: "var(--color-investments)", date: "2025-06-15" },
    { id: 3, title: "Emergency Fund", progress: 70, category: "Emergency", target: 20000, note: "short note", color: "bg-purple-600", fill: "var(--color-emergency)", date: "2025-10-01" },
    { id: 4, title: "Home Renovation", progress: 40, category: "Investments", target: 50000, note: "short note", color: "bg-emerald-500",fill: "var(--color-investments)", date: "2026-01-01" },
    { id: 5, title: "Backyard Renovation", progress: 40, category: "Investments", target: 50000, note: "short note", color: "bg-emerald-500",fill: "var(--color-investments)", date: "2026-01-01" },
    { id: 6, title: "Debt Repayment", progress: 40, category: "Debt", target: 50000, note: "short note", color: "bg-yellow-600",fill: "var(--color-debt)", date: "2026-01-01" },
  ]);

// Shopping List data (stateful)
export const useShoppingListData = () =>
  useState([
    { id: "1", title: "Item 1", link: "https://example.com/item1", price: 50 },
    { id: "2", title: "Item 2", link: "https://example.com/item2", price: 75 },
    { id: "3", title: "Item 3", link: "https://example.com/item3", price: 100 },
    { id: "4", title: "Item 4", link: "https://example.com/item4", price: 150 },
    { id: "5", title: "Item 5", link: "https://example.com/item5", price: 200 },
    { id: "6", title: "Item 6", link: "https://example.com/item6", price: 20 },
    { id: "7", title: "Item 7", link: "https://example.com/item7", price: 30 },
    { id: "8", title: "Item 8", link: "https://example.com/item8", price: 80 },
    { id: "9", title: "Item 9", link: "https://example.com/item9", price: 90 },
    { id: "10", title: "Item 10", link: "https://example.com/item10", price: 820 },
  ]);

// Aggregated data for spending categories (stateful)
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

// Component
export default function Home() {
  const [accountData] = useAccountData();
  const [spendingData] = useSpendingData();
  const [goalsData] = useGoalsData();
  const [aggregatedSpendingData] = useAggregatedSpendingData(spendingData);

  return (
    <section className="grid grid-cols-12 gap-5">
      {/* Area Chart */}
      <div className="col-span-12 lg:col-span-8 lg:row-span-2">
        <AccountBalanceGraph data={accountData} />
      </div>

      {/* Account Balance */}
      <div className="col-span-12 lg:col-span-4">
        <AccountBalanceCard data={accountData} />
      </div>

      {/* Transactions */}
      <div className="col-span-12 lg:col-span-4 lg:row-span-2 md:col-span-6 md:row-span-2">
        <LastRecords data={spendingData} />
      </div>

      {/* Bar Chart */}
      <div className="col-span-12 md:col-span-6 lg:col-span-4">
        <GoalsGraph data={goalsData} />
      </div>

      {/* Pie Chart */}
      <div className="col-span-12 md:col-span-6 lg:col-span-4">
        <Categories data={aggregatedSpendingData} />
      </div>
    </section>
  );
}
