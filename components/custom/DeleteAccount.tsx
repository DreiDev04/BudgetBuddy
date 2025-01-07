"use client"

import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'

const DeleteAccount = () => {
  return (
    <div>
        <section className="bg-secondary p-4 w-[800px] rounded-md">
          <header className=" mb-4">
            <h1 className="text-xl font-bold text-white">Delete Account</h1>
            <p className='text-xs mx-2 text-muted-foreground italic'>make sure you really want to delete your account, because this irreversible</p>
          </header>
            <form className="gap-4 mt-4 space-y-4">
              <div className='flex justify-end'>

                <Button type='submit' variant={'destructive'}>Delete Account</Button>
              </div>
            </form>
        </section>
    </div>
  )
}

export default DeleteAccount