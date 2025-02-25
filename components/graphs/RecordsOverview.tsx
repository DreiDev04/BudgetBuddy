'use client'

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { LucideSwitchCamera } from "lucide-react";

interface RecordsOverviewProps{
  data: {
    id: string,
    label: string,
    category: string,
    income: number,
    expenses: number,
    date: string,
    fill: string
  }[];
}

const RecordsOverview: React.FC<RecordsOverviewProps> = ({ data }) => {
  const [filter, setFilter] = useState<string>("All Items");
  const [view, setView] = useState<"Income" | "Expenses">("Income");

  const getFilteredRecords = () => {
    const now = new Date();
    return data.filter((record) => {
      const recordDate = new Date(record.date);
      if (filter === "All Items") return true;

      if (filter === "Last 3 months") {
        const threeMonthsAgo = new Date(now);
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        return recordDate >= threeMonthsAgo;
      }

      if (filter === "Last 30 days") {
        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return recordDate >= thirtyDaysAgo;
      }

      if (filter === "Last 7 days") {
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return recordDate >= sevenDaysAgo;
      }

      return true;
    });
  };

  const filteredData = getFilteredRecords();

  const handleCategorySelect = (category: string) => {
    setFilter(category);
  };

  const toggleView = () => {
    setView((prevView) => (prevView === "Income" ? "Expenses" : "Income"));
  };

  return (
    <Card className="shadow-md rounded-lg h-[600px] lg:h-[680px] md:h-[830px] sm:h-[700px]  pb-5 ">
      <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          <CardTitle>Records Overview</CardTitle>
          <CardDescription className="text-xs">
            Income and Spending Overview
          </CardDescription>
        </div>
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-2">
          <Button onClick={toggleView}>
            {view === "Income" ? "View Expenses" : "View Income"}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" className="w-[120px]">
                {filter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleCategorySelect("All Items")}>
                All Items
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategorySelect("Last 3 months")}>
                Last 3 months
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategorySelect("Last 30 days")}>
                Last 30 days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategorySelect("Last 7 days")}>
                Last 7 days
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <ScrollArea className="lg:h-[560px] md:h-[670px] h-[450px]">
        <CardContent className="space-y-3 lg:h-[680px] md:h-[800px] h-[600px] ">
          <div className="grid grid-cols-1 gap-4">
            {filteredData.map((recent) => (
              <div
                key={recent.id}
                // className="flex flex-row items-center justify-between p-4 rounded-lg shadow-md border space-y-2"
                className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2 gap-4 text-center p-4 rounded-lg shadow-md border"
              >
                <Label className="text-sm bg-primary text-white rounded-sm px-3 py-1 w-auto">
                  {view === "Income" ? "Income" : "Expenses"}
                </Label>
                <Label className="text-sm">{recent.category}</Label>
                <Label className="text-sm font-semibold">
                  {view === "Income" ? `$${recent.income}` : `$${recent.expenses}`}
                </Label>
                <Label className="text-sm text-muted">
                  {new Date(recent.date).toLocaleDateString("en-GB")}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
};


export default RecordsOverview;