import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedBoardTitle } from "../../actions/boards";
import { AiOutlineDelete } from "react-icons/ai";

export default function BoardColumn({
  boardId,
  boardTitle,
  onHover,
  onLeave,
  onDelete,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function divOnClick() {
    navigate(`/board/${boardId}`);
    dispatch(setSelectedBoardTitle(boardTitle));
  }

  return (
    <div
      className="relative p-2 rounded-2xl shadow-sm px-5 py-5 bg-indigo-400 "
      onMouseEnter={() => onHover(boardTitle)}
      onMouseLeave={onLeave}
      onClick={divOnClick}
    >
      <h2 className="text-white justify-between text-lg p-2 block text-center font-semibold">
        {boardTitle}
      </h2>
      <button
      className="absolute top-0 right-0 w-8 h-8"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete(boardId);
        }}
      >
        <AiOutlineDelete className="w-5 h-5"/>
      </button>
    </div>
  );
}
