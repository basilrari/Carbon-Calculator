"use client";
import React, { useState } from "react";
import { redirect, usePathname } from "next/navigation"; 
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { WALLET_ADAPTERS, CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { chainConfig } from "@/utils/Config/chainConfig";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

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
    label: "Calculator",
    href: "/decarb/calculator",
    icon: "/images/wallet.svg",
  },
  {
    label: "Discover",
    href: "/decarb/learnmore",
    icon: "/images/learnmore.svg",
  },
];

const Sidebar = () => {
  
  const [isCollapsed, setIsCollapsed] = useState(false);

  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
  });

  const handleLogout = async () => {
    try {
      const web3auth = new Web3Auth({
        clientId: "BPI5cUhq659hPghmNobHZT8c52Mpb4mlSrTTGIKWCw_nSUk1Wt5lEeBU6cLfgex0vpE57SfMy_F4vpWihcm7uOw", 
        web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
        privateKeyProvider,
      });
      await web3auth.logout();
      console.log("Logged out successfully");
      redirect("/landing")
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div
      className={`h-screen bg-[#F1F6F5] border-r overflow-hidden border-gray-200 p-4 transition-all duration-300 ${
        isCollapsed ? "w-32" : "w-64"
      }`}
    >

      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center">
          <div className="h-14 w-14 flex items-center justify-center ">
            <Image src="/images/decarblogo.png" alt="Logo" width={64} height={64} />
          </div>
          <h1
            className={`text-3xl font-bold text-[#2F4F4F] ml-2 ${
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
                              hover:bg-[#9BC3BF] active:bg-green-200
                              ${
                                isActive
                                  ? "bg-[#9BC3BF]" 
                                  : ""
                              }`}
                >
                  <Image src={item.icon} alt={item.label} width={32} height={32} />
                  <span
                    className={`font-semibold text-[#2F4F4F] text-lg ml-4 ${
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
            <button
              onClick={handleLogout}
              className={"flex items-center text-black cursor-pointer rounded-md p-2 pl-5 w-5/6 hover:bg-[#9BC3BF]"}>
              <Image src="/images/overview.svg" alt="settings" width={32} height={32} />
              <span
                className={` font-semibold text-[#] text-lg ml-4  ${
                  isCollapsed ? "hidden" : ""
                }`}
              >
                Logout
              </span>
            </button>
          </div>

      </nav>
    </div>
  );
};

export default Sidebar;
