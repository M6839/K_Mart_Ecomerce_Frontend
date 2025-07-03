
import AdminOrders from '@/components/AdminOrders'
import DashboardSidebar from '@/components/DashboardSidebar'
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
        <DashboardSidebar/>
        <AdminOrders/>
    </div>
  )
}

export default page