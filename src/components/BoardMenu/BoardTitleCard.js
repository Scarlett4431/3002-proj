import React, { useState } from "react";
import { HiAdjustments } from "react-icons/hi";
import PromptModal from "../PromptModal";
import { changeBoardTitle, changeBoardTitleToBoard } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
function BoardTitleCard() {
  const board = useSelector((state) => state.board);
  // const selectedTitle = useSelector(state => state.board.boardId);
  // console.log("Selected Title:", selectedTitle); //this is the board title
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promptMessage, setPromptMessage] = useState("");
  const cancel = () => {
    setIsModalOpen(false);
  };

  const editBoard = () => {
    setPromptMessage("Enter new board title:");
    setIsModalOpen(true);
  };

  const confirmAction = (inputValue) => {
    inputValue = inputValue.trim();
    if (inputValue.length > 0 && inputValue.length < 30) {
      dispatch(changeBoardTitle(inputValue)); 
      dispatch(changeBoardTitleToBoard(board, inputValue));
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <button className="flex  text-white bg-violet-400 hover:bg-violet-500 font-bold py-4 px-6 rounded-lg" onClick={editBoard}>
        <HiAdjustments className="mr-3 h-5 w-5" />
        <p className="font-semibold">{board.title}</p>
      </button>
      <PromptModal
        open={isModalOpen}
        message={promptMessage}
        onConfirm={confirmAction}
        onCancel={cancel}
        type="boardname"
        requiresInput
      />
    </div>
  );
}

export default BoardTitleCard;
