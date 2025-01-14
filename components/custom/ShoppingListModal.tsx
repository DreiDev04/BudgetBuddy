"use client"

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {  Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const ShoppingListModal = () => {
    const fields = [
        { id: "title", label: "Title", type: "text" },
        { id: "link", label: "Link", type: "text" },
        { id: "price", label: "Price", type: "number" },
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
            <DialogTitle>Add Item</DialogTitle>
            <DialogDescription>
              Add a new item to your shopping list
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {fields.map((field) => (
              <div
                key={field.id}
                className="grid grid-cols-4 items-center gap-4"
              >
                <Label htmlFor={field.id} className="text-right">
                  {field.label}
                </Label>
                <Input id={field.id} type={field.type} className="col-span-3" />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit">Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

export default ShoppingListModal