import React from 'react';
import { PhilippinePeso } from "lucide-react";
import Image from "next/image";

type BudgetInfoProps = {
  income: number;
  expenses: number;
  balance: number;
};

const BudgetInfo: React.FC<BudgetInfoProps> = ({ income, expenses, balance }) => {
  return (
    <section className="grid md:grid-cols-3 grid-cols-1 gap-6 mt-6">
      <div className="bg-card shadow-md rounded-lg flex items-center p-6">
        <Image
          src="https://cdn-icons-png.flaticon.com/128/10893/10893970.png"
          width={50}
          height={50}
          alt="income image"
          className="mr-4"
        />
        <div>
          <h1 className="text-xl font-semibold text-gray-500">Income</h1>
          <p className="text-xl font-bold">
            <PhilippinePeso className="inline-block mr-2" />
            {income.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="bg-card shadow-md rounded-lg flex items-center p-6">
        <Image
          src="https://cdn-icons-png.flaticon.com/128/10893/10893978.png"
          width={50}
          height={50}
          alt="expenses image"
          className="mr-4"
        />
        <div>
          <h1 className="text-xl font-semibold text-gray-500">Expenses</h1>
          <p className="text-xl font-bold">
            <PhilippinePeso className="inline-block mr-2" />
            {expenses.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="bg-card shadow-md rounded-lg flex items-center p-6">
        <Image
          src="https://cdn-icons-png.flaticon.com/128/11396/11396390.png"
          width={50}
          height={50}
          alt="balance image"
          className="mr-4"
        />
        <div>
          <h1 className="text-xl font-semibold text-gray-500">Balance</h1>
          <p className="text-xl font-bold">
            <PhilippinePeso className="inline-block mr-2" />
            {balance.toFixed(2)}
          </p>
        </div>
      </div>
    </section>
  );
};



export default BudgetInfo;
