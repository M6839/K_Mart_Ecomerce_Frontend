'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import Link from "next/link";
import { API_URL } from "@/data/apiPath";
export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "",role:"user"});
  const router = useRouter();

  const submit = async () => {
    try {
      const res = await axios.post(`${API_URL}/register`,form);
      
      if (res.status === 201) {
         alert('user registered successfully')
        router.push("/Login");
      }
    } catch (err) {
      alert("User already exists");
      console.log('Registration error:', err);
    }
  };

  return (
    <div className="flex flex-col  border-t-[1px] border-black bg-white min-h-screen">
      <h1 className="text-blue-600 font-bold text-2xl md:text-3xl text-center mb-4 mt-10">Create an account</h1>
      <div className="p-4 flex flex-col gap-4 border border-black rounded-[10px] md:w-[400px] mx-auto">
        <input 
          placeholder="Username" 
          className="h-[40px] border border-black rounded-[10px] px-4" 
          onChange={e => setForm({ ...form, username: e.target.value })} 
        />
        <input 
          placeholder="Email" 
          className="h-[40px] border border-black rounded-[10px] px-4" 
          onChange={e => setForm({ ...form, email: e.target.value })} 
        />
        <input 
          placeholder="Password" 
          className="h-[40px] border border-black rounded-[10px] px-4" 
          type="password" 
          onChange={e => setForm({ ...form, password: e.target.value })} 
        />
        <select
  onChange={e => setForm({ ...form, role: e.target.value })} 
  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
>
  <option value="">-- Select Role --</option>
  <option value="user">User</option>
  <option value="admin">Admin</option>
</select>
        <p>You already have an account? Please login <Link href="/Login" className="text-blue-600 underline">here</Link></p>
        <button 
          className="bg-blue-600 rounded-[10px] px-4 h-[40px] text-white" 
          onClick={submit}
        >
          Register
        </button>
      </div>
    </div>
  );
}