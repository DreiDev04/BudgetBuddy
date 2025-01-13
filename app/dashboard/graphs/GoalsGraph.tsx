"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Updated data for goals
const chartData = [
  { goal: "Savings", progress: 80, fill: "var(--color-savings)" },
  { goal: "Investments", progress: 60, fill: "var(--color-investments)" },
  { goal: "Debt Repayment", progress: 50, fill: "var(--color-debt)" },
  { goal: "Emergency", progress: 30, fill: "var(--color-emergency)" },
  { goal: "Travel", progress: 20, fill: "var(--color-travel)" },
]

// Updated chart config with old color palette
const chartConfig = {
  progress: {
    label: "Progress (%)",
  },
  savings: {
    label: "Savings",
    color: "hsl(var(--chart-1))", // Old Savings Color
  },
  investments: {
    label: "Investments",
    color: "hsl(var(--chart-2))", // Old Investments Color
  },
  debt: {
    label: "Debt",
    color: "hsl(var(--chart-3))", // Old Debt Color
  },
  emergency: {
    label: "Emergency",
    color: "hsl(var(--chart-4))", // Old Emergency Color
  },
  travel: {
    label: "Travel",
    color: "hsl(var(--chart-5))", // Old Travel Fund Color
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig

export function GoalsGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Goals Progress</CardTitle>
        <CardDescription>Visualizing progress towards financial goals</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="goal"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value} // Displays full goal name
              hide
            />
            <XAxis dataKey="progress" type="number" domain={[0, 100]} hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="progress"
              layout="vertical"
              radius={4}
            //   fill={(entry) => entry.fill} // Using custom colors from `chartData`
            >
              <LabelList
                dataKey="goal"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="progress"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 10% this quarter <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Tracking progress for your top 5 financial goals
        </div>
      </CardFooter> */}
    </Card>
  )
}

export default GoalsGraph
