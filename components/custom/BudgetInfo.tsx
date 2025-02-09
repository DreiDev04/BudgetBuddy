import React from "react";
import { PhilippinePeso } from "lucide-react";
import Image from "next/image";

type BudgetInfoProps = {
  income: number;
  expenses: number;
  balance: number;
};

const BudgetInfo: React.FC<BudgetInfoProps> = ({ income, expenses, balance }) => {
  const budgetData = [
    { label: "Income", value: income, icon: "https://cdn-icons-png.flaticon.com/128/10893/10893970.png" },
    { label: "Expenses", value: expenses, icon: "https://cdn-icons-png.flaticon.com/128/10893/10893978.png" },
    { label: "Balance", value: balance, icon: "https://cdn-icons-png.flaticon.com/128/11396/11396390.png" },
  ];

  return (
    <section className="grid md:grid-cols-3 grid-cols-1 gap-6 mt-6">
      {budgetData.map((item, index) => (
        <div key={index} className="bg-card shadow-md rounded-lg flex items-center p-6">
          <Image src={item.icon} width={50} height={50} alt={`${item.label} image`} className="mr-4" />
          <div>
            <h1 className="text-xl font-semibold text-gray-500">{item.label}</h1>
            <p className="text-xl font-bold">
              <PhilippinePeso className="inline-block mr-2" />
              {item.value.toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default BudgetInfo;
