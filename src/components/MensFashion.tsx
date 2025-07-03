
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

const  MensFashion= () => {
  const [ mensFashion, setMensFashion] = useState<Product[]>([]);
  const { products } = useContext(ProductContext);

  useEffect(() => {
    const filtered = products.filter((item) => item.category.includes('Men Fashion'));
   setMensFashion(filtered);
  }, [products]);

  return (
    <div className='bg-white'>
        <h1 className='text-black font-bold text-[23px] md:text-[28px] px-6'>Mens Fashion</h1>
      <CategoryItems data={mensFashion} />
    </div>
  );
};

export default MensFashion;
