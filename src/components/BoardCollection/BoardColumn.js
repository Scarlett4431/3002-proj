import React from 'react';

function DeleteButton({ index, onDelete }) {
  return (
    <button
      onClick={() => onDelete(index)}
      className="absolute top-0 right-0 m-1 p-0 bg-red-500 text-white rounded hover:bg-red-600"
    >
      x
    </button>
  );
}

export default function BoardColumn({ col, index, onHover, onLeave, onDelete }) {
  return (
    <div
      key={index}
      className="p-10 border rounded shadow bg-green-500 hover:bg-green-600 relative mx-auto flex items-center justify-center"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
    >
      <button
        style={{
          display: "block",
          maxWidth: "150px",
          whiteSpace: "normal",
          overflowWrap: "break-word",
        }}
        className="text-white"
      >
        {col}
      </button>
      <DeleteButton index={index} onDelete={onDelete} />
    </div>
  );
}