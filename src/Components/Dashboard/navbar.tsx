"use client"
import React, { useState } from 'react';
import { FiGrid, FiSettings } from 'react-icons/fi';
import { FaFileContract, FaWallet, FaBook } from 'react-icons/fa';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    
      <div
        className={`h-screen bg-green-50 border-r overflow-hidden border-gray-200 p-4 transition-all duration-300 ${
          isCollapsed ? 'w-32' : 'w-64'
        }`}
      >
        {/* Logo and Sidebar Toggle */}
        <div className="flex  items-center justify-between mb-10">
          <div className="flex items-center">
            <img
              src="/images/decarblogo.png"
              alt="Logo"
              className="w-16 h-16"
            />
            
              <h1 className={`text-3xl font-bold  ${isCollapsed ? 'hidden' : ''}`}>Decarb</h1>
            
          </div>
          <button
            className="text-[#2F4F4F] bg-white rounded-lg  p-1.5 border-b border-black -mr-4 "
            onClick={toggleSidebar}
          >
            {isCollapsed ? <MdOutlineKeyboardArrowRight /> : <MdOutlineKeyboardArrowLeft />}
          </button>
        </div>
    
        {/* Navigation */}
        <nav>
  <ul className="space-y-8">
    <li className="group flex items-center text-black cursor-pointer rounded-md p-2 pl-5 hover:bg-[#9BC3BF] active:bg-green-200">
      <img src="/images/overview.svg" alt="overview" className="h-8 w-8" />
      <span
        className={`pl-4 font-medium text-lg ml-4 ${isCollapsed ? 'hidden' : ''}`}
      >
        Overview
      </span>
    </li>
    <li className="group flex items-center text-black cursor-pointer rounded-md p-2 pl-5 hover:bg-[#9BC3BF] active:bg-green-200">
      <img src="/images/contracts.svg" alt="contracts" className="h-8 w-8" />
      <span
        className={`pl-4 font-medium text-lg ml-4 ${isCollapsed ? 'hidden' : ''}`}
      >
        Contracts
      </span>
    </li>
    <li className="group flex items-center text-black cursor-pointer rounded-md p-2 pl-5 hover:bg-[#9BC3BF] active:bg-green-200">
      <img src="/images/retirements.svg" alt="retirements" className="h-8 w-8" />
      <span
        className={`pl-4 font-medium text-lg ml-4 ${isCollapsed ? 'hidden' : ''}`}
      >
        Retirements
      </span>
    </li>
    <li className="group flex items-center text-black cursor-pointer rounded-md p-2 pl-5 hover:bg-[#9BC3BF] active:bg-green-200">
      <img src="/images/wallet.svg" alt="wallet" className="h-8 w-8" />
      <span
        className={`pl-4 font-medium text-lg ml-4 ${isCollapsed ? 'hidden' : ''}`}
      >
        Wallet
      </span>
    </li>
    <li className="group flex items-center text-black cursor-pointer rounded-md p-2 pl-5 hover:bg-[#9BC3BF] active:bg-green-200">
      <img src="/images/learnmore.svg" alt="learn more" className="h-8 w-8" />
      <span
        className={`pl-4 font-medium text-lg ml-4 ${isCollapsed ? 'hidden' : ''}`}
      >
        Discover
      </span>
    </li>
  </ul>
</nav>

{/* Settings Link */}
<div className="absolute bottom-8 left-4 flex items-center text-black cursor-pointer rounded-md p-2 pl-5 hover:bg-[#9BC3BF]">
  <img src="/images/overview.svg" alt="settings" className="h-8 w-8" />
  <span
    className={`pl-4 font-medium text-lg ml-4 ${isCollapsed ? 'hidden' : ''}`}
  >
    Settings
  </span>
</div>


     </div>
    );
  };
    

export default Sidebar;
