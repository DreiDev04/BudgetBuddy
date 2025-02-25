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
import { Colors } from "@/helper/categoriesColor"

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

// Build chart configuration dynamically from Colors array
const chartConfig = Colors.reduce((acc, item) => {
  acc[item.value] = {
    label: item.name,
    color: item.color,
  }
  return acc
}, {} as ChartConfig)

const CategoriesGraph: React.FC<CategoriesProps> = ({ data }) => {
  const [activeCategory, setActiveCategory] = React.useState(data[0]?.category || "")

  const activeIndex = React.useMemo(
    () => data.findIndex((item) => item.category === activeCategory),
    [activeCategory, data]
  )

  const categoryTotal = React.useMemo(() => {
    const categoryData = data.filter((item) => item.category === activeCategory)
    return categoryData.reduce((acc, curr) => acc + curr.amount, 0)
  }, [activeCategory, data])

  const categories = React.useMemo(() => data.map((item) => item.category), [data])

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Spending Categories</CardTitle>
          <CardDescription>Visualizing spending by categories</CardDescription>
        </div>
        <Select value={activeCategory} onValueChange={setActiveCategory}>
          <SelectTrigger className="ml-auto h-7 w-auto rounded-lg pl-2.5" aria-label="Select a category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {categories.map((key) => {
              const config = chartConfig[key]
              const colorItem = Colors.find((c) => c.value === key)

              if (!config || !colorItem) return null

              return (
                <SelectItem key={key} value={key} className="rounded-lg [&_span]:flex">
                  <div className="flex items-center gap-2 text-xs">
                    {/* {colorItem.icon} */}
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{ backgroundColor: colorItem.color }}
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
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[235px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data.map((item) => ({
                ...item,
                fill: Colors.find((c) => c.value === item.category)?.color || "#ccc",
              }))}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector {...props} outerRadius={outerRadius + 25} innerRadius={outerRadius + 12} />
                </g>
              )}
            >
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
