"use client";
import React from "react";
import { Button } from "flowbite-react";
import BoardTitleCard from "./BoardTitleCard";
import InviteCard from "./InviteCard";


export default function BoardBar({ title, boardID }) {

  return (
    <section>
      <Button.Group outline>
        <BoardTitleCard title={title}/>
        <InviteCard boardID={boardID} />
      </Button.Group>
    </section>
  );
}
