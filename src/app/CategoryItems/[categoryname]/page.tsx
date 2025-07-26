
'use client';

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ProductContext } from '@/context/ProductsProvider';
import ItemsFilter from '@/components/ItemsFilter';
import { API_URL } from '@/data/apiPath';
interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string[];
  image: string;
}

const SingleCategoryItems = () => {
  const { categoryname } = useParams();
  const { products } = useContext(ProductContext);
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length && categoryname && typeof categoryname === 'string') {
      const decodedCategory = decodeURIComponent(categoryname)
      const filtered = products.filter(
        (item) => item.category.includes(decodedCategory)
      );
      setItems(filtered);
    }
  }, [products, categoryname]);

  const handleProduct = (id:string) => {
    window.location.href = `/Product/${id}`; 
  };

  return (
    <>
    <ItemsFilter/>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white text-black">
      {items.map((item) => (
        <div key={item._id} className="border p-2 shadow hover:shadow-lg rounded cursor-pointer">
          <Image
            src={`${API_URL}/uploads/${item.image}`}
            alt={item.title}
            width={200}
            height={150}
            className="w-full h-[150px] object-contain"
            onClick={() => handleProduct(item._id)}
          />
          <p className="text-sm mt-2 font-semibold">{item.title}</p>
          <p className="text-green-600 font-bold">₹{item.price}</p>
        </div>
      ))}
    </div>
    </>
  );
};

export default SingleCategoryItems;
