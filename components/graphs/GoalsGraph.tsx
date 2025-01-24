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

interface GoalsProps {
  data: {
    goal: string,
    progress: number,
    fill: string
  }[]
}

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

const GoalsGraph:React.FC<GoalsProps> = ({data}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Goals Progress</CardTitle>
        <CardDescription>Visualizing progress towards financial goals</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} >
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            height={500}
            margin={{ right: 16 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="goal"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
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
    </Card>
  )
}


export default GoalsGraph
