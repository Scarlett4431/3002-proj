"use client";

import { Navbar } from "flowbite-react";
import UserDropdown from "./UserDropdown";
import SearchBox from "./SearchBox";
import { HiHome } from "react-icons/hi";

import { NavLink } from "react-router-dom";

export default function NavBar(){

  return (
    <Navbar fluid rounded>
      <Navbar.Brand Link to="/" component={NavLink}>
        <HiHome className="h-6 w-6" />
      </Navbar.Brand>
      <Navbar.Collapse>
        <span class="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">
          CCC Cooperative Cardboard
        </span>
      </Navbar.Collapse>
      <div className="flex md:order-2">
        {/* <SearchBox /> */}
         <UserDropdown />
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
