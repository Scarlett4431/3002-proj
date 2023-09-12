import React, { useState } from 'react';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';


function Board() {
  return <DragDropContext>
    <Droppable droppableId='board' direction='horizontal' type='column'>
        {(provided, snapshot) =>{
            <div>
            </div>
        }}
    </Droppable>
  </DragDropContext>
}

export default Board