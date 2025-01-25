"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ShoppingListModal from "@/components/custom/ShoppingListModal";
import { ShoppingListRecords } from "@/components/data/data";


const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<string>("All Items");

  // Filtered data based on search and filter
  const filteredData = ShoppingListRecords.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "All Items" ||
      (filter === "Under $100" && item.price < 100) ||
      (filter === "Over $100" && item.price >= 100);
    return matchesSearch && matchesFilter;
  });

  const handleCategorySelect = (category: string) => {
    setFilter(category);
  };

  return (
    <section className="flex flex-col gap-6 lg:px-10 px-4 items-center justify-center">
      {/* Shopping List Card */}
      <Card className="bg-card border rounded-md w-full lg:h-[650px] h-[750px] shadow-lg overflow-hidden">
          <CardHeader className="flex flex-row justify-between items-center gap-4 p-4">
            <Input
              className="lg:w-[300px] md:w-full border shadow-lg"
              placeholder="Search Items"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" className="w-[120px]">{filter}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleCategorySelect("All Items")}>
                  All Items
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCategorySelect("Under $100")}>
                  Under $100
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCategorySelect("Over $100")}>
                  Over $100
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <ScrollArea className="h-[calc(100%-80px)]">
            <CardContent className="flex flex-col space-y-4 px-4 overflow-y-auto">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-md border w-full p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 shadow-md"
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox />
                      <Label className="text-sm">{item.title}</Label>
                    </div>
                    <Label className="text-primary underline">
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.link}
                      </a>
                    </Label>
                    <Label className="text-right font-medium">${item.price.toFixed(2)}</Label>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No items match your search or filter.
                </div>
              )}
            </CardContent>
          </ScrollArea>
        </Card>

      {/* Modal */}
      <ShoppingListModal />
    </section>
  );
};

export default Page;
