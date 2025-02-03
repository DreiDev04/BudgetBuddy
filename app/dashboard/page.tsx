"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { accountTypes } from "@/helper/helper";

const page = () => {
  return (
    <div className="p-4">
      <section className=" p-2 flex justify-between items-center rounded">
        <h1 className="text-2xl font-bold">Overview</h1>
        <Select defaultValue="all-account">
          <SelectTrigger className="w-[150px] border-none">
            <SelectValue placeholder="All Account" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all-account">All Account</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="savings">Savings</SelectItem>
              <SelectLabel>
                <Dialog>
                  <DialogTrigger>Add Account</DialogTrigger>
                  <DialogForm />
                </Dialog>
              </SelectLabel>
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>
    </div>
  );
};

const DialogForm = () => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Account</DialogTitle>
        <DialogDescription>
          Add a new account to your dashboard.
        </DialogDescription>

        <form className={"grid items-start gap-4"}>
          <div className="grid gap-2">
            <Label htmlFor="account-name">Account Name</Label>
            <Input type="text" id="account-name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Types" />
              </SelectTrigger>
              <SelectContent>
                {accountTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Initial Value</Label>
            <Input
              id="description"
              type="number"
              min="0"
              step="1"
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === "e") {
                  e.preventDefault();
                }
              }}
            />
          </div>

          <Button type="submit">Add Account </Button>
        </form>
      </DialogHeader>
    </DialogContent>
  );
};

export default page;
