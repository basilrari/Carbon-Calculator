"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner'
import { myInstance } from '@/utils/Axios/axios'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { z } from 'zod';
import axios from 'axios';

const loginSchema = z.object(
  {
    email : z.string().email(),
    password : z
    .string()
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter") 
    .regex(/[0-9]/, "Password must contain at least one number") 
    
  }
)


const Loginform = () => {
    const [formData, setFormData] = useState(
      {
        email : "",
        password : "",
      }
    );
    const [isLoading, setIsLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false);

    const router = useRouter();

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleRegister = () => {
        router.push('/register');
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); 
        
        setIsLoading(true);
        const loginDetails = loginSchema.safeParse(formData);

        if(!loginDetails.success){
          setIsLoading(false);
          toast.error(loginDetails.error.errors.map((e) => e.message).join(", "));
          return
        }
        
         
        try {
            const response = await myInstance.post('/auth/login', loginDetails.data , {
                withCredentials: true 
            });
            if (response.status === 200) {
                toast.success("Login successful!");
                router.push('/dashboard');
            }
        } catch (error: unknown) {
          // 1. Check if it’s a ZodError
          if (error instanceof z.ZodError) {
            const messages = error.errors.map((e) => e.message).join(", ");
            toast.error(messages);
            console.error("Validation Errors:", error.errors);
        
            return;
          }
        
          // 2. Check if it’s an AxiosError
          if (axios.isAxiosError(error)) {
            // Here TypeScript will narrow `error` to `AxiosError`
            if (error.response) {
              // The server responded with a status code outside the 2xx range
              // Safely access the message in response data
              const serverMessage = (error.response.data as { message?: string })?.message;
              toast.error(serverMessage || "Invalid credentials");
            } else if (error.request) {
              // The request was made but no response was received
              toast.error("No response from server");
            } else {
              // Something else happened while setting up the request
              toast.error("An unexpected error occurred");
            }
        
            console.error("Axios error:", error);
            return;
          }
        
          // 3. Otherwise, it’s some other (non-Axios, non-Zod) error
          toast.error("An unexpected error occurred");
          console.error("Unknown error:", error);
        } finally {
          setIsLoading(false);
        }
    }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    }
    )   
  }          
    
  return (
    
    <div className="flex justify-center items-center h-screen overflow-hidden">
    <form
    onSubmit={handleLogin}
    className="border bg-white bg-opacity-70 p-6 rounded-lg shadow-md w-80"
    >
    <h2 className="text-2xl font-bold text-gray-800 mb-7 mt-5 text-center">
      Login
    </h2>

    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700">
        Email
      </label>
      <input
        type="email"
        id="email"
        className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F4F4F]"
        value={ formData.email }
        onChange={ handleChange }
       
      />
    </div>

    <div className="mb-4">
    <label htmlFor="password" className="block text-gray-700">
    Password
    </label>
    <div className="relative mt-2">
      <input
      id="password"
      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F4F4F] pr-10"
      value={ formData.password }
      onChange={ handleChange }
      type={isVisible ? "text" : "password"}
      />
     <button
      className="absolute inset-y-0 right-3 flex items-center"
      type="button"
      onClick={toggleVisibility}
      aria-label="toggle password visibility"
      >
      {isVisible ? (
        <IoMdEye className="text-xl text-gray-400" />
      ) : (
        <IoMdEyeOff className="text-xl text-gray-400" />
      )}
      </button>
  </div>
</div>


    <button
      type="submit"
      className="w-full bg-[#2F4F4F] font-medium text-white p-2 mt-6 rounded-md hover:bg-cyan-700 transition"
    >
      {isLoading ? "Logging in..." : "Login"}
    </button>

    <hr className="my-4 " />

    <button
      type="button"
      onClick={handleRegister}
      className="w-full bg-[#2F4F4F] font-medium text-white p-2 mt-1.5 rounded-md hover:bg-cyan-700 transition"
    >
      Register
    </button>
  </form>
</div>


 
  )
};

export default Loginform;