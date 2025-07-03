import DashboardSidebar from '@/components/DashboardSidebar'
import ProductForm from '@/components/ProductForm'
import React from 'react'

const page = () => {
  return (
    <div className='flex'>
        <DashboardSidebar/>
        <ProductForm/>
    </div>
  )
}

export default page