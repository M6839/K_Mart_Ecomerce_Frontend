
'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ProductContext } from '@/context/ProductsProvider';
import Image from 'next/image';
import CategoryItems from '@/components/CategoryItems';
import { API_URL } from '@/data/apiPath';
interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string[];
  image: string;
}

const ProductPage = () => {
  const { id } = useParams();
  const { products,token} = useContext(ProductContext);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (products.length > 0 && id) {
      const foundProduct = products.find(p => p._id === id);
      setProduct(foundProduct || null);
    }
  }, [products, id]);

  if (!product) {
    return <div className="p-4">Loading...</div>;
  }
const addToCart = async (productId: string, quantity: number = 1) => {
  if (!token) {
    alert("You must be logged in");
    return;
  }
  try {
    const res = await fetch(`${API_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to add to cart');
    alert('product added to cart successfully')
    console.log('Added to cart:', data);
  } catch (err) {
    alert('failed to add')
    console.error('Add to cart error:', err);
  }
};

  return (
    <>
    <div className="p-8 flex flex-col md:flex-row gap-6">
      <Image
        src={`${API_URL}/uploads/${product.image}`}
        alt={product.title}
        width={300}
        height={400}
        className="w-full md:w-1/3 h-[400px] object-contain bg-white p-4 rounded-xl shadow-md"
      />
      <div className="flex-1 space-y-4">
        <h2 className="text-3xl font-semibold">{product.title}</h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-xl font-bold text-green-600">₹{product.price}</p>
        {/* <p className="text-sm text-yellow-500">
          ⭐ {product.rating.rate} / 5 ({product.rating.count} reviews)
        </p> */}
        <p className="text-sm bg-blue-100 inline-block px-2 py-1 rounded-md">
          Category: {product.category}
        </p>
        <br/>
        <button className='h-[40px] bg-blue-600 px-2 rounded-[10px] text-white' onClick={()=>addToCart(product._id,1)}>Add to Cart</button>
      </div>
    </div>
    <CategoryItems
  data={products.filter(p => p.category.some(cat => product.category.includes(cat))
  )}
/>
    </>
  );
};

export default ProductPage;
