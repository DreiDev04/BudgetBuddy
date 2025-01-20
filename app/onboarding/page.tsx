import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      Onboarding Soon be Implemented
      <Button asChild>
        <Link href={"/dashboard/budget"}>Dashboard </Link>
      </Button>
    </div>
  );
};

export default page;
