import GoalsGraph from "../../components/graphs/GoalsGraph";
import Categories from "../../components/graphs/Categories";
import AccountBalanceGraph from "../../components/graphs/AccountBalanceGraph";
import AccountBalanceCard from "../../components/graphs/AccountBalanceCard";
import LastRecords from "../../components/graphs/LastRecords";
import {AccountData, SpendingData, GoalsRecords, aggregatedSpendingData} from '../../components/data/data';

export default function Home() {

  return (
    <section className="grid grid-cols-12 gap-5">
      {/* Area Chart */}
      <div className="col-span-12 lg:col-span-8 lg:row-span-2">
        <AccountBalanceGraph data={AccountData} />
      </div>

      {/* Account Balance */}
      <div className="col-span-12 lg:col-span-4">
        <AccountBalanceCard data={AccountData} />
      </div>

      {/* Transactions */}
      <div className="col-span-12 lg:col-span-4 lg:row-span-2 md:col-span-6 md:row-span-2">
        <LastRecords data={SpendingData} />
      </div>

      {/* Bar Chart */}
      <div className="col-span-12 md:col-span-6 lg:col-span-4">
        <GoalsGraph data={GoalsRecords} />
      </div>

      {/* Pie Chart */}
      <div className="col-span-12 md:col-span-6 lg:col-span-4">
        <Categories data={aggregatedSpendingData} />
      </div>
    </section>
  );
}
