'use client';

import { Button } from 'flowbite-react';
import BoardTitleCard from './BoardTitleCard';
import InviteCard from './InviteCard';

export default function BoardBar() {
  return (
    <section class="bg-gray-200 dark:bg-gray-900"><Button.Group outline >
    <BoardTitleCard/>
    <InviteCard/>
  </Button.Group></section>
    
  )
}


