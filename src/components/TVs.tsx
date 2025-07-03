
'use client';
import React, { useEffect, useState, useContext } from 'react';
import CategoryItems from './CategoryItems';
import { ProductContext } from '@/context/ProductsProvider';

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string[];
  image: string;
}

const  TVs= () => {
  const [ tvs, setTvs] = useState<Product[]>([]);
  const { products } = useContext(ProductContext);
useEffect(()=>{
    console.log(products)
},[products])
  useEffect(() => {
  const filtered = products.filter((item) => 
    Array.isArray(item.category) && item.category.includes("TVs")
  );
  setTvs(filtered);
}, [products]);
  return (
    <div className='bg-white'>
        <h1 className='text-black font-bold text-[23px] md:text-[28px] px-6'>TV&apos;s</h1>
      <CategoryItems data={tvs} />
    </div>
  );
};

export default TVs;
