import * as React from "react"
import GoalsGraph from "../graphs/GoalsGraph";
import GoalsModal from "@/components/custom/BudgetModal";


const page = () => {
  return (
    <section className='h-96 grid grid-cols-3 grid-rows-2 gap-4'>
      <div className='lg:col-span-1 md:col-span-2'>
        <GoalsGraph />
      </div>
      <div className='lg:col-span-2 md:col-span-1 bg-card'>

      </div>

      {/* Modal */}
      <GoalsModal />

    </section>
  )
}

export default page