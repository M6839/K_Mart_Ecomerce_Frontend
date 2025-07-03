'use client'
import React from 'react'
import Image from 'next/image'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/data/apiPath';
interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string[];
  image: string;
}

const CategoryItems = ({ data }: { data: Product[] }) => {
    const scrollRef=useRef<HTMLDivElement>(null);
    const router=useRouter();
    const scroll=(direction:'left' | 'right')=>{
        if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
    }
    const handleProduct=(id:string)=>{
        router.push(`/Product/${id}`)
    }
  return (
    <div className='px-4'>
    <div className='relative w-full'>
        <div ref={scrollRef} className='flex space-x-8 overflow-x-auto scroll-smooth no-scrollbar bg-white py-4'>
            {
                data.map((item)=>(
                    <div key={item._id}   className="min-w-[300px]  rounded flex items-center justify-center text-white text-xl font-bold">
                        <div className='flex flex-col items-center'>
                            <Image src={`${API_URL}/uploads/${item.image}`} alt={item.image} width={700} height={250} className='w-[150px] h-[150px] md:w-[400px] md:h-[200px]'  onClick={()=>handleProduct(item._id)}/>
                            <p className='text-black text-[16px] md:text-[18px] text-normal'>{item.title}</p>
                            <p className='text-black'>Rs.{item.price}</p>
                        </div>
                    </div>
                ))
            }
        </div>
        <div className='absolute top-[120px] w-full flex justify-between'>
            <FaAngleLeft className='text-xl md:text-5xl  blackdrop-blur-lg bg-white/20 ' onClick={()=>scroll('left')}/>
            <FaAngleRight className='text-xl md:text-5xl   flex-end blackdrop-blur-lg bg-white/30' onClick={()=>scroll('right')}/>
        </div>
    </div>
    </div>
  )
}

export default CategoryItems