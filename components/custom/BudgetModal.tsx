"use client"

import React from 'react'
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"


export const BudgetModal = () => {

    const fields = [
        {id: "title", label: "Title", type: "text"},
        {id: "description", label: "Description", type: "text"},
        {id: "categories", label: "Categories", type: "text"},
        {id: "color", label: "Color", type: "text"},
        {id: "currency", label: "Currency", type: "text"},
        {id: "budget", label: "Budget", type: "number"},
        {id: "expenses", label: "Expenses", type: "number"},
      ]

  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-6 right-6 p-4 py-6 rounded-full z-10 shadow-lg">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full md:w-[500px] m-auto">
          <DialogHeader>
            <DialogTitle>Add Budget</DialogTitle>
            <DialogDescription>
              Add a budget to track your expenses
            </DialogDescription>
          </DialogHeader>
            <div className="grid gap-4">
              {fields.map((field) => (
                <div key={field.id} className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={field.id} className="text-right">{field.label}</Label>
                  <Input id={field.id} type={field.type} className="col-span-3"/>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>

        </DialogContent>
      </Dialog>

  )
}

export default BudgetModal