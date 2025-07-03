'use client'
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '@/context/ProductsProvider';
import { API_URL } from '@/data/apiPath';
import Image from 'next/image';
interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string[];
  image: string;
}
const AdminProducts = () => {
  const { token } = useContext(ProductContext);
  const [adminProducts, setAdminProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/product/all-products`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error('Error fetching products:', errorData);
          return;
        }

        const data = await res.json();
        console.log('Fetched products data is:', data);
        setAdminProducts(data.products); 

      } catch (err) {
        console.error('Fetch failed:', err);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);
  const handleDelete = async (productId: string) => {
  try {
    const res = await fetch(`${API_URL}/product/delete/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();

    if (res.ok) {
      alert('Product deleted successfully');
      setAdminProducts(prev => prev.filter(product => product._id !== productId));
    } else {
      alert(result.message || 'Failed to delete product');
    }
  } catch (error) {
    console.error('Delete failed', error);
    alert('Error deleting product');
  }
};


  return (
   <div className='mx-6 mt-4'>
        {!adminProducts ? (
            <p>No products added</p>
        ) : (
            <table className="border border-black w-[900px]">
                <thead>
                    <tr className='border border-black'>
                        <th className='py-4 px-8'>Product Name</th>
                        <th className='px-8'>Price</th>
                        <th className='px-8'>Image</th>
                        <th className='px-8'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {adminProducts.map((item)=>{
                            return (
                                <>
                                    <tr key={item._id} className='text-center border border-black'>
                                        <td className='py-8 px-10'>{item.title}</td>
                                        <td className='px-10'>₹{item.price}</td>
                                    <td>
                                        {item.image && (
                                            <Image src={`${API_URL}/uploads/${item.image}`} 
                                            alt={item.title}
                                            className='mx-auto'
                                            width={100}
                                            height={50}
                                            />
                                        )}
                                    </td>
                                    <td className='px-10'>
                                        <button className='h-[30px] text-white bg-red-600 rounded-[10px] px-2' onClick={()=>handleDelete(item._id)}>Delete</button>
                                    </td>
                                    </tr>
                                </>
                            )
                    })}
                </tbody>
            </table>
         )}
    </div>
  );
};

export default AdminProducts;
