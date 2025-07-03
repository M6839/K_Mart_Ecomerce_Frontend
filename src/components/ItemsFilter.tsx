'use client'
import React, { useState } from 'react'
import { LuMenu } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { useRouter } from 'next/navigation';
const ItemsFilter = () => {
  const [openMenu,setOpenMenu]=useState(false);
  const router=useRouter();
    const category=[
      {
        name:'Watches',
        categoryLink:'Watches'
      },
       {
        name:'Books',
        categoryLink:'Books'
      },
       {
        name:'Mobiles',
        categoryLink:'Mobiles'
      },
       {
        name:'Men Fashion',
        categoryLink:"Men Fashion"
      },
       {
        name:"Women Fashion",
        categoryLink:"Woman Fashion"
      },
      {
        name:'Electronics',
        categoryLink:'Electronics'
      },
      {
        name:'Kitchen',
        categoryLink:'Kitchen'
      },
      {
        name:'TVs',
        categoryLink:'TVs'
        
      }
    ]
    const handleProducts=(categoryname:string)=>{
        router.push(`/CategoryItems/${categoryname}`)
    }
  return (
    <div className=''>
      <div className='hidden md:flex justify-between bg-gray-400 text-white px-6 py-2'>
        {
            category.map((item,index)=>(
                
                   <h3 key={index} onClick={()=>handleProducts(item.categoryLink)} className='cursor-pointer'>{item.name}</h3>
            ))
        }
        </div>
        <div className='flex items-center justify-between bg-gray-400 px-2'>
       <p className='md:hidden flex items-center gap-2  mb-4' onClick={()=>setOpenMenu(true)}><LuMenu/> All</p>
       { openMenu && <IoClose onClick={()=>setOpenMenu(false)} className='md:hidden'/>}
        </div>
      { openMenu && <div className='md:hidden absolute flex flex-col gap-4 px-4 w-full bg-gray-400 z-20'>
         {
            category.map((item,index)=>(
               
                   <h3 key={index} onClick={()=>handleProducts(item.categoryLink)} className='cursor-pointer'>{item.name}</h3>
        
            ))
        }
        </div>
}
    </div>
  )
}

export default ItemsFilter