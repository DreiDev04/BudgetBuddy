"use client";
import React, { useState } from "react";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProfileForm from '@/components/custom/AddBudgetForm'
import { IBudget } from "@/types/budget-types";

const page = () => {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [budgets, setBudgets] = useState<IBudget[]>([]);
  const isDesktop = useMediaQuery("(min-width: 768px)");


  if (isDesktop) {
    return (
      <section className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="col-span-1 min-h-32 flex flex-col"
            >
              <PlusIcon size={20} />
              Create Budget
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Budget</DialogTitle>
              {/* <DialogDescription>
              </DialogDescription> */}
            </DialogHeader>
            <ProfileForm
            setBudgets={setBudgets}
            setDialogOpen={setDialogOpen}
          />
          </DialogContent>
        </Dialog>
      </section>
    );
  }
  return (
    <section className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
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
            {/* <DrawerDescription>

            </DrawerDescription> */}
          </DrawerHeader>
          <ProfileForm
            setBudgets={setBudgets}
            setDialogOpen={setDialogOpen}
          />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <pre>{JSON.stringify(budgets, null, 2)}</pre>

    </section>
  );
};


export default page;
