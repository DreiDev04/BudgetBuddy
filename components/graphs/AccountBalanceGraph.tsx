"use client";
import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Updated data to reflect income and expenses
const chartData = [
  { date: "2024-04-01", income: 10000, expenses: 5000 },
  { date: "2024-04-02", income: 8000, expenses: 4500 },
  { date: "2024-04-03", income: 12000, expenses: 6000 },
  { date: "2024-04-04", income: 15000, expenses: 7000 },
  { date: "2024-04-05", income: 14000, expenses: 8000 },
  { date: "2024-04-06", income: 16000, expenses: 9000 },
  { date: "2024-04-07", income: 13000, expenses: 6500 },
  { date: "2024-04-08", income: 17000, expenses: 8500 },
  { date: "2024-04-09", income: 12500, expenses: 5500 },
  { date: "2024-04-10", income: 14000, expenses: 7000 },
  { date: "2024-04-11", income: 14500, expenses: 7200 },
  { date: "2024-04-12", income: 15500, expenses: 7800 },
  { date: "2024-04-13", income: 16500, expenses: 8200 },
  { date: "2024-04-14", income: 12500, expenses: 6200 },
  { date: "2024-04-15", income: 13500, expenses: 6400 },
  { date: "2024-04-16", income: 14500, expenses: 7100 },
  { date: "2024-04-17", income: 17500, expenses: 8800 },
  { date: "2024-04-18", income: 16000, expenses: 8200 },
  { date: "2024-04-19", income: 15500, expenses: 7500 },
  { date: "2024-04-20", income: 14000, expenses: 7000 },
  { date: "2024-04-21", income: 15000, expenses: 7700 },
  { date: "2024-04-22", income: 16000, expenses: 8000 },
  { date: "2024-04-23", income: 14500, expenses: 7200 },
  { date: "2024-04-24", income: 17000, expenses: 9000 },
  { date: "2024-04-25", income: 18000, expenses: 9500 },
  { date: "2024-04-26", income: 16500, expenses: 8800 },
  { date: "2024-04-27", income: 15500, expenses: 8500 },
  { date: "2024-04-28", income: 14000, expenses: 7600 },
  { date: "2024-04-29", income: 17500, expenses: 9200 },
  { date: "2024-04-30", income: 18500, expenses: 9800 },
  { date: "2024-05-01", income: 16000, expenses: 8200 },
  { date: "2024-05-02", income: 17000, expenses: 8600 },
  { date: "2024-05-03", income: 15500, expenses: 8000 },
  { date: "2024-05-04", income: 19000, expenses: 10500 },
  { date: "2024-05-05", income: 20000, expenses: 11000 },
  { date: "2024-05-06", income: 21000, expenses: 11500 },
  { date: "2024-05-07", income: 18000, expenses: 9500 },
  { date: "2024-05-08", income: 16500, expenses: 8700 },
  { date: "2024-05-09", income: 17000, expenses: 8900 },
  { date: "2024-05-10", income: 18000, expenses: 10000 },
  { date: "2024-05-11", income: 18500, expenses: 10400 },
  { date: "2024-05-12", income: 19000, expenses: 10800 },
  { date: "2024-05-13", income: 16000, expenses: 8500 },
  { date: "2024-05-14", income: 20000, expenses: 11000 },
  { date: "2024-05-15", income: 21000, expenses: 11500 },
  { date: "2024-05-16", income: 22000, expenses: 12000 },
  { date: "2024-05-17", income: 23000, expenses: 12500 },
  { date: "2024-05-18", income: 24000, expenses: 13000 },
  { date: "2024-05-19", income: 25000, expenses: 13500 },
  { date: "2024-05-20", income: 26000, expenses: 14000 },
  { date: "2024-05-21", income: 27000, expenses: 14500 },
  { date: "2024-05-22", income: 28000, expenses: 15000 },
  { date: "2024-05-23", income: 29000, expenses: 15500 },
  { date: "2024-05-24", income: 30000, expenses: 16000 },
  { date: "2024-05-25", income: 31000, expenses: 16500 },
  { date: "2024-05-26", income: 32000, expenses: 17000 },
  { date: "2024-05-27", income: 33000, expenses: 17500 },
  { date: "2024-05-28", income: 34000, expenses: 18000 },
  { date: "2024-05-29", income: 35000, expenses: 18500 },
  { date: "2024-05-30", income: 36000, expenses: 19000 },
  { date: "2024-05-31", income: 37000, expenses: 19500 },
  { date: "2024-06-01", income: 38000, expenses: 20000 },
  { date: "2024-06-02", income: 39000, expenses: 21000 },
  { date: "2024-06-03", income: 40000, expenses: 22000 },
  { date: "2024-06-04", income: 41000, expenses: 23000 },
  { date: "2024-06-05", income: 42000, expenses: 24000 },
  { date: "2024-06-06", income: 43000, expenses: 25000 },
  { date: "2024-06-07", income: 44000, expenses: 26000 },
  { date: "2024-06-08", income: 45000, expenses: 27000 },
  { date: "2024-06-09", income: 46000, expenses: 28000 },
  { date: "2024-06-10", income: 47000, expenses: 29000 },
  { date: "2024-06-11", income: 48000, expenses: 30000 },
  { date: "2024-06-12", income: 49000, expenses: 31000 },
  { date: "2024-06-13", income: 50000, expenses: 32000 },
  { date: "2024-06-14", income: 51000, expenses: 33000 },
  { date: "2024-06-15", income: 52000, expenses: 34000 },
  { date: "2024-06-16", income: 53000, expenses: 35000 },
  { date: "2024-06-17", income: 54000, expenses: 36000 },
  { date: "2024-06-18", income: 55000, expenses: 37000 },
  { date: "2024-06-19", income: 56000, expenses: 38000 },
  { date: "2024-06-20", income: 57000, expenses: 39000 },
  { date: "2024-06-21", income: 58000, expenses: 40000 },
  { date: "2024-06-22", income: 59000, expenses: 41000 },
  { date: "2024-06-23", income: 60000, expenses: 42000 },
  { date: "2024-06-24", income: 61000, expenses: 43000 },
  { date: "2024-06-25", income: 62000, expenses: 44000 },
  { date: "2024-06-26", income: 63000, expenses: 45000 },
  { date: "2024-06-27", income: 64000, expenses: 46000 },
  { date: "2024-06-28", income: 65000, expenses: 47000 },
  { date: "2024-06-29", income: 66000, expenses: 48000 },
  { date: "2024-06-30", income: 67000, expenses: 49000 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  income: {
    label: "Income",
    color: "hsl(var(--chart-2))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function AccountBalanceCard() {
  const totalIncome = chartData.reduce((acc, data) => acc + data.income, 0)
  const totalExpenses = chartData.reduce((acc, data) => acc + data.expenses, 0)

  const totalBalance = totalIncome - totalExpenses;

  return (
    <Card>
      <CardContent className="grid grid-rows-2 p-4 text-end">
        {/* Account Balance */}
        <div className="row-span-1">
          <div className="text-xl font-bold text-green-600">${totalBalance}</div>
          <div className="text-sm">Account Balance</div>
        </div>

        {/* Income and Expenses */}
        <div className="grid grid-cols-2 gap-6">
          {/* Income */}
          <div>
            <div className="text-lg font-bold text-blue-500">${totalIncome}</div>
            <div className="text-sm">Income</div>
          </div>
          {/* Expenses */}
          <div>
            <div className="text-lg font-bold text-red-500">${totalExpenses}</div>
            <div className="text-sm">Expenses</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AccountBalanceGraph() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Account Balance - Overview </CardTitle>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-income)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-income)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-expenses)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-expenses)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="expenses"
              type="natural"
              fill="url(#fillExpenses)"
              stroke="var(--color-expenses)"
              stackId="a"
            />
            <Area
              dataKey="income"
              type="natural"
              fill="url(#fillIncome)"
              stroke="var(--color-income)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
