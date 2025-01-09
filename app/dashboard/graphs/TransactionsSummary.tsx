"use client"
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

const TransactionsSummary = () => {
  return (
    <Card>
        <CardContent className='p-4'>
            <div className="text-lg font-semibold">Transactions</div>
            <p className="text-sm text-muted">History of past transactions</p>
        </CardContent>
    </Card>
  )
}

export default TransactionsSummary