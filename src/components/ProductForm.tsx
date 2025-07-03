
'use client';
import React, { useState, useContext } from 'react';
import { API_URL } from '@/data/apiPath';
import { ProductContext } from '@/context/ProductsProvider';

const ProductForm = () => {
  const { token } = useContext(ProductContext);
  
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: null as File | null,
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0] || null;
    setProduct({ ...product, image: selectedImage });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("category", product.category);
    if (product.image) {
      formData.append("image", product.image);
    }

    try {
      const response = await fetch(`${API_URL}/product/add-product`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Don't set Content-Type manually
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Failed to add product');
        return;
      }

      alert('Product added successfully!');
      // Optionally reset form here
      setProduct({
        title: '',
        price: '',
        description: '',
        category: '',
        image: null
      });
    } catch (err) {
      console.error("Error uploading product:", err);
      alert("Something went wrong");
    }
  };

  const options = [
    '-select option',
    'Kitchen',
    'Men Fashion',
    'Woman Fashion',
    'Electronics',
    'Mobiles',
    'Watches',
    'Books',
    'TVs',
    'Furniture',
  ];

  return (
    <div className='flex flex-col justify-center mx-auto'>
      <h1 className='text-2xl font-bold text-center'>Add Product</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4  border border-black rounded-[10px] w-[600px] mx-auto p-4' >
        <label className='flex flex-col gap-2'>
          Title
          <input
            type='text'
            value={product.title}
            placeholder='Enter product name'
            className='border border-black px-2 rounded-[10px] h-[40px]'
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
          />
        </label>

        <label className='flex flex-col gap-2'>
          Price
          <input
            type='number'
            value={product.price}
            placeholder='Enter price'
            className='border border-black px-2 rounded-[10px] h-[40px]'
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </label>

        <label className='flex flex-col gap-2'>
          Description
          <input
            type='text'
            value={product.description}
            placeholder='Description'
            className='border border-black px-2 rounded-[10px] h-[40px]'
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </label>

        <label className='flex flex-col gap-2'>
          Select Category
          <select
            className='border border-black h-[40px] rounded-[10px]'
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
          >
            {options.map((option, index) => (
              <option key={index} value={option === '-select option' ? '' : option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className='flex flex-col gap-2'>
          Image
          <input
            type='file'
            className='border border-black px-2 rounded-[10px] h-[40px]'
            accept='image/*'
            onChange={handleImageUpload}
          />
        </label>

        <button type='submit' className='bg-blue-500 h-[40px] rounded-[10px] px-2 text-white'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
