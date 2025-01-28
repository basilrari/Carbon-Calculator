'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const getNavItems = () => {
    return [
      { href: "/landing#about", name: "About" },
      { href: "/landing#goals", name: "Goals" },
      { href: "/landing#services", name: "Services" },
    ];
  };

  const handleItemClick = (name: string) => {
    setActiveItem(name);
    setMenuOpen(false);
  };

  const renderNavItem = (item: { href: string, name: string }, isMobile = false) => {
    const isActive = activeItem === item.name;

    const linkClasses = `
      ${isMobile ? 'py-3 w-full text-center text-xl font-bold' : 'text-xl font-bold'}
      ${isActive ? 'text-green-800 mb-10 border-b-2 border-green-800 pb-2' : 'text-black hover:text-green-800'}
    `;

    return (
      <div key={item.name}>
        <Link
          href={item.href}
          onClick={() => handleItemClick(item.name)}
          className={linkClasses}
        >
          {item.name}
        </Link>
      </div>
    );
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="flex justify-between items-center p-4 w-full">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Image src="/images/decarblogo.png" alt="Decarb Logo" width={64} height={64} />
            <h1 className="text-3xl font-bold">Decarb</h1>
          </div>
        </Link>

        <div className="hidden sm:flex justify-center gap-24 text-black flex-grow">
          {getNavItems().map(item => renderNavItem(item))}
        </div>

        <div className="hidden sm:block pr-8">
          <Link href="/login">
            <button
              className="border-2 bg-green-50 hover:bg-gray-50 border-black text-black py-2 px-4 rounded text-lg font-semibold"
            >
              Login
            </button>
          </Link>
        </div>

        <div
          className="sm:hidden text-black text-3xl cursor-pointer"
          onClick={handleMenuToggle}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>

      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-gradient-to-r from-green-700 to-green-900 bg-opacity-80 backdrop-blur-md flex flex-col items-center justify-center text-white font-semibold tracking-wider z-40 sm:hidden">
          <div
            className="absolute top-4 right-4 text-3xl cursor-pointer"
            onClick={handleMenuToggle}
          >
            <FiX />
          </div>
          <div className="flex flex-col items-center space-y-6">
            {getNavItems().map(item => renderNavItem(item, true))}
            <div className="py-3 w-full text-center text-lg">
              <Link href="/login">
                <button
                  className="border-2 bg-green-50 hover:bg-gray-50 border-black text-black py-2 px-4 rounded text-lg font-semibold"
                >
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
