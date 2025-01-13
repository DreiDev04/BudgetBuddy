"use client"
import * as React from "react"
import { Pencil } from "lucide-react";
import { Card} from "@/components/ui/card"
import AccountBalanceGraph from "../graphs/AccountBalanceGraph";
import LastRecords from "../graphs/LastRecords";

const page = () => {


  return (
    <section className="flex flex-col gap-4">
      {/* Budget Overview Chart */}
      <Card className="flex items-center gap-4 border-b p-5 justify-center lg:justify-end sm:flex-row">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Balance Today:</h2>
          <p className="text-xl font-medium">$50,000</p>
          <Pencil className="w-5 h-5" aria-hidden="true" />
        </div>
      </Card>

      <AccountBalanceGraph />

      {/* Last Records Overview */}

      <LastRecords />

      {/* <Card className='h-96 w-full flex flex-col p-4'>
        <CardHeader>
          <CardTitle>Last Records Overview</CardTitle>
          <CardDescription>What was the last transactions I made?</CardDescription>
        </CardHeader>

        <CardContent>

        </CardContent>
      </Card> */}
    </section>
  )
}

export default page