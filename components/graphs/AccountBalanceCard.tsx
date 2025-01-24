"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AccountBalanceCardProps {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
}

export default function AccountBalanceCard({ data }: AccountBalanceCardProps) {
  // Calculate totals using reduce with explicit types
  const totalIncome = data.reduce((acc: number, item) => acc + item.income, 0);
  const totalExpenses = data.reduce((acc: number, item) => acc + item.expenses, 0);
  const totalBalance = totalIncome - totalExpenses;

  return (
    <Card>
      <CardContent className="grid grid-rows-2 p-4 text-end">
        {/* Account Balance */}
        <div className="row-span-1">
          <div className="text-xl font-bold text-green-600">${totalBalance.toFixed(2)}</div>
          <div className="text-sm">Account Balance</div>
        </div>

        {/* Income and Expenses */}
        <div className="grid grid-cols-2 gap-6">
          {/* Income */}
          <div>
            <div className="text-lg font-bold text-blue-500">${totalIncome.toFixed(2)}</div>
            <div className="text-sm">Income</div>
          </div>
          {/* Expenses */}
          <div>
            <div className="text-lg font-bold text-red-500">${totalExpenses.toFixed(2)}</div>
            <div className="text-sm">Expenses</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
