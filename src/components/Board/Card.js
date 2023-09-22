import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { deleteCard, updateBoard } from "../../actions";
import { useDispatch } from "react-redux";

function Card({ id, text, listID, index, completed }) {
  console.log(completed)
  const dispatch = useDispatch();
  const handleDeleteCard = () => {
    dispatch(deleteCard(id, listID));
    dispatch(updateBoard());
  };
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            className="bg-white rounded-md space-y-2 drop-shadow-md"
            
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="flex justify-between items-center p-5">
              <p className={completed ? 'line-through' : ''}>{text}</p>
              <div className="flex items-end justify-end">
                <button className="hover:text-grey-900">
                  <CheckCircleIcon className="h-8 w-8" />
                </button>
                <button
                  onClick={handleDeleteCard}
                  className="text-red-500 hover:text-red-600"
                >
                  <XCircleIcon className="h-8 w-8" />
                </button>
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}

export default Card;
