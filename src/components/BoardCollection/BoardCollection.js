"use client";
import React, { useState, useEffect } from "react";
import PromptModal from "../PromptModal";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

import { createBoard, deleteBoard, loadUserBoards } from "../../actions/boards";

import BoardColumn from './BoardColumn';
import BoardCollectionHeader from './BoardCollectionHeader';

export default function BoardCollection() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const columns = useSelector((state) => state.boards); 

  const [columnToDelete, setColumnToDelete] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promptMessage, setPromptMessage] = useState("");
  const [operationType, setOperationType] = useState(null); // 'add' or 'delete'

  const addColumn = () => {
    setOperationType("add");
    setPromptMessage("Enter board title:");
    setIsModalOpen(true);
  };

  const handleDeleteClick = (index) => {
    setOperationType("delete");
    setColumnToDelete(index);
    setPromptMessage("Are you sure you want to delete this board?");
    setIsModalOpen(true);
  };

  const confirmAction = (inputValue) => {
    if (operationType === "add") {
      if (inputValue) {
        dispatch(createBoard(inputValue));
      }
    } else if (operationType === "delete") {
      dispatch(deleteBoard(columnToDelete));
    }
    setIsModalOpen(false);
    setOperationType(null);
  };
  
  useEffect(() => {
    if (auth.isAuthenticated) {
        console.log("Boards calls loadUserBoards");
        dispatch(loadUserBoards());
    }
  }, [auth.isAuthenticated]);

  if (auth.isLoading) {
    return <div />;
  } else if (auth.isAuthenticated) {
    return (
      <div className="p-10 bg-gray-200 min-h-75vh">
        <BoardCollectionHeader />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {columns.boards.length === 0 ? "No boards available" : columns.boards.map(({boardId, title}) => (
            <BoardColumn
              boardId={boardId}
              boardTitle={title}
              onHover={setHoveredIndex}
              onLeave={() => setHoveredIndex(null)}
              onDelete={handleDeleteClick}
            />
        ))}
        </div>
        <button
          onClick={addColumn}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 block mx-auto"
        >
          CREATE NEW BOARD
        </button>

        <PromptModal
          open={isModalOpen}
          message={promptMessage}
          onConfirm={(inputValue) => confirmAction(inputValue)}
          onCancel={() => {
            setIsModalOpen(false);
            setOperationType(null);
          }}
          requiresInput={operationType === "add"}
        />
      </div>
    );
  } else {
    return <Navigate to="/signin" />;
  }
}
