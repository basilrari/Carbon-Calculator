'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';  
  


const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 pt-4 text-black">
      <div className="flex items-center space-x-2">
        <Image src="/images/decarblogo.png" alt="Decarb Logo" className="h-16 w-16" /> 
        <h1 className="text-3xl font-bold">Decarb</h1>
      </div>

      <div className="flex justify-center flex-grow ml-auto"> 
        <nav className="space-x-24 flex text-lg font-semibold">
          <Link href="/about" className="hover:text-green-800">About</Link>
          <Link href="/resources" className="hover:text-green-800">Resources</Link>
          <Link href="/more" className="hover:text-green-800">More</Link>
        </nav>
      </div>
     

      <div className='pr-8'>
        <button        
          className="border-2 bg-green-50 hover:bg-gray-50 border-black text-black py-2 px-4 rounded text-lg font-semibold"
        >
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
