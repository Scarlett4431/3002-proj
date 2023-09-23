import React from 'react';
import { Link } from "react-router-dom";

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

  export default function BoardColumn({ col, index, onHover, onLeave, onDelete }) {
    return (
      <div
        className="p-10 border rounded shadow bg-green-500 hover:bg-green-600 relative mx-auto flex items-center justify-center"
        onMouseEnter={() => onHover(index)}
        onMouseLeave={onLeave}
      >
        <Link to={`/board/${index}`} className="text-white block text-center" style={{ maxWidth: "150px", whiteSpace: "normal", overflowWrap: "break-word" }}>
          {col}
        </Link>
        <DeleteButton index={index} onDelete={onDelete} />
      </div>
    );
  }
