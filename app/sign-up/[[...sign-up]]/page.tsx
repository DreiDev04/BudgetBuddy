import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <SignUp />
    </div>
  );
}
