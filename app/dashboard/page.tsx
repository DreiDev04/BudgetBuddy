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
        <LastRecords />
      </div>

      {/* Bar Chart */}
      <div className="col-span-12 md:col-span-6 lg:col-span-4">
        <GoalsGraph />
      </div>

      {/* Pie Chart */}
      <div className="col-span-12 md:col-span-6 lg:col-span-4">
        <Categories />
      </div>
    </section>
  );
}
