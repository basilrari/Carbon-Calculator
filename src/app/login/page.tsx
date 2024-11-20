import Header from "@/components/landingpage/header";
import Loginform from "@/components/landingpage/login/loginform";
import MyNavbar from "@/components/dashboard/navbar";

import React from 'react'

const loginpage = () => {
  return (
    <div className="flex flex-col bg-cover bg-center h-screen" style={{ backgroundImage: "url('/background.jpg')" }}>
        <Header/>
        <Loginform/>       
    </div>
   
  )
}

export default loginpage