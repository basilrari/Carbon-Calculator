import Header from "@/components/landingpage/header";
import Registerform from "@/components/landingpage/register/registerform";

import React from 'react'

const RegisterPage = () => {
  return (
    <div className="flex flex-col bg-cover bg-center h-screen" style={{ backgroundImage: "url('/background.jpg')" }}>
        <Header/>
        <Registerform/>
    </div>

    
  )
}

export default RegisterPage;