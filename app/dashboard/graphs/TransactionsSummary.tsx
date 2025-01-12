"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TransactionsSummary = () => {

  //TODO: Route the show more
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-lg font-semibold">Last Records Overview</div>
        <CardDescription>Last 30 Days</CardDescription>
      </CardContent>
    </Card>
  );
};

export default TransactionsSummary;
