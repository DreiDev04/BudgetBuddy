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
import ProfileForm from "@/components/custom/AddBudgetForm";
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
            <ProfileForm
              setBudgets={setBudgets}
              setDialogOpen={setDialogOpen}
            />
          </DialogContent>
        </Dialog>

        {/* Budgets list */}
        {budgets.map((budget) => (
          <Link key={budget._id} href={`/dashboard/budget/${budget._id}`}>
            <Card className="col-span-1 max-h-48">
              <CardHeader>
                <CardTitle>{budget.title}</CardTitle>
                <CardDescription>{budget.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Budget: ${budget.budgetLimit}</p>
                <p style={{ color: budget.color[0]?.hex }}>
                  Color: {budget.color[0]?.name}
                </p>
              </CardContent>
            </Card>
          </Link>
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
          <ProfileForm
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
          <Link key={budget._id} href={`/dashboard/budget/${budget._id}`}>
            <Card className="col-span-1 max-h-48">
              <CardHeader>
                <CardTitle>{budget.title}</CardTitle>
                <CardDescription>{budget.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Budget: ${budget.budgetLimit}</p>
                <p style={{ color: budget.color[0]?.hex }}>
                  Color: {budget.color[0]?.name}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}

    </section>
  );
};

export default page;
