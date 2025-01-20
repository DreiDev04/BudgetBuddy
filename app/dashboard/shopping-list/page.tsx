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

export type Item = {
  id: string;
  title: string;
  link: string;
  price: number;
};

const data: Item[] = [
  { id: "1", title: "Item 1", link: "https://example.com/item1", price: 50 },
  { id: "2", title: "Item 2", link: "https://example.com/item2", price: 75 },
  { id: "3", title: "Item 3", link: "https://example.com/item3", price: 100 },
  { id: "4", title: "Item 4", link: "https://example.com/item4", price: 150 },
  { id: "5", title: "Item 5", link: "https://example.com/item5", price: 200 },
  { id: "6", title: "Item 6", link: "https://example.com/item6", price: 20 },
  { id: "7", title: "Item 7", link: "https://example.com/item7", price: 30 },
  { id: "8", title: "Item 8", link: "https://example.com/item8", price: 80 },
  { id: "9", title: "Item 9", link: "https://example.com/item9", price: 90 },
  { id: "10", title: "Item 10", link: "https://example.com/item10", price: 820 },
];

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<string>("All Items");

  // Filtered data based on search and filter
  const filteredData = data.filter((item) => {
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
      <Card className="bg-card border rounded-md w-full h-[650px] shadow-lg overflow-hidden">
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
