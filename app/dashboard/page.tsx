import GoalsGraph from "../../components/graphs/GoalsGraph";
import Categories from "../../components/graphs/Categories";
import AccountBalanceGraph from "../../components/graphs/AccountBalanceGraph";
import AccountBalanceCard from "../../components/graphs/AccountBalanceCard";
import LastRecords from "../../components/graphs/LastRecords";

export default function Home() {

  const AccountData = [
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
];

const SpendingData = [
  { category: "Rent", amount: 1200, fill: "var(--color-rent)" },
  { category: "Groceries", amount: 800, fill: "var(--color-groceries)" },
  { category: "Transportation", amount: 300, fill: "var(--color-transportation)" },
  { category: "Entertainment", amount: 200, fill: "var(--color-entertainment)" },
  { category: "Utilities", amount: 150, fill: "var(--color-utilities)" },
]

const SpendingRecords = [
  // Last 7 days
  { id: 1, label: "Record 1", category: "foods", value: 10, date: new Date("2025-01-12").getTime() },
  { id: 2, label: "Record 2", category: "transport", value: 15, date: new Date("2025-01-14").getTime() },
  { id: 3, label: "Record 3", category: "entertainment", value: 20, date: new Date("2025-01-16").getTime() },
  { id: 4, label: "Record 4", category: "groceries", value: 25, date: new Date("2025-01-17").getTime() },

  // Last 3 months (excluding last 7 days)
  { id: 5, label: "Record 5", category: "clothing", value: 50, date: new Date("2024-12-15").getTime() },
  { id: 6, label: "Record 6", category: "groceries", value: 35, date: new Date("2024-12-01").getTime() },
  { id: 7, label: "Record 7", category: "foods", value: 40, date: new Date("2024-11-20").getTime() },
  { id: 8, label: "Record 8", category: "utilities", value: 60, date: new Date("2024-11-05").getTime() },
  { id: 9, label: "Record 9", category: "entertainment", value: 75, date: new Date("2024-10-25").getTime() },
  { id: 10, label: "Record 10", category: "foods", value: 90, date: new Date("2024-10-15").getTime() },

  // Older than 3 months
  { id: 11, label: "Record 11", category: "transport", value: 20, date: new Date("2024-09-01").getTime() },
  { id: 12, label: "Record 12", category: "clothing", value: 80, date: new Date("2024-08-15").getTime() },
  { id: 13, label: "Record 13", category: "groceries", value: 100, date: new Date("2024-08-01").getTime() },
];

const GoalsRecords =[
  { goal: "Savings", progress: 80, fill: "var(--color-savings)" },
  { goal: "Investments", progress: 60, fill: "var(--color-investments)" },
  { goal: "Debt Repayment", progress: 50, fill: "var(--color-debt)" },
  { goal: "Emergency", progress: 30, fill: "var(--color-emergency)" },
  { goal: "Travel", progress: 20, fill: "var(--color-travel)" },
]


  return (
    <section className="grid grid-cols-12 gap-5">
      {/* Area Chart */}
      <div className="col-span-12 lg:col-span-8 lg:row-span-2">
        <AccountBalanceGraph data={AccountData}/>
      </div>

      {/* Account Balance */}
      <div className="col-span-12 lg:col-span-4">
        <AccountBalanceCard data={AccountData}/>
      </div>

      {/* Transactions */}
      <div className="col-span-12 lg:col-span-4 lg:row-span-2 md:col-span-6 md:row-span-2">
        <LastRecords data={SpendingRecords} />
      </div>

      {/* Bar Chart */}
      <div className="col-span-12 md:col-span-6 lg:col-span-4">
        <GoalsGraph data={GoalsRecords} />
      </div>

      {/* Pie Chart */}
      <div className="col-span-12 md:col-span-6 lg:col-span-4">
        <Categories data={SpendingData}/>
      </div>
    </section>
  );
}
