
'use client';
import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from '@/context/ProductsProvider';
import Image from 'next/image';
import { API_URL } from '@/data/apiPath';
interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string[];
  image: string;
}
interface CartItem {
  product: Product;
  quantity: number;
}

const CartItems = () => {
  const {token}=useContext(ProductContext);
  const [userCart, setUserCart] = useState<(Product & { quantity: number })[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [shippingAddress,setShippingAddresss]=useState<string>('');


  useEffect(() => {
  const fetchCart = async () => {
    try {
      const res = await fetch(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.items && Array.isArray(data.items)) {
        const fullCart = data.items.map((item:CartItem) => ({
          ...item.product,
          quantity: item.quantity,
        }));
        setUserCart(fullCart);
      } else {
        setUserCart([]);
      }
    } catch (err) {
      console.error("Cart fetch failed", err);
      setUserCart([]);
    }
  };

  fetchCart();
}, [token]);



  useEffect(() => {
    const totalPrice = userCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(totalPrice);
  }, [userCart]);

const handleIncrement = async (productId: string) => {
  try {
    const res = await fetch(`${API_URL}/cart/update/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ action: "increment" }),
    });

    const data = await res.json();
    if (res.ok) {
      setUserCart(data.cart.items); // Or refresh fetchCart
    } else {
      alert(data.error || "Failed to increment item");
    }
  } catch (err) {
    console.error("Increment failed:", err);
  }
};
const handleDecrement = async (productId: string) => {
  try {
    const res = await fetch(`${API_URL}/cart/update/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ action: "decrement" }),
    });

    const data = await res.json();
    if (res.ok) {
      setUserCart(data.cart.items); 
    } else {
      alert(data.error || "Failed to decrement item");
    }
  } catch (err) {
    console.error("Decrement failed:", err);
  }
};

  
  const handleRemove = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/cart/item/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setUserCart(prev => prev.filter(item => item._id !== id));
    } else {
      const data = await res.json();
      alert(data.message || "Failed to remove item");
    }
  } catch (err) {
    console.error("Remove failed:", err);
  }
};
const placeOrder = async () => {
  if (shippingAddress === '') {
    alert('Please enter address');
    return;
  }

  try {
    const res = await fetch(`${API_URL}/order/place`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ shippingAddress }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    alert('Order placed successfully!');
    setUserCart([]);
    setShippingAddresss('');
  } catch (err) {
    alert('Order failed');
    console.error(err);
  }
};


  return (
    <div className='bg-white min-h-screen border-t-[1px] border-black px-2 md:px-8 py-6'>
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {userCart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          {userCart.map((item) => (
            <div key={item._id} className="flex justify-between items-center mb-4 p-4 border rounded shadow">
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p>Price: ₹{item.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => handleDecrement(item._id)} className="px-2 bg-gray-300 rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item._id)} className="px-2 bg-gray-300 rounded">+</button>
                  <button onClick={() => handleRemove(item._id)} className="ml-4 text-red-500">Remove</button>
                </div>
              </div>
              <Image src={`${API_URL}/uploads/${item.image}`} alt={item.title} width={100} height={100} className="object-contain" />
            </div>
          ))}
          <div className='mb-4'>
            shipping address:
            <input type='text' placeholder='Enter Your address' className='px-2 h-[40px] md:w-[500px] rounded-[10px] border border-black' onChange={(e)=>setShippingAddresss(e.target.value)}/>
          </div>
          <div className='flex justify-between items-center px-8'>
            <button className='bg-blue-600 h-[45px] rounded-[10px] px-2 text-white' onClick={placeOrder}>Place Order</button>
            <div className="text-right font-bold text-xl">
            Total: ₹{total.toFixed(2)}
          </div>
          </div>
          
        </>
      )}
    </div>
  );
};

export default CartItems;
