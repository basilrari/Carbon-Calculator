import Header from "@/Components/landingpage/header";
import Loginform from "@/Components/landingpage/Login/loginform";


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