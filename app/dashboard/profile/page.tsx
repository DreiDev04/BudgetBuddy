
import React from 'react'
import UpdateProfile from '@/components/custom/UpdateProfile'
import UpdatePassword from '@/components/custom/UpdatePassword'
import DeleteAccount from '@/components/custom/DeleteAccount'



const page = () => {
  return (
    <div className="flex flex-col items-center gap-6">
    {/* user profile section */}
    <UpdateProfile />

    {/* password section */}
    <UpdatePassword />
    {/* delete Account */}
    <DeleteAccount />

</div>

  )
}

export default page