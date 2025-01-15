import { UserProfile } from "@clerk/nextjs";
import {dark} from '@clerk/themes'

const UserProfilePage = () => (
  <div className="w-full h-full flex items-center justify-center">
    <UserProfile
      path="/dashboard/user-profile"
      appearance={{
        variables: {
          colorPrimary: 'hsl(142.1, 76.2%, 36.3%)',
          colorText: 'hsl(240, 10%, 3.9%)',
          colorBackground: 'hsl(0, 0% 90%)',
        },
        elements: {
          card: 'bg-gray-100 p-6 rounded-lg shadow-lg',
        },
      }}
    />
  </div>
);

export default UserProfilePage;
