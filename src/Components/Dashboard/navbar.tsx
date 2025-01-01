"use client"
import React, { useState } from 'react';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';


const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    
      <div
        className={`h-screen bg-[#2F4F4F] border-r overflow-hidden border-gray-200 p-4 transition-all duration-300 ${
          isCollapsed ? 'w-32' : 'w-64'
        }`}
      >
        
        <div className="flex  items-center justify-between mb-10">
          <div className="flex items-center">
            <Image
              src="/images/decarblogo.png"
              alt="Logo"
              width={64}
              height={64}
            />
            
              <h1 className={`text-3xl font-bold text-white  ${isCollapsed ? 'hidden' : ''}`}>Decarb</h1>
            
          </div>
          <button
            className="text-[#2F4F4F] bg-green-50 rounded-lg  p-1.5 border-b border-black -mr-4 "
            onClick={toggleSidebar} 
          >
            {isCollapsed ? <MdOutlineKeyboardArrowRight /> : <MdOutlineKeyboardArrowLeft />}
          </button>
        </div>
    
        
        <nav>
          <ul className="space-y-8">

            <li>
              <Link href="/decarb/dashboard"
                className="group flex items-center text-black cursor-pointer rounded-md p-2 pl-5 hover:bg-[#9BC3BF] active:bg-green-200">
                  <Image src="/images/overview.svg" alt="overview" height={32} width={32} />
                  <span
                    className={`pl-4 font-medium text-white text-lg ml-4 ${
                      isCollapsed ? 'hidden' : ''
                    }`}
                  >
                    Overview
                  </span>
              </Link>
            </li>

            <li>
              <Link href="/decarb/contracts"
                 className="group flex items-center text-black cursor-pointer rounded-md p-2 pl-5 hover:bg-[#9BC3BF] active:bg-green-200">
                  <Image src="/images/contracts.svg" alt="contracts" height={32} width={32} />
                  <span
                    className={`pl-4 font-medium text-white text-lg ml-4 ${
                      isCollapsed ? 'hidden' : ''
                    }`}
                  >
                    Contracts
                  </span>
                
              </Link>
            </li>

            <li>
              <Link href="/decarb/retirements"
                className="group flex items-center text-black cursor-pointer rounded-md p-2 pl-5 hover:bg-[#9BC3BF] active:bg-green-200">
                  <Image src="/images/retirements.svg" alt="retirements" height={32} width={32} />
                  <span
                    className={`pl-4 font-medium text-white text-lg ml-4 ${
                      isCollapsed ? 'hidden' : ''
                    }`}
                  >
                    Retirements
                  </span>
                
              </Link>
            </li>

            <li>
              <Link href="/decarb/wallet"
                className="group flex items-center text-black cursor-pointer rounded-md p-2 pl-5 hover:bg-[#9BC3BF] active:bg-green-200">
                  <Image src="/images/wallet.svg" alt="wallet" height={32} width={32} />
                  <span
                    className={`pl-4 font-medium text-white text-lg ml-4 ${
                      isCollapsed ? 'hidden' : ''
                    }`}
                  >
                    Wallet
                  </span>
                
              </Link>
            </li>

            <li>
              <Link href="/decarb/discover"
                className="group flex items-center text-black cursor-pointer rounded-md p-2 pl-5 hover:bg-[#9BC3BF] active:bg-green-200">
                  <Image src="/images/learnmore.svg" alt="learn more" height={32} width={32} />
                  <span
                    className={`pl-4 font-medium text-white text-lg ml-4 ${
                      isCollapsed ? 'hidden' : ''
                    }`}
                  >
                    Discover
                  </span>
                
              </Link>
            </li>
          </ul>

        <div className="absolute bottom-8 left-4">
          <Link href="/decarb/settings"
             className="flex items-center text-black cursor-pointer rounded-md p-2 pl-5 hover:bg-[#9BC3BF]">
              <Image src="/images/overview.svg" alt="settings" width={32} height={32} />
              <span
                className={`pl-4 font-medium text-white text-lg ml-4 ${
                  isCollapsed ? 'hidden' : ''
                }`}
              >
                Settings
              </span>
            
          </Link>
        </div>
      </nav>
  </div>
    );
  };
    

export default Sidebar;
