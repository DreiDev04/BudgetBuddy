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

interface RecordsOverviewProps{
  data: {
    id: string,
    label: string,
    category: string,
    amount: number,
    date: string,
    fill: string
  }[];
}

const RecordsOverview: React.FC<RecordsOverviewProps> = ({data}) => {

  const [filter, setFilter] = useState<string>("All Items");

  const getFilteredRecords = () => {
    const now = new Date();
    return data.filter((data) => {
      const recordDate = new Date(data.date);
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

  return (
    <Card className="shadow-md rounded-lg lg:h-[680px] md:h-[750px] min-h-[600px]">
      <CardHeader className="flex flex-row justify-between items-center ">
        <div>
          <CardTitle>Records Overview</CardTitle>
          <CardDescription>Spending and Income Overview</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="w-[120px]">{filter}</Button>
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
      </CardHeader>
      <ScrollArea className="h-[calc(100%-120px)]">
        <CardContent className="space-y-3 overflow-hidden">
          {filteredData.map((recent) => (
            <div
              key={recent.id}
              className="grid grid-cols-2 lg:grid-cols-4  md:grid-cols-2 gap-4 text-center p-4 rounded-lg shadow-md border"
            >
              <Label className="text-sm bg-primary rounded-sm p-2">
                {recent.label}
              </Label>
              <Label className='text-sm p-2'>{recent.category}</Label>
              <Label className="text-sm p-2">${recent.amount}</Label>
              <Label className="text-sm p-2">
                {new Date(recent.date).toLocaleDateString("en-GB")}
              </Label>
            </div>
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default RecordsOverview;
