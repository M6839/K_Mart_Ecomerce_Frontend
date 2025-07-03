
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

const  Mobiles= () => {
  const [ mobiles, setMobiles] = useState<Product[]>([]);
  const { products } = useContext(ProductContext);
useEffect(()=>{
    console.log(products)
},[products])
  useEffect(() => {
  const filtered = products.filter((item) => 
    Array.isArray(item.category) && item.category.includes("Mobiles")
  );
  setMobiles(filtered);
}, [products]);
  return (
    <div className='bg-white'>
        <h1 className='text-black font-bold text-[23px] md:text-[28px] px-6'>Mobiles</h1>
      <CategoryItems data={mobiles} />
    </div>
  );
};

export default Mobiles;
