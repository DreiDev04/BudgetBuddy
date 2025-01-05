"use client";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <button
      onClick={() => {
        signOut({callbackUrl: '/'});
        
      }}
      className="p-2 text-foreground"
    >
      Log Out
    </button>
  );
};

export default SignOutButton;
