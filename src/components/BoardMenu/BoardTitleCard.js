import React, { useState } from "react";
import { Button } from "flowbite-react";
import { HiAdjustments } from "react-icons/hi";
import PromptModal from "../PromptModal";
import { changeBoardTitle, changeBoardTitleToBoard } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
function BoardTitleCard({ title }) {
  const board = useSelector((state) => state.board);
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
    if (inputValue.length > 0 && inputValue.length < 30) {
      dispatch(changeBoardTitle(inputValue));
      dispatch(changeBoardTitleToBoard(board, inputValue));
      // dispatch(updateBoard(board));
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button size="xl" gradientDuoTone="purpleToPink" onClick={editBoard}>
        <HiAdjustments className="mr-3 h-4 w-4" />
        <p>{title}</p>
      </Button>
      <PromptModal
        open={isModalOpen}
        message={promptMessage}
        onConfirm={confirmAction}
        onCancel={cancel}
        requiresInput
      />
    </div>
  );
}

export default BoardTitleCard;
