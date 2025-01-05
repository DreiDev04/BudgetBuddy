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
