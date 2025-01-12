import {  Document } from "mongoose";

// SignInResult type
export interface SignInResult {
  ok?: boolean;
  error?: string;
  status?: number;
}

// Error response type (optional, if you want to define errors more strictly)
export interface ErrorResponse {
  message: string;
  code?: number;
}


export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

