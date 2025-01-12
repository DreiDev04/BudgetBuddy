import React from "react";
import UpdateProfile from "@/app/dashboard/profile/UpdateProfile";
import UpdatePassword from "@/app/dashboard/profile/UpdatePassword";
import DeleteAccount from "@/app/dashboard/profile/DeleteAccount";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  if (!session?.user) return null;
  console.log(session);
  
  return (
    <main className="flex flex-col items-center gap-6 pb-[80px]">
      <UpdateProfile user={session?.user} />
      {/* <UpdatePassword />
      <DeleteAccount /> */}
    </main>
  );
};

export default page;
