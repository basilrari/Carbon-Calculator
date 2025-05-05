"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdClose,
  MdMenu,
} from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Dashboard", href: "/decarb/dashboard", icon: "/images/dashboard.svg" },
  { label: "Buy-Sell", href: "/decarb/contracts", icon: "/images/buy-sellicon.svg" },
  { label: "Retire", href: "/decarb/retirements", icon: "/images/retirements.svg" },
  { label: "Transactions", href: "/decarb/transaction", icon: "/images/transaction.png" },
  { label: "Calculator", href: "/decarb/calculator", icon: "/images/calculator.svg" },
  { label: "Discover", href: "/decarb/discover", icon: "/images/discovericon.svg" },
  { label: "Logout", href: "/landing", icon: "/images/logout.svg" },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();

    // Clear all cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Redirect to landing page
    window.location.href = "/landing";
  };

  return (
    <>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-green-600 text-white p-2 rounded-lg"
        onClick={toggleMobileSidebar}
      >
        <MdMenu size={24} />
      </button>

      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex h-screen bg-[#F1F6F5] border-r border-gray-200 p-4 transition-all duration-300 ${
          isCollapsed ? "w-32" : "w-64"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and Collapse Toggle */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center">
              <Image src="/images/decarblogo.png" alt="Logo" width={64} height={64} />
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

          {/* Navigation */}
          <nav>
            <ul className="space-y-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`group flex items-center text-black rounded-md p-2 pl-5 hover:bg-[#9BC3BF] ${
                        isActive ? "bg-[#9BC3BF]" : ""
                      }`}
                      onClick={item.label === "Logout" ? handleLogout : undefined}
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
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 bg-[#F1F6F5] p-6 flex flex-col h-screen">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-black p-2 rounded-lg"
            onClick={toggleMobileSidebar}
          >
            <MdClose size={28} />
          </button>

          {/* Logo */}
          <div className="flex items-center mb-8">
            <Image src="/images/decarblogo.png" alt="Logo" width={64} height={64} />
            <h1 className="text-3xl font-bold text-[#2F4F4F] ml-2">Decarb</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`group flex items-center text-black rounded-md p-3 hover:bg-[#9BC3BF] ${
                        isActive ? "bg-[#9BC3BF]" : ""
                      }`}
                      onClick={() => {
                        toggleMobileSidebar();
                        if (item.label === "Logout") handleLogout();
                      }}
                    >
                      <Image src={item.icon} alt={item.label} width={32} height={32} />
                      <span className="font-semibold text-[#2F4F4F] text-lg ml-4">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Sidebar;
