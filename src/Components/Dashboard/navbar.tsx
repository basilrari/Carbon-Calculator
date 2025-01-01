"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation"; 
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  {
    label: "Overview",
    href: "/decarb/dashboard",
    icon: "/images/overview.svg",
  },
  {
    label: "Contracts",
    href: "/decarb/contracts",
    icon: "/images/contracts.svg",
  },
  {
    label: "Retirements",
    href: "/decarb/retirements",
    icon: "/images/retirements.svg",
  },
  {
    label: "Wallet",
    href: "/decarb/wallet",
    icon: "/images/wallet.svg",
  },
  {
    label: "Discover",
    href: "/decarb/discover",
    icon: "/images/learnmore.svg",
  },
];

const Sidebar = () => {
  
  const [isCollapsed, setIsCollapsed] = useState(false);

  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`h-screen bg-[#2F4F4F] border-r overflow-hidden border-gray-200 p-4 transition-all duration-300 ${
        isCollapsed ? "w-32" : "w-64"
      }`}
    >

      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center">
          <div className="h-16 w-10 flex items-center justify-center rounded-full bg-white">
            <Image src="/images/decarblogo.png" alt="Logo" width={64} height={64} />
          </div>
          <h1
            className={`text-3xl font-bold text-white ml-2 ${
              isCollapsed ? "hidden" : ""
            }`}
          >
            Decarb
          </h1>
        </div>
        <button
          className="text-[#2F4F4F] bg-green-50 rounded-lg p-1.5 border-b border-black -mr-4"
          onClick={toggleSidebar}
        >
          {isCollapsed ? <MdOutlineKeyboardArrowRight /> : <MdOutlineKeyboardArrowLeft />}
        </button>
      </div>

      <nav>
        <ul className="space-y-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href); 
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group flex items-center text-black cursor-pointer rounded-md p-2 pl-5 
                              hover:bg-[#27605a] active:bg-green-200
                              ${
                                isActive
                                  ? "bg-[#9BC3BF]" 
                                  : ""
                              }`}
                >
                  <Image src={item.icon} alt={item.label} width={32} height={32} />
                  <span
                    className={`font-medium text-white text-lg ml-4 ${
                      isCollapsed ? "hidden" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="absolute bottom-8 left-4">
          <Link
            href="/decarb/settings"
            className={`flex items-center text-black cursor-pointer rounded-md p-2 pl-5 
                        hover:bg-[#27605a]
                        ${
                          pathname === "/decarb/settings"
                            ? "bg-[#9BC3BF]"
                            : ""
                        }`}
          >
            <Image src="/images/overview.svg" alt="settings" width={32} height={32} />
            <span
              className={`pl-4 font-medium text-white text-lg ml-4 ${
                isCollapsed ? "hidden" : ""
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
