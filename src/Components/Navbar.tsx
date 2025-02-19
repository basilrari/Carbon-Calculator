"use client";
import React, { useState } from "react";
import { redirect, usePathname } from "next/navigation";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import {
  WALLET_ADAPTERS,
  CHAIN_NAMESPACES,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { chainConfig } from "@/utils/Config/chainConfig";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/decarb/dashboard",
    icon: "/images/dashboard.svg",
  },
  {
    label: "Buy-Sell",
    href: "/decarb/contracts",
    icon: "/images/buy-sellicon.svg",
  },
  {
    label: "Retire",
    href: "/decarb/retirements",
    icon: "/images/retirements.svg",
  },
  {
    label: "Transactions",
    href: "/decarb/transaction",
    icon: "/images/transaction.png",
  },
  {
    label: "Calculator",
    href: "/decarb/calculator",
    icon: "/images/calculator.svg",
  },
  {
    label: "Discover",
    href: "/decarb/discover",
    icon: "/images/discovericon.svg",
  },
  {
    label: "Logout",
    href: "/landing",
    icon: "/images/logout.svg",
  },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(false); // State for handling logout loading
  const pathname = usePathname();
  const router = useRouter();

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
  });

  const handleLogout = async () => {
    try {
      setLoading(true); // Start showing loading screen
      // Initialize Web3Auth
      const web3auth = new Web3Auth({
        clientId:
          "BPI5cUhq659hPghmNobHZT8c52Mpb4mlSrTTGIKWCw_nSUk1Wt5lEeBU6cLfgex0vpE57SfMy_F4vpWihcm7uOw",
        web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
        privateKeyProvider,
      });

      // Initialize Web3Auth (this should be done once when the component mounts)
      await web3auth.initModal();

      // Check if user is logged in
      const isLoggedIn = web3auth.status === "connected" || !!web3auth.provider;

      if (!isLoggedIn) {
        console.log("User is not logged in");
        redirect("/landing");
        return;
      }
      // Perform logout
      await web3auth.logout();
      console.log("Logged out successfully");

      // Remove specific items from local storage
      localStorage.removeItem("walletAddress");
      localStorage.removeItem("encryptedPrivateKey");

      // Store a flag for showing the toast after navigation
      localStorage.setItem("showLogoutToast", "true");

      // Simulate a delay before navigating
      setTimeout(() => {
        setLoading(false);
        router.push("/landing");
      }, 7000); // 7 seconds delay
    } catch (error) {
      console.error("Logout failed", error);
      setLoading(false); // Stop loading in case of an error
    }
  };

  return (
    <>
      {/* Sidebar Component */}
      <div
        className={`h-screen bg-[#F1F6F5] border-r overflow-hidden border-gray-200 p-4 transition-all duration-300 ${
          isCollapsed ? "w-32" : "w-64"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Top section with logo and main navigation */}
          <div>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center">
                <div className="h-14 w-14 flex items-center justify-center">
                  <Image
                    src="/images/decarblogo.png"
                    alt="Logo"
                    width={64}
                    height={64}
                  />
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
                {isCollapsed ? (
                  <MdOutlineKeyboardArrowRight />
                ) : (
                  <MdOutlineKeyboardArrowLeft />
                )}
              </button>
            </div>

            <nav>
              <ul className="space-y-8">
                {navItems.map((item) => {
                  const isActive =
                    pathname === item.href || pathname.startsWith(item.href);
                  const isLogout = item.label === "Logout";

                  if (isLogout) return null; // Skip logout in top section

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`group flex items-center text-black cursor-pointer rounded-md p-2 pl-5 
                                hover:bg-[#9BC3BF] active:bg-green-200
                                ${isActive ? "bg-[#9BC3BF]" : ""}`}
                      >
                        <Image
                          src={item.icon}
                          alt={item.label}
                          width={32}
                          height={32}
                        />
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
            </nav>
          </div>

          {/* Bottom section with logout */}
          <div className="mt-auto">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href);
              const isLogout = item.label === "Logout";

              if (!isLogout) return null; // Only render logout here

              return (
                <div key={item.href}>
                  <button
                    onClick={handleLogout}
                    className={`group flex items-center text-black cursor-pointer rounded-md p-2 pl-5 
                            hover:bg-[#9BC3BF] active:bg-green-200 w-full text-left
                            ${isActive ? "bg-[#9BC3BF]" : ""}`}
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={32}
                      height={32}
                    />
                    <span
                      className={`font-semibold text-[#2F4F4F] text-lg ml-4 ${
                        isCollapsed ? "hidden" : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Loading Overlay when logging out */}
      {loading && (
        <div className="fixed inset-0 z-[9999] w-full h-full ">
          {/* Blurred overlay */}
          <div className="absolute inset-0 backdrop-blur-xl bg-white/50" />

          {/* Content container */}
          <div className="relative h-full flex items-center justify-center p-4">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-10 shadow-2xl max-w-md w-full border border-white/20">
              <div className="flex flex-col items-center space-y-8">
                {/* Main loading spinner */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-800/20 animate-pulse"></div>
                  <div className="relative w-20 h-20">
                    <Loader2 className="w-20 h-20 text-emerald-800 animate-spin" />
                  </div>
                </div>

                {/* Progress dots */}
                <div className="flex space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-emerald-800 animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>

                {/* Text content */}
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold text-emerald-900">
                    Logging Out
                  </h2>
                  <p className="text-emerald-700 font-medium">
                    Please wait a moment...
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-emerald-800 h-2 rounded-full transition-all duration-[5000ms] ease-linear"
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
