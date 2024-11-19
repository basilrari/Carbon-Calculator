"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import emailValidator from '@/utils/Validator/emailvalidator';
import { toast } from 'sonner'
import { myInstance } from '@/utils/Axios/axios'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Registerform = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false);

    const router = useRouter();

    const toggleVisibility = () => setIsVisible(!isVisible)

    const handleBack = () => {
        router.push('/login');
      };
    

    const handleRegister = async () => {      

        setIsLoading(true);

        if(!(password === confirmPassword)){
            setIsLoading(false);
            console.log("Password doesn't match");
            toast.error("Passwords don't match");
            return;
        }



        let response;
        if(!emailValidator(email)){
            console.log("Email is invalid")
            toast.error("Invalid email");
            setIsLoading(false);
            return;
        }

        try{
                response = await myInstance.post('/login',{
                email: email,
                password: password,
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
        type="text"
        id="username"
        className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F4F4F]"
        onChange={(e) => setEmail(e.target.value)}
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
      id="password"
      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2F4F4F] pr-10"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
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


 
  );
};

export default Registerform;