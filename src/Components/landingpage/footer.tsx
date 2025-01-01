import React from 'react'
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#2F4F4F] text-white py-8">
    <div className="container mx-auto px-16 ">
  
      <div className="flex justify-between items-center border-b border-gray-300 pb-6 mb-6">
        
        <div className="flex items-center space-x-4">
          <Image src="/decarblogo.png" alt="Decarb Logo" className="h-16 w-16" />
          <h1 className="text-2xl font-bold">Decarb</h1>
        </div>

       
        <div className="flex space-x-12 text-lg">
          <Link href="/legal" className="hover:text-green-500">Legal</Link>
          <Link href="/community" className="hover:text-green-500">Community</Link>
          <Link href="/company" className="hover:text-green-500">Company</Link>
        </div>
      </div>

    
      <div className="flex justify-between items-center">
        
        <div className="text-sm ml-2">
          <p>Decarb 2024. All rights reserved.</p>
        </div>

      
        <div className="flex space-x-4 text-xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600">
            <FaFacebook />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-700">
            <FaLinkedin />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer;