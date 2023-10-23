"use client";

import { Navbar } from "flowbite-react";
import UserDropdown from "./UserDropdown";
import { HiHome } from "react-icons/hi";

import { NavLink } from "react-router-dom";

export default function NavBar(){

  return (
    <Navbar fluid rounded class="bg-gray-900/10 h-12 sm:h-16  pt-1 mb-6"> 
      <NavLink to="/">
        <Navbar.Brand>
          <HiHome className="h-12 w-12 pl-4" />
        </Navbar.Brand>
      </NavLink>
        <span class="self-center whitespace-nowrap  xs:text-2xl sm:text-3xl lg:text-4xl  font-semibold dark:text-white text-indigo-950">
          Smart Household Collaboration
        </span>
      <div className="md:order-2 pr-4">
         <UserDropdown />
      </div>
    </Navbar>
  );
}
