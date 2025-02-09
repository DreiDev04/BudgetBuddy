'use client'

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/use-media-query";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import BudgetModal from "@/components/custom/BudgetModal";
import { IBudget } from "@/types/budget-types";
import { useToast } from "@/hooks/use-toast";

const BudgetInfo = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { budgetId } = useParams(); // Extract budget ID from URL
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [budget, setBudget] = useState<IBudget | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!budgetId) return;

    const fetchBudget = async () => {
      try {
        const response = await fetch(`/api/budget/${budgetId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch budget data");
        }
        const data = await response.json();
        setBudget(data);
      } catch (err) {
        setError("Error fetching budget");
        toast({ title: "Error", description: "Failed to fetch budget", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchBudget();
  }, [budgetId]);

  if (loading) return <p>Loading budget...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!budget) return <p>No budget found.</p>;

  if (isDesktop) {
    return (
      <section className="flex flex-col gap-5">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center p-4 space-x-4">
            <Link href="/dashboard/budget">
              <Button variant="ghost">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <CardTitle className="text-xl font-bold">
              Budget: ${budget.budgetLimit}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="mx-3">
                    <Pencil />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Transaction Form</DialogTitle>
                  </DialogHeader>
                  <BudgetModal budget={budget} setBudgets={setBudget} setDialogOpen={setDialogOpen} />
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
        </Card>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-5">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center p-4 space-x-4">
          <Link href="/dashboard/budget">
            <Button variant="ghost">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <CardTitle className="text-xl font-bold">
            Budget: ${budget.budgetLimit}
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost">
                  <Pencil />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="sm:max-w-[425px]">
                <DrawerHeader>
                  <DialogTitle>Transaction Form</DialogTitle>
                </DrawerHeader>
                <BudgetModal budget={budget} setBudgets={setBudget} setDialogOpen={setDialogOpen} />
              </DrawerContent>
            </Drawer>
          </CardTitle>
        </CardHeader>
      </Card>
    </section>
  );
};

export default BudgetInfo;
