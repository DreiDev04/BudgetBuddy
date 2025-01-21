'use client'

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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

const LastRecords = () => {
  const records = [
    // Last 7 days
    { id: 1, label: "Record 1", category: "foods", value: "$10", date: "2025-01-12" },
    { id: 2, label: "Record 2", category: "transport", value: "$15", date: "2025-01-14" },
    { id: 3, label: "Record 3", category: "entertainment", value: "$20", date: "2025-01-16" },
    { id: 4, label: "Record 4", category: "groceries", value: "$25", date: "2025-01-17" },

    // Last 3 months (excluding last 7 days)
    { id: 5, label: "Record 5", category: "clothing", value: "$50", date: "2024-12-15" },
    { id: 6, label: "Record 6", category: "groceries", value: "$35", date: "2024-12-01" },
    { id: 7, label: "Record 7", category: "foods", value: "$40", date: "2024-11-20" },
    { id: 8, label: "Record 8", category: "utilities", value: "$60", date: "2024-11-05" },
    { id: 9, label: "Record 9", category: "entertainment", value: "$75", date: "2024-10-25" },
    { id: 10, label: "Record 10", category: "foods", value: "$90", date: "2024-10-15" },

    // Older than 3 months
    { id: 11, label: "Record 11", category: "transport", value: "$20", date: "2024-09-01" },
    { id: 12, label: "Record 12", category: "clothing", value: "$80", date: "2024-08-15" },
    { id: 13, label: "Record 13", category: "groceries", value: "$100", date: "2024-08-01" },
  ];


  const [filter, setFilter] = useState<string>("All Items");

  const getFilteredRecords = () => {
    const now = new Date();
    return records.filter((record) => {
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

  return (
    <Card className="shadow-md rounded-lg lg:h-[600px] md:h-[750px] ">
      <CardHeader className="flex flex-row justify-between items-center ">
        <CardTitle>Last Records Overview</CardTitle>
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
              className="grid grid-cols-3 text-center justify-between p-4 rounded-lg shadow-md border"
            >
              <Label className="text-sm bg-primary rounded-md">
                {recent.label}
              </Label>
              <Label className="">{recent.category}</Label>
              <Label className="text-sm">{recent.value}</Label>
            </div>
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default LastRecords;
