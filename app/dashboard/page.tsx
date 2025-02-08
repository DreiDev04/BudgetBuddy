"use client";
import React, { useEffect, useState } from "react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import BudgetInfo from '@/components/custom/BudgetInfo'
import DialogForm from "@/components/custom/AddAccountForm";

import { IAccount } from "@/types/account-types";
import { useToast } from "@/hooks/use-toast";
import { Loader2} from "lucide-react";

const page = () => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>("all-account");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(`/api/accounts/`);
        const data = await response.json();
        setAccounts(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch accounts. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  const filteredAccounts = selectedAccount === "all-account"
    ? accounts
    : accounts.filter((account) => account.accountName === selectedAccount);

  return (
    <div className="p-4">
      <section className="p-2 flex justify-between items-center rounded">
      <h1 className="text-2xl font-bold">
          {selectedAccount === "all-account"
            ? "Overview - All Accounts"
            : `Overview - ${selectedAccount}`}
        </h1>
        <Select
        value={selectedAccount}
        onValueChange={(value) => setSelectedAccount(value)}
        defaultValue="all-account">
          <SelectTrigger className="w-[150px] border-none">
            <SelectValue placeholder="All Account" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all-account">All Account</SelectItem>
              {accounts.map((account, index) => (
                <SelectItem key={index} value={account.accountName}>
                  {account.accountName}
                </SelectItem>
              ))}
              <SelectLabel>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start">
                      Add Account
                    </Button>
                  </DialogTrigger>
                  <DialogForm
                    setAccounts={setAccounts}
                    setDialogOpen={setDialogOpen}
                  />
                </Dialog>
              </SelectLabel>
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>

      <BudgetInfo income={300} expenses={200} balance={100} />


      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <>
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((account, index) => (
              <div key={index} className="space-y-2">
                <h2 className="font-bold">{account.accountName}</h2>
                {/* <p>Initial Value: ${account.initialValue}</p> */}
              </div>
            ))
          ) : (
            <p>No accounts found.</p>
          )}
        </>
      )}
         <pre>{JSON.stringify(accounts, null, 2)}</pre>
    </div>
  );
};


export default page;
