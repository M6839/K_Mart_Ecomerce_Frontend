import AdminProducts from '@/components/AllProductsOfUser'
import DashboardSidebar from '@/components/DashboardSidebar'
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
        <DashboardSidebar/>
        <AdminProducts/>
    </div>
  )
}

export default page