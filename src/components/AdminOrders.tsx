'use client';
import { ProductContext } from "@/context/ProductsProvider";
import { API_URL } from "@/data/apiPath";
import { useEffect, useState, useContext } from "react";
import React from 'react';
import Image from "next/image";
interface Product {
  _id: string;
  title: string;
  image: string;
}

interface OrderItem {
  _id: string;
  quantity: number;
  product: Product;
}

interface User {
  _id: string;
  email: string;
}

interface Order {
  _id: string;
  user: User;
  items: OrderItem[];
  shippingAddress: string;
  status: 'Pending' | 'Shipped' | 'Delivered'; // optional strict enum
  createdAt: string;
}

const AdminOrders = () => {
  const { token } = useContext(ProductContext);
  const [adminOrders, setAdminOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/order/admin-orders`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error('Error fetching orders:', errorData);
          return;
        }

        const data = await res.json();
        console.log('Fetched admin orders data is:', data);
        setAdminOrders(data.orders);  
      } catch (err) {
        console.error('Fetch failed:', err);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    <div className='px-4 py-6'>
      <h2 className="text-2xl font-bold mb-4">Orders for Your Products</h2>
      {adminOrders.length === 0 ? (
        <p>No orders for your products.</p>
      ) : (
        <table className="w-full border border-black">
          <thead className="bg-gray-200">
            <tr>
              <th className='py-2 px-4 border'>Product Name</th>
              <th className='px-4 border'>Quantity</th>
              <th className='px-4 border'>Image</th>
              <th className='px-4 border'>Shipping Address</th>
              <th className='px-4 border'>Ordered By</th>
            </tr>
          </thead>
          <tbody>
            {adminOrders.map((order) =>
              order.items.map((item: OrderItem) => (
                <tr key={item._id} className="text-center border-t">
                  <td className="py-2 px-4 border">{item.product.title}</td>
                  <td className="px-4 border">{item.quantity}</td>
                  <td className="px-4 border">
                    {item.product.image && (
                      <Image
                        src={`${API_URL}/uploads/${item.product.image}`}
                        alt={item.product.title}
                        width={80}
                        height={50}
                        className="mx-auto object-contain"
                      />
                    )}
                  </td>
                  <td className="px-4 border">{order.shippingAddress}</td>
                  <td className="px-4 border">{order.user?.email || "Unknown"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrders;
