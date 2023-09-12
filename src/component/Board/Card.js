import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { XCircleIcon } from "@heroicons/react/24/solid";

function Card({ id, content }) {
  return (
    <Draggable key={id} draggableId={id}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            className="bg-white rounded-md space-y-2 drop-shadow-md"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="flex justify-between items-center p-5">
              <p>{content}</p>
              <button className="text-red-500 hover:text-red-600">
                <XCircleIcon className="ml-5 h-8 w-8" />
              </button>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default Card;
