"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner'
import { myInstance } from '@/utils/Axios/axios'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { z } from 'zod';

const registerSchema = z.object(
  {
    email : z.string().email(),
    password : z
    .string()
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter") 
    .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword : z
    .string()
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter") 
    .regex(/[0-9]/, "Password must contain at least one number") 
    
  }
)

const Registerform = () => {

    const [formData, setFormData] = useState({
      email : "",
      password : "",
      confirmPassword : ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

    const router = useRouter();

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

    const handleBack = () => {
        router.push('/login');
      };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.id] : e.target.value
      }
      )

    };

    const handleRegister = async () => {      

        setIsLoading(true);

        if(!(formData.password === formData.confirmPassword)){
          setTimeout(() => {
            setIsLoading(false); 
          }, 1500);
           toast.error("Passwords don't match");
            return;
        }
        
        const registerDetails = registerSchema.safeParse(formData);

        if(!registerDetails.success){
          setIsLoading(false);
          toast.error(registerDetails.error.errors.map((e) => e.message).join(", "));
          return;
        }

        try{
            
            const response = await myInstance.post('/auth/register',registerDetails.data, {
            withCredentials : true
          });
            if (!response){
                setIsLoading(false);
                toast.error("Unable to register. Try Later.")
            }else{
                setIsLoading(false);
                router.push('/login');
            }
        } catch (error) {
            setIsLoading(false);
            toast.error("There was an error");
            console.log("error");
        }
      }
             
    

  return (
    
    <div className="flex justify-center items-center h-screen overflow-hidden">
    <form
    onSubmit={handleRegister}
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
        onChange={ handleChange }
       />
      
    </div>

    <div className= "mb-4" >
    <label htmlFor="password" className="block text-gray-700">
     Password
    </label>
      <div className="relative mt-2">
       <input
        id="password"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F4F4F] pr-10"
        value={formData.password}
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
 <div className="mb-4">
    <label htmlFor="password" className="block text-gray-700">
    Confirm Password
    </label>
    <div className="relative mt-2">
      <input
      id="confirmPassword"
      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F4F4F] pr-10"
      value={formData.confirmPassword}
      onChange={handleChange}
      type={isVisible ? "text" : "password"}
      />
     <button
      className="absolute inset-y-0 right-3 flex items-center"
      type="button"
      onClick={toggleConfirmVisibility}
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
      {isLoading ? "Registering..." : "Register"}
    </button>

    <hr className="my-4 " />

    <button
      type="button"
      onClick={handleBack}
      className="w-full bg-[#2F4F4F] font-medium text-white p-2 mt-1.5 rounded-md hover:bg-cyan-700 transition"
    >
      Back
    </button>
  </form>
</div>


 
  )
};

export default Registerform;