"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getCurrencySymbol } from "@/helper/helper";

const chartConfig = {
  views: {
    label: "Financial Overview",
  },
  income: {
    label: "Income",
    color: "hsl(var(--chart-2))",
  },
  expense: {
    label: "expense",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

interface AccountOverviewGraphProps {
  data: {
    date: string;
    income: number;
    expense: number;
  }[];
}

export const AccountOverviewGraph: React.FC<AccountOverviewGraphProps> = ({
  data,
}) => {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("income");

  const total = React.useMemo(
    () => ({
      income: data.reduce((acc, curr) => acc + curr.income, 0),
      expense: data.reduce((acc, curr) => acc + curr.expense, 0),
    }),
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="text-card-foreground text-md">
            Current Balance
          </CardTitle>
          <CardDescription className="text-primary text-md font-bold">
            {getCurrencySymbol("PHP")} {total.income - total.expense}
          </CardDescription>
        </div>
        <div className="flex">
          {["income", "expense"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span
                  className={`text-lg font-bold leading-none sm:text-3xl text-nowrap
                  ${key === "income" ? "text-green-500" : "text-red-500"}
                    `}
                >
                  {key === "income" ? "+" : "-"}
                  {getCurrencySymbol("PHP")}
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value, payload) => {
                    const category = payload?.[0]?.payload?.category || 'N/A';
                    const formattedDate = new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                    return `${formattedDate} - ${category}`;
                  }}
                />
              }
/>
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
