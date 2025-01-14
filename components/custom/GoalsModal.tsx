"use client"

import React from 'react'
import { Pencil, Plus } from "lucide-react";
import { Card} from "@/components/ui/card"
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

const GoalsModal = () => {
    const field = [
        {id: 'name', label: 'Name', type: 'text'},
        {id: 'description', label: 'Description', type: 'text'},
        {id: 'targetGoal', label: 'Target Goal', type: 'number'},
        {id: 'currentGoal', label: 'Current Goal', type: 'number'},
        {id: 'targetDate', label: 'Target Date', type: 'date'},
        {id: 'note', label: 'Note', type: 'text'},
        {id: 'icon', label: 'Icon', type: 'text'},
        {id: 'color', label: 'Color', type: 'text'},
        {id: 'currency', label: 'Currency', type: 'text'},
        {id: 'categories', label: 'Categories', type: 'text'},
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
            <DialogTitle>Goals</DialogTitle>
            <DialogDescription>Set you Goals</DialogDescription>
          </DialogHeader>

        </DialogContent>
    </Dialog>
  )
}

export default GoalsModal