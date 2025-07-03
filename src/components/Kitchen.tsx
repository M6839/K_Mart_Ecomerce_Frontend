
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

const Jewelery= () => {
  const [kitchen, setKitchen] = useState<Product[]>([]);
  const { products } = useContext(ProductContext);

  useEffect(() => {
    const filtered = products.filter((item) => item.category.includes('Kitchen'));
   setKitchen(filtered);
  }, [products]);

  return (
    <div className='bg-white'>
        <h1 className='text-black font-bold text-[23px] md:text-[28px] px-6'>Kitchen Items</h1>
      <CategoryItems data={kitchen} />
    </div>
  );
};

export default Jewelery;
