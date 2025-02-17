"use client";
import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface CategoriesProps {
  data: {
    category: string,
    amount: number,
    fill: string
  }[];
}

// Updated config for spending categories
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

const Categories: React.FC<CategoriesProps> = ({ data }) => {
  const totalAmount = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.amount, 0);
  }, [data]);

  return (
    <Card className="flex flex-col"> {/* Match height with GoalsGraph */}
      <CardHeader className="items-center pb-0">
        <CardTitle>Spending Categories</CardTitle>
        <CardDescription>Visualizing spending by categories</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
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
                          ${totalAmount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Categories