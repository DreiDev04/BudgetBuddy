import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="space-y-6 text-center">
          <div className="w-32 h-32 mx-auto relative">
            <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center">
              <img
                src="/logo/Logo.svg"
                alt="Budget Buddy Logo"
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome to Budget Buddy
            </h1>
            <p className="text-muted-foreground">
              Your personal finance journey starts here. Let's set up your account
              together.
            </p>
          </div>
        </CardHeader>

        <CardContent className="text-center">
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">Quick Setup</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-2">
                <svg
                  className="w-6 h-6 text-secondary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">Secure</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-2">
                <svg
                  className="w-6 h-6 text-accent-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">Track Progress</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pb-8">
          <Link href="/onboarding/step1" className="w-full max-w-xs">
            <Button
              className="w-full font-semibold"
              size="lg"
            >
              Let's get started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;