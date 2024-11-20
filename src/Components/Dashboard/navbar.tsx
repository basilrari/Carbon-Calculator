import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

const MyNavbar = () => {
  return (
    <Navbar className="flex flex-col h-screen w-64 border-r bg-white shadow-md">
      
      <NavbarBrand className="flex items-center gap-2 py-4 px-6 border-b">
       <img src="/decarblogo.png" alt="Decarb Logo" className="h-16 w-16" />
        <p className="font-bold text-lg text-inherit">Decarb</p>
      </NavbarBrand>

      
      <NavbarContent className="flex flex-col gap-4 px-6 mt-4">
        <NavbarItem>
          <Link color="foreground" href="#" className="block w-full">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" className="block w-full font-bold">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#" className="block w-full">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="flex flex-col gap-4 px-6 mt-auto pb-6">
        <NavbarItem>
          <Link href="#" className="block w-full">
            Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat" className="w-full">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default MyNavbar;