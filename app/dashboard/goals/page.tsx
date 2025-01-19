"use client";

import * as React from "react";
import GoalsGraph from "../../../components/graphs/GoalsGraph";
import GoalsModal from "@/components/custom/GoalsModal";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Car } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import UpdateGoal from "@/components/custom/UpdateGoal";
import { ScrollArea } from "@/components/ui/scroll-area";

const Page = () => {
  const goals = [
    { id: 1, title: "Car", progress: 50, category: "car", target: "$10,000", note: "short note", color: "bg-green-700", date: "2025-12-31" },
    { id: 2, title: "Vacation", progress: 20, category: "Vacation", target: "$5,000", note: "short note", color: "bg-blue-600", date: "2025-06-15" },
    { id: 3, title: "Emergency Fund", progress: 70, category: "Emergency", target: "$20,000", note: "short note", color: "bg-red-600", date: "2025-10-01" },
    { id: 4, title: "Home Renovation", progress: 40, category: "Renovation", target: "$50,000", note: "short note", color: "bg-yellow-600", date: "2026-01-01" },
    { id: 5, title: "Backyard Renovation", progress: 40, category: "Renovation", target: "$50,000", note: "short note", color: "bg-purple-600", date: "2026-01-01" },
    { id: 6, title: "Garage Renovation", progress: 40, category: "Renovation", target: "$50,000", note: "short note", color: "bg-purple-600", date: "2026-01-01" },
  ];

  const [filteredGoals, setFilteredGoals] = React.useState(goals);
  const [selectedCategory, setSelectedCategory] = React.useState("All Goals");

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === "All Goals") {
      setFilteredGoals(goals);
    } else {
      const filtered = goals.filter((goal) => goal.category === category);
      setFilteredGoals(filtered);
    }
  };

  return (
    <section
      className="h-auto grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 p-4"
      aria-labelledby="goals-section"
    >
      {/* Goals Progress Graph */}
      <article className="lg:col-span-1 md:col-span-2 sm:col-span-1">
        <GoalsGraph />
      </article>

      {/* Detailed Breakdown */}
      <Card className="lg:col-span-2 md:col-span-2 sm:col-span-1 bg-card border rounded-md h-[650px] overflow-hidden">
        <CardHeader className="flex flex-row justify-between items-center px-4">
          <CardTitle id="detailed-breakdown-title">Detailed Breakdown of Goals</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" className="w-[120px]">
                {selectedCategory}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleCategorySelect("All Goals")}>
                All Goals
              </DropdownMenuItem>
              {[...new Set(goals.map((goal) => goal.category))].map((category, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <ScrollArea className="h-[calc(100%-80px)]">
          <CardContent className="flex flex-col space-y-4 px-4 overflow-y-auto">
            {filteredGoals.map((goal) => (
              <div
                key={goal.id}
                className={`rounded-sm border w-full h-auto p-4 flex flex-col space-y-2 ${goal.color}`}
              >
                <div className="flex flex-wrap items-center justify-between space-x-2">
                  <Label className="flex items-center">
                    <Car aria-hidden="true" />
                    <span className="ml-2">{goal.title}</span>
                  </Label>
                  <Progress
                    value={goal.progress}
                    className="w-full lg:w-[40%] flex-grow my-2"
                  />
                  <Label>{goal.target}</Label>
                  <Label>{goal.date}</Label>
                  <UpdateGoal />
                </div>
                <Label className="text-sm">{goal.note}</Label>
              </div>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>

      {/* Modal */}
      <GoalsModal />
    </section>
  );
};

export default Page;
