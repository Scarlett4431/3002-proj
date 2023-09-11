import React from "react";
import { Draggable } from "react-beautiful-dnd";

function Card() {
  return (
    <Draggable>
      <div>Hello</div>
    </Draggable>
  );
}

export default Card;
