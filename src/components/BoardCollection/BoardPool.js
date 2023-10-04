"use client";
import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { Audio } from 'react-loader-spinner';
import PromptModal from "../PromptModal";

import { useDispatch, useSelector } from "react-redux";

import { createBoard, deleteBoard, loadUserBoards } from "../../actions/boards";

import BoardColumn from './BoardColumn';

export default function BoardPool() {

  const dispatch = useDispatch();
  const columns = useSelector((state) => state.boards); 
  const auth = useSelector((state) => state.auth);

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
//grid grid-cols-1 gap-4 md:grid-cols-3
  return (
    <div class="justify-content-center px-10">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {columns.boards.length === 0 ? 
          <Audio style={{ flex: 1 }}/> 
        : columns.boards.map(({boardId, title}) => (
          <BoardColumn
            boardId={boardId}
            boardTitle={title}
            onHover={setHoveredIndex}
            onLeave={() => setHoveredIndex(null)}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>
      <Button
        onClick={addColumn}
        className="mt-8 font-bold px-4 py-2 block mx-auto"
        gradientDuoTone="purpleToPink"
        >
        CREATE NEW BOARD
      </Button>
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
}
