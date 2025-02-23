"use client";

import React, { useState, useEffect} from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ShoppingListModal from "@/components/custom/ShoppingListModal";
import { IShoppingList } from "@/types/shoppingList-types";
import { useToast } from "@/hooks/use-toast";
import { AnyArray } from "mongoose";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All Items");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const [shoppingList, setShoppingList] = useState<IShoppingList[]>([]); // Add this line

  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        const response = await fetch("/api/shopping/");

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();
        setShoppingList(data);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch shopping list. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchShoppingList();
  }, []);

  const handleCheckBox = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    console.log("Deleting item with ID:", id); // Debugging step

    try {
      const response = await fetch(`/api/shopping/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }

      setShoppingList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete item. Please try again.",
      });
    }
  };

  // Function to handle filtering logic
  const filteredData = shoppingList.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === "All Items" ||
      (filter === "Under $100" && item.price < 100) ||
      (filter === "Over $100" && item.price >= 100);
    return matchesSearch && matchesFilter;
  });



  return (
    <section className="flex flex-col gap-6 px-4 lg:px-10 items-center justify-center">
      {/* Shopping List Card */}
      <Card className="bg-card border rounded-xl w-full max-w-4xl h-[750px] lg:h-[650px] shadow-md overflow-hidden">
        <CardHeader className="flex justify-between items-center gap-4 p-6 bg-accent rounded-t-xl">
          <Input
            className="w-full lg:w-[320px] border shadow-md px-4 py-2 text-sm rounded-lg"
            placeholder="Search for items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[140px] text-sm font-medium">{filter}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px] shadow-md rounded-md">
              {["All Items", "Under $100", "Over $100"].map((category) => (
                <DropdownMenuItem
                  key={category}
                  className="hover:bg-muted px-4 py-2 text-sm"
                  onClick={() => setFilter(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <ScrollArea className="h-[calc(100%-80px)] py-4">
        <CardContent className="flex flex-col space-y-4">
          {isLoading ? (
            <div className="text-center text-gray-500 py-12 text-sm font-medium">
              Loading shopping list...
            </div>
          ) : filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <div
                key={item.id ?? index}
                className="rounded-lg border p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 shadow-sm hover:shadow-md transition-all sm:my-5"
              >
                <div className="flex items-center space-x-3">
                  <Checkbox className="w-5 h-5" onCheckedChange={() => handleCheckBox(item.id)} />
                  <Label className="text-sm font-medium">{item.title}</Label>
                </div>
                <Label className="text-primary underline truncate max-w-xs lg:max-w-sm text-sm">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.link}
                  </a>
                </Label>
                <Label className="text-right font-semibold text-lg">${item.price.toFixed(2)}</Label>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-12 text-sm font-medium">
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
