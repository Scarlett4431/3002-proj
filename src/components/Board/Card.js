import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckCircle, BsCircle } from "react-icons/bs";
import {
  moveCard,
  deleteCard,
  updateCard,
  moveCardToBoard,
  updateCardToBoard,
  deleteCardFromBoard,
} from "../../actions";
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
              <button
                onClick={handleDeleteCard}
                className="text-gray-600 hover:text-gray-950"
              >
                <AiOutlineDelete className="h-5 w-5" />
              </button>
              <p className={completed ? "line-through" : ""}>{text}</p>
              <div className="flex items-end justify-end">
                <button
                  className="hover:text-grey-900"
                  onClick={handleCompleteCard}
                >
                  {completed && <BsCheckCircle className="h-5 w-5" />}
                  {!completed && <BsCircle className="h-5 w-5" />}
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
