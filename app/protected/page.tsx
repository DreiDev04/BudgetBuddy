import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <h1>You are not signed in</h1>
        <a href="/api/auth/signin">Sign in</a>
      </div>
    );
  }

  return <h1>Welcome, {session.user?.name}!</h1>;
}
