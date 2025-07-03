import React from 'react'
import Link from 'next/link'
const DashboardSidebar = () => {
  return (
    <div>
        <div className='flex flex-col items-center gap-6 py-6 w-[300px] bg-blue-500 h-full min-h-screen'>
            <Link href={'/Admin/AddProduct'}><h1 className='text-white text-lg font-bold' >Add Product</h1></Link>
            <Link href={'/Admin/AllProducts'}> <h1 className='text-white text-lg font-bold'>All Products</h1></Link>
           <Link  href={'/Admin/Orders'}><h1 className='text-white text-lg font-bold'>Orders</h1></Link> 
        </div>
             
    </div>
  )
}

export default DashboardSidebar