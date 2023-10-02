import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { deleteCard, updateBoard, updateCard, updateCardToBoard, deleteCardFromBoard } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

function Card({ cardID, text, listID, index, completed }) {
  const board = useSelector((state) => state.board);
  console.log(completed);
  const dispatch = useDispatch();
  const handleDeleteCard = () => {
    dispatch(deleteCard(cardID, listID));
    dispatch(deleteCardFromBoard(board, cardID, listID));
    // dispatch(updateBoard(board));
  };
  const handleCompleteCard = () => {
    dispatch(updateCard(cardID, listID, completed));
    dispatch(updateCardToBoard(board, cardID, listID, completed));
    // dispatch(updateBoard(board));
  };
  return (
    <Draggable key={cardID} draggableId={cardID} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            className="bg-white rounded-md space-y-2 drop-shadow-md"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="flex justify-between items-center p-5">
              <p className={completed ? "line-through" : ""}>{text}</p>
              <div className="flex items-end justify-end">
                {!completed && (
                  <button
                    className="hover:text-grey-900"
                    onClick={handleCompleteCard}
                  >
                    <CheckCircleIcon className="h-8 w-8" />
                  </button>
                )}
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
