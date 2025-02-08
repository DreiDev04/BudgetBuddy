'use client'

import React, {useState, useEffect} from "react";
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
import { useMediaQuery } from "@/hooks/use-media-query";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import BudgetModal from "@/components/custom/BudgetModal";
import { IBudget } from "@/types/budget-types";
import { useToast } from "@/hooks/use-toast";

const BudgetInfo = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [budgets, setBudgets] = useState<IBudget[]>([]); //subject to change
  const { toast } = useToast();

  //Api Call here

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
            <CardTitle className="text-xl font-bold"
            >
              Budget:
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="mx-3">
                    <Pencil/>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] ">
                  <DialogHeader>
                    <DialogTitle>Transaction Form</DialogTitle>
                  </DialogHeader>
                    <BudgetModal
                    setBudgets={setBudgets}
                    setDialogOpen={setDialogOpen}
                    />
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Budget balance graph would be here */}
      </section>
    );
  }
  return(
    <section className="flex flex-col gap-5">
      <Card className="w-full">
          <CardHeader className="flex flex-row items-center p-4 space-x-4">
            <Link href="/dashboard/budget">
              <Button variant="ghost">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <CardTitle className="text-xl font-bold">Budget:
              <Drawer  open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                  <Button variant="ghost">
                    <Pencil/>
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="sm:max-w-[425px] ">
                  <DrawerHeader>
                    <DialogTitle>Transaction Form</DialogTitle>
                  </DrawerHeader>
                    <BudgetModal
                    setBudgets={setBudgets}
                    setDialogOpen={setDialogOpen}
                    />
                </DrawerContent>
                {/* Cancel button will be added */}
              </Drawer>
            </CardTitle>
          </CardHeader>

        </Card>
    </section>
  )

};

export default BudgetInfo;
