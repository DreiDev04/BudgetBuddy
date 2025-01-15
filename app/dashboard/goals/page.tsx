"use client";

import * as React from "react";
import GoalsGraph from "../graphs/GoalsGraph";
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
  // Fake data setup
  const goals = [
    { id: 1, title: "Car", progress: 50, category: "car", target: "$10,000", note: 'short note', color: "bg-green-900", date: "2025-12-31" },
    { id: 2, title: "Vacation", progress: 20, category: "Vacation", target: "$5,000", note: 'short note', color: "bg-blue-900", date: "2025-06-15" },
    { id: 3, title: "Emergency Fund", progress: 70, category: "Emergency", target: "$20,000", note: 'short note', color: "bg-red-900", date: "2025-10-01" },
    { id: 4, title: "Home Renovation", progress: 40, category: "Renovation", target: "$50,000", note: 'short note', color: "bg-yellow-900", date: "2026-01-01" },
    { id: 5, title: "Backyard Renovation", progress: 40, category: "Renovation", target: "$50,000", note: 'short note', color: "bg-purple-900", date: "2026-01-01" },
  ];

  // State for selected category
  const [filteredGoals, setFilteredGoals] = React.useState(goals);

  // Handle category selection
  const handleCategorySelect = (category: string) => {
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
      <Card className="h-[650px] lg:col-span-2 md:col-span-2 sm:col-span-1 bg-card border rounded-md">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle id="detailed-breakdown-title">Detailed Breakdown of Goals</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'default'} className="w-[120px]">Categories</Button>
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
        <ScrollArea>
          <CardContent className="flex flex-col space-y-4">
            {filteredGoals.map((goal) => (
              <div
                key={goal.id}
                className={`rounded-sm border w-full h-auto p-4 flex flex-col space-y-2 ${goal.color}`}
              >
                <div className="flex flex-row items-center justify-between space-x-2">
                  <Label className="flex items-center">
                    <Car aria-hidden="true" />
                    <span className="ml-2">{goal.title}</span>
                  </Label>
                  <Progress value={goal.progress} className="w-[40%] flex-grow" />
                  <Label>{goal.target}</Label>
                  <Label>{goal.date}</Label>
                  <UpdateGoal />
                </div>
                <Label>{goal.note}</Label>
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
