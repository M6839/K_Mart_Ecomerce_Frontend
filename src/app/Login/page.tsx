'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "@/data/apiPath";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();
  const submit = async () => {
    try {
      const res = await axios.post(`${API_URL}/login`,form);
      
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token); // Store token
        localStorage.setItem('user', JSON.stringify(res.data.user)); // Store user data
        alert('login successfully')
        if(res.data.user.role==='user'){
          router.push("/");
        }
        else{
          router.push('/Admin')
        }
        
      }
    } catch (err) {
      alert('Invalid credentials');
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex flex-col  border-t-[1px] border-black bg-white min-h-screen">
      <h1 className="text-blue-600 font-bold text-2xl md:text-3xl text-center mb-4 mt-10">Login to your account</h1>
      <div className="p-4 flex flex-col gap-4 border border-black rounded-[10px] md:w-[400px] mx-auto">
        <input 
          placeholder="Email" 
          className="h-[40px] text-black border border-black rounded-[10px] px-4" 
          onChange={e => setForm({ ...form, email: e.target.value })} 
        />
        <input 
          placeholder="Password" 
          className="h-[40px] border text-black border-black rounded-[10px] px-4" 
          type="password" 
          onChange={e => setForm({ ...form, password: e.target.value })} 
        />
        <p className="text-black">You have no account? Please create <Link href="/Register" className="text-blue-600 underline">here</Link></p>
        <button 
          className="bg-blue-600 rounded-[10px] px-4 h-[40px] text-white" 
          onClick={submit}
        >
          Login
        </button>
      </div>
    </div>
  );
}