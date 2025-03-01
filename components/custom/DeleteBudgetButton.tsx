'use client'

import React, { useEffect } from 'react'
import { Trash2Icon } from 'lucide-react'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast'

interface DeleteButtonProps {
    id: string;
    onItemDeleted?: () => void;
}

const DeleteBudgetButton: React.FC<DeleteButtonProps>= ({id, onItemDeleted}) => {
    const {toast} = useToast();
    const [open, setOpen] = React.useState(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/budget/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${await response.text()}`);
            }
            toast({
                title: 'Deleted',
                description: 'Budget has been removed successfully.'
            });
            setOpen(false);

            if (onItemDeleted) onItemDeleted();
        }
        catch (error: any ) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.message || 'Failed to delete budget. Please try again.'
            });
        }
    }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button
            variant={'ghost'}
            className='w-[6px]'
            onClick={(e) => e.stopPropagation()}
            >
                <Trash2Icon/>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete Budget</DialogTitle>
            </DialogHeader>
            <DialogDescription>
                Are you sure you want to delete this budget?
            </DialogDescription>
            <DialogFooter>
                <Button variant="destructive" onClick={handleDelete} >
                    Delete</Button>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                    Cancel</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export default DeleteBudgetButton