import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setSelectedBoardTitle } from "../../actions/boards";

function DeleteButton({ index, onDelete }) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(index);
        }}
        className="absolute top-0 right-0 m-1 p-0 bg-red-500 text-white rounded hover:bg-red-600"
      >
        x
      </button>
    );
  }

  export default function BoardColumn({ boardId, boardTitle, onHover, onLeave, onDelete }) {
    const dispatch = useDispatch();
    const handleBoardClick = () => {
      dispatch(setSelectedBoardTitle(boardTitle));
      console.log(boardTitle);
    };

    return (
      <div
        className="p-10 border rounded shadow bg-green-500 hover:bg-green-600 relative mx-auto flex items-center justify-center"
        onMouseEnter={() => onHover(boardTitle)}
        onMouseLeave={onLeave}
      >
        <Link to={`/board/${boardId}`} 
        className="text-white block text-center" 
        style={{ maxWidth: "150px", whiteSpace: "normal", overflowWrap: "break-word" }}
        onClick={handleBoardClick}>
          {boardTitle}
        </Link>
        <DeleteButton index={boardId} onDelete={onDelete} />
      </div>
    );
  }
