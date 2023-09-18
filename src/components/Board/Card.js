import React, { useState } from 'react';
import { Draggable } from "react-beautiful-dnd";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import PromptModal from "./DeleteModal";


function Card({ id, text, listID, index }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteCard = () => {
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    // add logic
    setIsModalOpen(false);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
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
              <p>{text}</p>
              <div className="flex items-end justify-end">
                <button
                  onClick={handleDeleteCard} //shouldnt be handling delete event
                  className="hover:text-grey-900"
                >
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
            <PromptModal 
                open={isModalOpen} 
                message="Are you sure you want to delete this card?" 
                onConfirm={confirmDelete} 
                onCancel={cancelDelete}
            />
          </div>
        );
      }}
    </Draggable>
  );
}

export default Card;
