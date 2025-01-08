
import React from 'react'
import UpdateProfile from '@/app/dashboard/profile/UpdateProfile'
import UpdatePassword from '@/app/dashboard/profile/UpdatePassword'
import DeleteAccount from '@/app/dashboard/profile/DeleteAccount'



const page = () => {
  return (
    <main className="flex flex-col items-center gap-6 pb-[80px]">
      {/* user profile section */}
      <UpdateProfile />

      {/* password section */}
      <UpdatePassword />
      {/* delete Account */}
      <DeleteAccount />
    </main>
  )
}

export default page