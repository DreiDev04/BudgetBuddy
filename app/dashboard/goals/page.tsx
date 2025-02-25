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
import { useGoalsData } from "@/app/dashboard/page-old";

const Page = () => {
  const [goalsData] = useGoalsData();
  const [filteredGoals, setFilteredGoals] = React.useState(goalsData);
  const [selectedCategory, setSelectedCategory] = React.useState("All Goals");

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === "All Goals") {
      setFilteredGoals(goalsData);
    } else {
      const filtered = goalsData.filter((goal) => goal.category === category);
      setFilteredGoals(filtered);
    }
  };

  return (
    <section
      className="h-auto grid xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-6"
      aria-labelledby="goals-section"
    >
      <Card className="col-span-2 bg-card border rounded-lg shadow-md h-[calc(100vh-100px)] overflow-hidden">
        <CardHeader className="flex flex-row justify-between items-center py-4">
          <CardTitle id="detailed-breakdown-title">
            Detailed Breakdown of Goals
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" className="w-[150px]">
                {selectedCategory}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleCategorySelect("All Goals")}>
                All Goals
              </DropdownMenuItem>
              {[...new Set(goalsData.map((goal) => goal.category))].map((category, index) => (
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
          <CardContent className="flex flex-col space-y-6 overflow-y-auto pb-6">
            {filteredGoals.map((goal) => (
              <div
                key={goal.id}
                className={`rounded-lg border w-full p-6 flex flex-col space-y-4 shadow-xl ${goal.color}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <Label className="flex items-center">
                    <Car aria-hidden="true" />
                    <span className="ml-2 text-lg font-semibold">
                      {goal.title}
                    </span>
                  </Label>
                  <Progress
                    value={goal.progress}
                    className="w-full lg:w-[50%] flex-grow"
                  />
                  <Label className="text-base">${goal.target}</Label>
                  <Label className="text-base">{goal.date}</Label>
                  <UpdateGoal />
                </div>
                <Label className="text-sm ">
                  {goal.note}
                </Label>
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
