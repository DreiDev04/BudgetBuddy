import GoalsGraph from "../../components/graphs/GoalsGraph";
import Categories from "../../components/graphs/Categories";
import AccountBalanceGraph from "../../components/graphs/AccountBalanceGraph";
import { AccountBalanceCard } from "../../components/graphs/AccountBalanceGraph";
import LastRecords from "../../components/graphs/LastRecords";

export default function Home() {
  return (
    <section className="grid grid-cols-12 gap-5">
      {/* Area Chart */}
      <div className="bg-card rounded-md col-span-12 lg:col-span-8 lg:row-span-2">
        <AccountBalanceGraph />
      </div>

      {/* Account Balance */}
      <div className="bg-card rounded-md col-span-12 lg:col-span-4">
        <AccountBalanceCard />
      </div>

      {/* Transactions */}
      <div className="bg-card rounded-md col-span-12 lg:col-span-4 lg:row-span-2 md:col-span-6 md:row-span-2">
        <LastRecords />
      </div>

      {/* Bar Chart */}
      <div className="bg-card rounded-md col-span-12 md:col-span-6 lg:col-span-4">
        <GoalsGraph />
      </div>

      {/* Pie Chart */}
      <div className="bg-card rounded-md col-span-12 md:col-span-6 lg:col-span-4">
        <Categories />
      </div>
    </section>
  );
}
