import Header from "@/Components/landingpage/header";
import Registerform from "@/Components/landingpage/Register/registerform";

import React from 'react'

const RegisterPage = () => {
  return (
    <div className="flex flex-col bg-cover bg-center h-screen" style={{ backgroundImage: "url('/images/background.jpg')" }}>
        <Header/>
        <Registerform/>
    </div>

    
  )
}

export default RegisterPage;