import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <div className="w-full h-full flex items-center justify-center">
    <UserProfile path="/dashboard/user-profile" />
  </div>
);

export default UserProfilePage;
