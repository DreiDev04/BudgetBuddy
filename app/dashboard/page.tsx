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
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { accountTypes } from "@/helper/helper";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineStock } from "react-icons/ai";

const AccountSchema = z.object({
  accountName: z.string().min(1, "Account name is required"),
  type: z.string().min(1, "Account type is required"),
  initialValue: z.number().min(0, "Initial value must be positive"),
});
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IAccount } from "@/types/account-types";
import { useToast } from "@/hooks/use-toast";
import { Loader2, PhilippinePeso } from "lucide-react";
import Image from "next/image";

const page = () => {
  const [Accounts, setAccounts] = useState<IAccount[]>([]);
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

  return (
    <div className="p-4">
      <section className="p-2 flex justify-between items-center rounded">
        <h1 className="text-2xl font-bold">{`Overview - ${Accounts[0]?.accountName}`}</h1>
        <Select defaultValue="all-account">
          <SelectTrigger className="w-[150px] border-none">
            <SelectValue placeholder="All Account" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all-account">All Account</SelectItem>
              {Accounts.map((account, index) => (
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

      <section className="grid md:grid-cols-3 grid-cols-1 gap-6 mt-6">
        <div className="bg-card shadow-md rounded-lg flex items-center p-6">
          <Image
            src="https://cdn-icons-png.flaticon.com/128/10893/10893970.png"
            width={50}
            height={50}
            alt="stock image"
            className="mr-4"
          />
          <div>
            <h1 className="text-xl font-semibold text-gray-500">Income</h1>
            <p className="text-xl font-bold">
              <PhilippinePeso className="inline-block mr-2" />
              300.00
            </p>
          </div>
        </div>
        <div className="bg-card shadow-md rounded-lg flex items-center p-6">
          <Image
            src="https://cdn-icons-png.flaticon.com/128/10893/10893978.png"
            width={50}
            height={50}
            alt="expenses image"
            className="mr-4"
          />
          <div>
            <h1 className="text-xl font-semibold text-gray-500">Expenses</h1>
            <p className="text-xl font-bold">
              <PhilippinePeso className="inline-block mr-2" />
              300.00
            </p>
          </div>
        </div>
        <div className="bg-card shadow-md rounded-lg flex items-center p-6">
          <Image
            src="https://cdn-icons-png.flaticon.com/128/11396/11396390.png"
            width={50}
            height={50}
            alt="balance image"
            className="mr-4"
          />
          <div>
            <h1 className="text-xl font-semibold text-gray-500">Balance</h1>
            <p className="text-xl font-bold">
              <PhilippinePeso className="inline-block mr-2" />
              300.00
            </p>
          </div>
        </div>
      </section>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <pre>{JSON.stringify(Accounts, null, 2)}</pre>
      )}
    </div>
  );
};

const DialogForm = ({
  setAccounts,
  setDialogOpen,
}: {
  setAccounts: React.Dispatch<React.SetStateAction<IAccount[]>>;
  setDialogOpen: (open: boolean) => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      accountName: "",
      type: "",
      initialValue: 0,
    },
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add account");
      }

      const newAccount = await response.json();
      setAccounts((prev) => [...prev, newAccount]);

      toast({
        title: "Success",
        description: "Account added successfully!",
      });

      setDialogOpen(false);
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add account. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add Account</DialogTitle>
        <DialogDescription>
          Add a new account to your dashboard.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {accountTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="initialValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Value</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    type="number"
                    min="0"
                    step="1"
                    name={field.name}
                    value={field.value}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^0\d/.test(value)) {
                        e.target.value = value.replace(/^0+/, "");
                      }
                      field.onChange(parseFloat(e.target.value) || 0);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e") {
                        e.preventDefault();
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Account"
            )}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default page;
