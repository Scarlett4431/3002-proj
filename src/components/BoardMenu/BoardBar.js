"use client";
import React from "react";
import BoardTitleCard from "./BoardTitleCard";
import InviteCard from "./InviteCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
export default function BoardBar({ title, boardID, searchString, setSearchString }) {
  return (
    <div className="flex flex-col md:flex-row items-center p-5 bg-gray-400/10 rounded-b-2xl">
      <div
        className="absolute top-0 left-0 w-full h-96 
          bg-gradient-to-br from-pink-400 to-[#0055D1] 
          rounded-md filter blur-3xl opacity-50 -z-50"
      />
      <BoardTitleCard title={title} />
      <InviteCard boardID={boardID} />
      <div className="flex items-center space-x-5 flex-1 justify-end w-full">
        <form
          className="flex items-center space-x-5 bg-white p-2 
                    shadow-md flex-1 md:flex-initial rounded-xl"
        >
          <MagnifyingGlassIcon className="ml-2 h-6 w-6 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            className="flex-1 border-transparent focus:border-transparent focus:ring-0 p-2"
          />
          <button type="submit" hidden>
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
