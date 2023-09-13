"use client";

import { Button } from "flowbite-react";
import BoardTitleCard from "./BoardTitleCard";
import InviteCard from "./InviteCard";

export default function BoardBar() {
  return (
    <section>
      <Button.Group outline>
        <BoardTitleCard />
        <InviteCard />
      </Button.Group>
    </section>
  );
}
