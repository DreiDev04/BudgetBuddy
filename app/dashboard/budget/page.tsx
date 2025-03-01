"use client";
import React, { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import CreateBudgetForm from "@/components/custom/CreateBudgetForm";
import DeleteBudgetButton from "@/components/custom/DeleteBudgetButton";
import { IBudget } from "@/types/budget-types";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const page = () => {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [budgets, setBudgets] = useState<IBudget[]>([]);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await fetch("/api/budget/");

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();
        setBudgets(data);
      } catch (error) {
        console.error("Fetch error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch accounts. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBudgets();
  }, []);

  if (isDesktop) {
    return (
      <section className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
        {/* Dialog to create a new budget */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="col-span-1 min-h-44 flex flex-col"
            >
              <PlusIcon size={20} />
              Create Budget
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] ">
            <DialogHeader>
              <DialogTitle>Create Budget</DialogTitle>
            </DialogHeader>
            <CreateBudgetForm
              setBudgets={setBudgets}
              setDialogOpen={setDialogOpen}
            />
          </DialogContent>
        </Dialog>

        {/* Budgets list */}
        {budgets.map((budget) => (
          <section key={budget._id} className="relative">
            <Link href={`/dashboard/budget/${budget._id}`}>
            <Card className='col-span-1 min-h-44'
              style={{ backgroundColor: budget.color[0]?.hex }}
                  >
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        {budget.title}
                    </CardTitle>
                    <CardDescription>{budget.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Label>Budget: ${budget.budgetLimit}</Label>
                  </CardFooter>
                </Card>
            </Link>

            <div className="absolute top-4 right-4">
              <DeleteBudgetButton
                id={budget._id}
                onItemDeleted={() => {
                  setBudgets((prevBudgets) => prevBudgets.filter((b) => b._id !== budget._id));
                }}
              />
            </div>
          </section>
        ))}

      </section>
    );
  }

  return (
    <section className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5">
      {/* Drawer to create a new budget */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="col-span-1 min-h-32 flex flex-col"
          >
            <PlusIcon size={20} />
            Create Budget
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Create Budget</DrawerTitle>
          </DrawerHeader>
          <CreateBudgetForm
            setBudgets={setBudgets}
            setDialogOpen={setDialogOpen}
          />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button className="mx-[50px]" variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

        {/* Budgets list */}
        {budgets.map((budget) => (
          <section key={budget._id} className="relative">
            <Link href={`/dashboard/budget/${budget._id}`}>
            <Card className='col-span-1 min-h-44'
              style={{ backgroundColor: budget.color[0]?.hex }}
                  >
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        {budget.title}
                    </CardTitle>
                    <CardDescription>{budget.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Label>Budget: ${budget.budgetLimit}</Label>
                  </CardFooter>
                </Card>
            </Link>

            <div className="absolute top-4 right-4">
              <DeleteBudgetButton
                id={budget._id}
                onItemDeleted={() => {
                  setBudgets((prevBudgets) => prevBudgets.filter((b) => b._id !== budget._id));
                }}
              />
            </div>
          </section>
        ))}

    </section>
  );
};

export default page;
