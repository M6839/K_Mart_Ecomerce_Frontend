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

const Electronics= () => {
  const [electronics, setElectronics] = useState<Product[]>([]);
  const { products } = useContext(ProductContext);

  useEffect(() => {
    const filtered = products.filter((item) => item.category.includes('Electronics'));
   setElectronics(filtered);
  }, [products]);

  return (
    <div className='bg-white'>
        <h1 className='text-black font-bold text-[23px] md:text-[28px] px-6'>Electronics</h1>
      <CategoryItems data={electronics} />
    </div>
  );
};

export default Electronics;
