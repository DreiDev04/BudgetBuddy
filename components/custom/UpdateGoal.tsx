import React from 'react'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"
import { Button }from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";


const UpdateGoal = () => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant={'link'} className='p-2'><Pencil/></Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Update Goal</DialogTitle>
            </DialogHeader>

        </DialogContent>
    </Dialog>
  )
}

export default UpdateGoal