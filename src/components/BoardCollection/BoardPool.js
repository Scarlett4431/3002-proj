"use client";
import React, { useState, useEffect } from "react";
import PromptModal from "../PromptModal";
import { HiOutlineClipboardList } from "react-icons/hi";
import { Audio } from  'react-loader-spinner'
import { useDispatch, useSelector } from "react-redux";

import { createBoard, deleteBoard, exitBoard, loadUserBoards } from "../../actions/boards";

import BoardColumn from "./BoardColumn";

export default function BoardPool() {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.boards);
  const userId = useSelector((state) => state.auth.user.uid);

  const [columnToDelete, setColumnToDelete] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promptMessage, setPromptMessage] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [operationType, setOperationType] = useState(null); // 'add' or 'delete'

  const addColumn = () => {
    setOperationType("add");
    setPromptMessage("Enter board title:");
    setConfirmMessage(null);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (boardId) => {
    // get the board with the same index
    const currentBoard = columns.boards.find((board) => board.boardId === boardId);
    console.log(currentBoard);
    // user is the owner of board, delete board in firebase completely
    if(userId === currentBoard.owner){
      setOperationType("delete");
      setColumnToDelete(boardId);
      setPromptMessage("Are you deleting this board for all members?");
      setConfirmMessage("Delete completely")
      setIsModalOpen(true);
    }
    // user is not owner of board, remove user from board member list
    else{
      setOperationType("exit");
      setColumnToDelete(boardId);
      setPromptMessage("Are you removing this board from your account?");
      setConfirmMessage(null);
      setIsModalOpen(true);
    }
  };

  const confirmAction = (inputValue) => {
    if (operationType === "add") {
      inputValue = inputValue.trim();
      if (inputValue) {
        dispatch(createBoard(inputValue, userId));
      }
    } else if (operationType === "delete") {
      dispatch(deleteBoard(columnToDelete));
    }
    else if (operationType === "exit") {
      dispatch(exitBoard(columnToDelete));
    }
    setIsModalOpen(false);
    setOperationType(null);
  };

  useEffect(() => {
    console.log("Boards calls loadUserBoards");
    dispatch(loadUserBoards());
  }, []);

  const enclosedDivClass = "content-center flex-col flex justify-center  px-10";

  if(columns.loading){
    return (<div class={enclosedDivClass}>
        <div className="mx-auto block justify-center content-center">
          <Audio className="mx-auto justify-center text-indigo-95"  color = '#A78BFA'/>
          <h2 className="text-xl mb-7 text-center text-indigo-950 font-bold">
            Loading...
          </h2>
        </div>
      </div>
    );
  }
  else{
    return (
      <div class={enclosedDivClass}>
        {columns.boards.length === 0 && (
          <div className="mx-auto block justify-center content-center">
            <HiOutlineClipboardList className="mx-auto justify-center text-indigo-950 h-32 w-32" />
            <h2 className="text-xl mb-7 text-center text-indigo-950 font-bold">
              Empty Board
            </h2>
          </div>
        )}
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {columns.boards.length !== 0 &&
            columns.boards.map(({ boardId, title }) => (
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
          className="mt-8 block mx-auto text-white  bg-violet-400 hover:bg-violet-500 font-bold py-3 px-5 rounded-lg"
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
          confirmMessage = {confirmMessage}
          requiresInput={operationType === "add"}
          showCancel={true}
        />
      </div>
    );
  }
  
}
