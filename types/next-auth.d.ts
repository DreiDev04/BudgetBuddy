// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    gender?: "Female" | "Male" | "Other";
    birthdate?: Date;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      gender?: "Female" | "Male" | "Other";
      birthdate?: Date;
    };
  }

  interface JWT {
    id: string;
    name: string;
    email: string;
    gender?: "Female" | "Male" | "Other";
    birthdate?: Date;
  }
}
