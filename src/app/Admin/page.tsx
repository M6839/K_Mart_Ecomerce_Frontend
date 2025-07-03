
import DashboardSidebar from '@/components/DashboardSidebar'
import React from 'react'

const page = () => {
  return (
    <div>
      <div className='flex'>
      <DashboardSidebar/>
      <h1 className='text-3xl font-bold mx-auto my-auto mt-[90px]'>Welcome to Admin Dashboard</h1>
     </div>
    </div>
  )
}

export default page