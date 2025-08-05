'use client';

import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { API_URL } from '@/data/apiPath';
 interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string[];
  image: string;
}
 interface CartItem{
    id:number;
    quantity:number;
  }
  interface User{
    username:string,
    email:string,
    role:string
  }
interface ProductContextType {
  products: Product[];
  cartItems:CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  token?:string,
  user?:User | null,
  loading:boolean,
  logout: () => void;
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  cartItems:[],
   setCartItems: () => {},
   token:undefined,
   user:{
    username:'',
    email:'',
    role:''
   },
   loading:true,
   logout:()=>{}
});



const ProductsProvider= ({ children}:{children:ReactNode}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems,setCartItems]=useState<CartItem[]>([]);
  const [token,setToken]=useState<string>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/product`);
      const data = await res.json();
      console.log('Fetched products data is:', data);
      setProducts(data.Allproducts); 
      setLoading(false)
    } catch (err) {
      console.error('Failed to fetch data', err);
    }
  };
  fetchData();
}, []);

  useEffect(()=>{
    const userToken=localStorage.getItem('token');
    if(userToken){
      setToken(userToken);
    }
    
  },[])

  return (
    <ProductContext.Provider value={{ products,setCartItems,cartItems,loading,token,user,logout}}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductsProvider;
