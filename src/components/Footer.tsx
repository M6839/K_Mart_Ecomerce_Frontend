'use client';
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';
const Footer = () => {
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
    <div className='bg-gray-400 h-full md:h-[300px] px-2 md:px-8'>
    <div className='flex items-center justify-evenly gap-4 md:gap-16 pt-8 md:pt-16'>
      <div className='text-[23px] md:text-[32px] font-bold'>
           <Link href='/'> K-MART</Link>
           
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 space-y-4 space-x-8'>
            {
                category.map((item,index)=>(
                    <h1  key={index} className='' onClick={()=>handleProducts(item.categoryLink)}>
                        {item.name}
                     </h1>
                ))
            }

        </div>
    </div>
     <p className='text-right'>@Copy Rights 2025</p>
</div>
  )
}

export default Footer