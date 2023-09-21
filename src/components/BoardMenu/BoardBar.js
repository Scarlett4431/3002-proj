"use client";
import React, { useState } from "react";
import { Button } from "flowbite-react";
import BoardTitleCard from "./BoardTitleCard";
import InviteCard from "./InviteCard";

export default function BoardBar({title, onChangeBoardTitle}) {
  const [columnToDelete, setColumnToDelete] = useState(null);

  return (
    <section>
      <Button.Group outline>
        <BoardTitleCard onChangeBoardTitle={onChangeBoardTitle} title={title}/>
        <InviteCard />
        {/* 
        <Button size="xl" gradientDuoTone="greenToBlue" onClick={handleInvite}>
          <HiUserCircle className="mr-3 h-4 w-4" />
          <p>Invite</p>
        </Button>
        <PromptModal
          open={isModalOpen}
          message={promptMessage}
          onConfirm={confirmAction}
          onCancel={cancel}
          requiresInput={operationType === "add"}
        /> */}
      </Button.Group>
    </section>
  );
}
