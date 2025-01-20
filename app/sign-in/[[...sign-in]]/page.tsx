import { SignIn } from "@clerk/nextjs";

const appearanceVariables = {
  variables: {
    colorPrimary: "hsl(142.1, 76.2%, 36.3%)",
    colorText: "hsl(240, 10%, 3.9%)",
    colorBackground: "hsl(0, 0%, 90%)",
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <SignIn
        appearance={appearanceVariables}
        forceRedirectUrl={"/api/onboardingCheck"}
      />
    </div>
  );
}
