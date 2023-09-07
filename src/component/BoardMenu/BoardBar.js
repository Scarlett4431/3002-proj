'use client';

import { Button } from 'flowbite-react';
import BoardTitleCard from './BoardTitleCard';
import InviteCard from './InviteCard';
import { HiAdjustments  } from "react-icons/hi";

export default function BoardBar() {
  return (
    <Button.Group outline>
      <BoardTitleCard/>
      <InviteCard/>
    </Button.Group>
  )
}


