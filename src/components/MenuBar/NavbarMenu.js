"use client";

import { Navbar } from "flowbite-react";
import UserDropdown from "./UserDropdown";
import { HiHome } from "react-icons/hi";

import { NavLink } from "react-router-dom";

export default function NavBar(){

  return (
    <Navbar fluid rounded class="bg-gray-900/10 h-10 mb-8"> 
      <NavLink to="/">
        <Navbar.Brand>
          <HiHome className="h-8 w-8" />
        </Navbar.Brand>
      </NavLink>
      <Navbar.Collapse>
        <span class="self-center whitespace-nowrap text-3xl font-semibold dark:text-white text-indigo-950">
          CCC Cooperative Cardboard
        </span>
      </Navbar.Collapse>
      <div className="flex md:order-2">
         <UserDropdown />
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
