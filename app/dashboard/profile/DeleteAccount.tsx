"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
            <Button type='submit' variant={'destructive'}>Delete Account</Button>
          </div>
        </form>
    </section>
  )
}

export default DeleteAccount