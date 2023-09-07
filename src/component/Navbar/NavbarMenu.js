"use client";

import { Button, Navbar } from "flowbite-react";
import UserDropdown from "./UserDropdown";
import SearchBox from "./SearchBox";
import InviteCard from "./InviteCard"
import BoardTitleCard from "./BoardTitleCard";

export default function NavbarMenu() {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          alt="Flowbite React Logo"
          className="mr-3 h-6 sm:h-9"
          src="/favicon.svg"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Lets Do It!
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <SearchBox/>
        <UserDropdown/>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link>
          <Button>Home</Button>
        </Navbar.Link>
        <Navbar.Link><BoardTitleCard/></Navbar.Link>
        <Navbar.Link><InviteCard/></Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
