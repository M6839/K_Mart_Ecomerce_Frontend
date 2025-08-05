"use client";
import React, {  useState ,useContext} from 'react';
import Link from 'next/link';
import { FaRegUserCircle } from "react-icons/fa";
import { ProductContext } from '@/context/ProductsProvider';
const Navbar = () => {
  const {user,logout} =useContext(ProductContext);
  const [showLogOut,setShowLogOut]=useState(false);
  return (
    <div className='flex items-center text-black justify-between px-2 md:px-16 shadow-md py-4 bg-white'>
      <div>
        <Link href='/'>
          <h1 className='text-[20px] md:text-[32px] font-bold text-black'>K-MART</h1>
        </Link>
      </div>
      <div>
        <input
          type='search'
          placeholder='search...'
          className='hidden md:block px-4 h-[40px] border border-black text-black rounded-full'
        />
      </div>
      <div className='flex items-center justify-between gap-4'>
        {!user && (
          <Link href='/Login'>
            <h4 className='text-black'>Sign in</h4>
          </Link>
        )}
        
        {user && <h1 className='flex items-center text-black gap-2 text-xl cursor-pointer' onClick={()=>setShowLogOut(!showLogOut)}><FaRegUserCircle className='text-black'/>{user.username}</h1>}
        {showLogOut && <h1 className='text-red-500 cursor-pointer' onClick={logout}>Log Out</h1>}
        <Link href='/Cart'>
          <h4 className='text-black'>CART</h4>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
