"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const CompleteOnboarding = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const completeOnboarding = async () => {
      const accountType = localStorage.getItem("accountType") || "Cash";
      const accountName = localStorage.getItem("accountName") || "Cash";
      const budgetLimit = localStorage.getItem("budgetLimit") || "0";
      const currency = localStorage.getItem("currency") || "USD";

      try {
        const response = await fetch("/api/completeOnboarding", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            accountType,
            accountName,
            budgetLimit,
            currency,
          }),
        });

        if (response.ok) {
          localStorage.removeItem("accountType");
          localStorage.removeItem("budgetLimit");
          localStorage.removeItem("accountName");
          localStorage.removeItem("currency");
          router.push("/dashboard");
        } else {
          console.error("Failed to complete onboarding");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    completeOnboarding();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <h2 className="text-2xl font-bold">Finalizing Setup...</h2>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">
                Setting up your account...
              </p>
            </div>
          ) : (
            <p className="text-green-500">
              You Successfully Completed the Onboarding Process
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompleteOnboarding;
