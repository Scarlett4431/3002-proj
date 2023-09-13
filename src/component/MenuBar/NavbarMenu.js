"use client";

import { Navbar } from "flowbite-react";
import UserDropdown from "./UserDropdown";
import SearchBox from "./SearchBox";
import { HiHome } from "react-icons/hi";
export default function NavbaMenu() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand>
        <HiHome className="h-6 w-6"/>
      </Navbar.Brand>
      <Navbar.Collapse>
        <span class="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">
          I cant think of a name
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
