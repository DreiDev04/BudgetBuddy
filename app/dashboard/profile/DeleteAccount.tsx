"use client"

import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'

const DeleteAccount = () => {
  return (
    <section className="bg-card p-10 lg:w-[800px] w-full rounded-md ">
      <header className="mb-4 text-center lg:text-left">
        <h1 className="text-xl font-bold">Delete Account</h1>
        <p className='text-xs text-muted-foreground italic'>make sure you really want to delete your account, because this irreversible</p>
      </header>
        <form className="gap-4 mt-4 space-y-4">
          <div className='flex justify-center md:justify-end'>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant='destructive'>Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button variant='destructive'>Continue</Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
    </section>
  )
}

export default DeleteAccount