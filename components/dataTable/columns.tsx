"use client";

import { ColumnDef } from "@tanstack/react-table";
import DeleteButton from "../custom/DeleteButton";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export type ShoppingItem = {
  _id: string;
  title: string;
  link: string;
  price: number;
};

export const columns = (onItemDeleted: () => void): ColumnDef<ShoppingItem>[] => [
  {
    accessorKey: "number",
    header: "Count",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "title",
    header: () => <Label>Name</Label>,
    cell: ({ row }) => <div className="capitalize">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => (
      <Button variant={'link'}>
          <a
          href={row.getValue("link")}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Item
        </a>
      </Button>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;

      return <DeleteButton id={item._id} onItemDeleted={onItemDeleted} />;
    },
  },
];
