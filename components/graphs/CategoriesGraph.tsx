"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import {
  // ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

// Define types for the chart config
interface ChartConfig {
  [key: string]: {
    label: string
    color?: string
  }
}

interface CategoriesProps {
  data: {
    category: string
    amount: number
    fill: string
  }[]
}

// Chart configuration for categories
const chartConfig = {
  amount: {
    label: "Amount",
  },
  rent: {
    label: "Rent",
    color: "hsl(var(--chart-1))",
  },
  groceries: {
    label: "Groceries",
    color: "hsl(var(--chart-2))",
  },
  transportation: {
    label: "Transportation",
    color: "hsl(var(--chart-3))",
  },
  entertainment: {
    label: "Entertainment",
    color: "hsl(var(--chart-4))",
  },
  utilities: {
    label: "Utilities",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

const CategoriesGraph: React.FC<CategoriesProps> = ({ data }) => {
  // State to track the active category
  const [activeCategory, setActiveCategory] = React.useState(data[0].category)

  // Find the active category's index
  const activeIndex = React.useMemo(
    () => data.findIndex((item) => item.category === activeCategory),
    [activeCategory, data]
  )

  // Calculate the total for the selected category
  const categoryTotal = React.useMemo(() => {
    const categoryData = data.filter((item) => item.category === activeCategory);
    return categoryData.reduce((acc, curr) => acc + curr.amount, 0);
  }, [activeCategory, data])

  // Get the unique list of categories
  const categories = React.useMemo(() => data.map((item) => item.category), [data])

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Spending Categories</CardTitle>
          <CardDescription>Visualizing spending by categories</CardDescription>
        </div>
         {/* Category Select Dropdown */}
        <Select value={activeCategory} onValueChange={setActiveCategory}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a category"
          >
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {categories.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig]

              if (!config) {
                return null
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--fill-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-1 pb-0">

        {/* Chart Display */}
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[235px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              {/* Label showing total for the active category */}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          ${categoryTotal.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total in {activeCategory}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default CategoriesGraph
