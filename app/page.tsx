import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to BudgetBuddy</h1>
        <p className="text-lg text-gray-600 mt-2">A tool to track expenses, set budgets, and analyze financial trends.</p>
      </header>
      <main className="flex flex-col items-center space-y-6">
        <section className="bg-white p-6 rounded-lg shadow-md w-80">
          <h2 className="text-2xl font-semibold text-gray-700">Track Expenses</h2>
          <p className="text-gray-600 mt-2">Keep a detailed record of your daily expenses.</p>
        </section>
        <section className="bg-white p-6 rounded-lg shadow-md w-80">
          <h2 className="text-2xl font-semibold text-gray-700">Set Budgets</h2>
          <p className="text-gray-600 mt-2">Define your budget limits and stick to them.</p>
        </section>
        <section className="bg-white p-6 rounded-lg shadow-md w-80">
          <h2 className="text-2xl font-semibold text-gray-700">Analyze Trends</h2>
          <p className="text-gray-600 mt-2">Get insights into your spending habits and financial trends.</p>
        </section>
      </main>
      <footer className="mt-8">
        <Button asChild>
          <Link href="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">
            Go to Dashboard
          </Link>
        </Button>
      </footer>
    </div>
  );
};

export default page;
