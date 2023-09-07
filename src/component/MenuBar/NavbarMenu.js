"use client";

import { Button, Navbar } from "flowbite-react";
import UserDropdown from "./UserDropdown";
import SearchBox from "./SearchBox";
import { HiHome } from "react-icons/hi";
export default function NavbarMenu() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand>
        {/* <img
          alt="Home"
          className="mr-3 h-6 sm:h-9"
          src="/favicon.svg"
        /> */}
        <HiHome className="h-6 w-6" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Lets Do It!
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <SearchBox />
        <UserDropdown />
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
