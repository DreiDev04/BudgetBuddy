'use client'

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";


interface ReportsGraphProps {
    reportsData: {
        date: string;
        income: number;
        expenses: number;
    }[];
}

const ReportsGraph: React.FC<ReportsGraphProps> = ({ reportsData }) => {
  // Split income and expense records
  const incomeRecords = reportsData.map((data) => ({ amount: data.income }));
  const expenseRecords = reportsData.map((data) => ({ amount: data.expenses }));

  // Calculate totals
  const totalIncome = incomeRecords.reduce((sum, record) => sum + record.amount, 0);
  const totalExpenses = expenseRecords.reduce((sum, record) => sum + record.amount, 0);

  // Calculate counts
  const incomeCount = incomeRecords.filter((record) => record.amount > 0).length;
  const expenseCount = expenseRecords.filter((record) => record.amount > 0).length;

  // Calculate date range
  const daysCount = reportsData.length;

  // Calculate averages
  const averageIncomePerDay = (totalIncome / daysCount).toFixed(2);
  const averageExpensePerDay = (totalExpenses / daysCount).toFixed(2);
  const averageIncomePerRecord = (incomeCount ? totalIncome / incomeCount : 0).toFixed(2);
  const averageExpensePerRecord = (expenseCount ? totalExpenses / expenseCount : 0).toFixed(2);

  // Calculate cash flow
  const cashFlow = totalIncome - totalExpenses;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cash Reports</CardTitle>
        <CardDescription>Am I spending too much?</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">LAST {daysCount} DAYS</div>
        <div className="mt-4">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="font-bold">Quick overview</th>
                <th>Income</th>
                <th className="text-red-500">Expenses</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Count</td>
                <td>{incomeCount}</td>
                <td className="text-red-500">{expenseCount}</td>
              </tr>
              <tr>
                <td>Average (Day)</td>
                <td>₱{averageIncomePerDay}</td>
                <td className="text-red-500">-₱{averageExpensePerDay}</td>
              </tr>
              <tr>
                <td>Average (Record)</td>
                <td>₱{averageIncomePerRecord}</td>
                <td className="text-red-500">-₱{averageExpensePerRecord}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>₱{totalIncome.toFixed(2)}</td>
                <td className="text-red-500">-₱{totalExpenses.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Label className="text-lg font-bold">Cash flow: ₱{cashFlow.toFixed(2)}</Label>
      </CardFooter>
    </Card>
  );
};

export default ReportsGraph;
