"use client";

import { Navbar } from "flowbite-react";
import UserDropdown from "./UserDropdown";
import SearchBox from "./SearchBox";
import { HiHome } from "react-icons/hi";
export default function NavbarMenu() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand>
        <HiHome className="h-6 w-6" />
      </Navbar.Brand>
      <Navbar.Collapse>
        <span className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Lets Do It!
        </span>
      </Navbar.Collapse>
      <div className="flex md:order-2">
        <SearchBox />
        <UserDropdown />
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
