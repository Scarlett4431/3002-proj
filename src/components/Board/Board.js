import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import List from "./List";
import { useDispatch, useSelector, useStore } from "react-redux";
import BoardBar from "../BoardMenu/BoardBar";
import PromptModal from "../PromptModal";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import {
  listenBoard,
  loadBoard,
  sort,
  updateBoard,
  addList,
} from "../../actions/board";
import { useParams } from "react-router-dom";

function Board() {
  const board = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(loadBoard(id));
  }, []);


  const cancel = () => {
    setIsModalOpen(false);
  };

  const confirmAddLists = (inputValue) => {
    if (inputValue) {
      dispatch(addList(inputValue));
      dispatch(updateBoard(board));
    }
    setIsModalOpen(false);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    console.log(destination)
    console.log(source)
    console.log(draggableId)
    if (!destination) {
      return;
    }
    dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
    dispatch(updateBoard(board));
  };

  return (
    <div>
      <BoardBar
        title={board.title}
      />
      <div className="ml-12 mr-12">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mx-auto">
            {board.lists != null
              ? board.lists.map((list, index) => (
                  <div key={list.id}>
                    <List
                      index={index}
                      title={list.title}
                      cards={list.cards}
                      listID={list.id}
                    ></List>
                  </div>
                ))
              : null}
            <div className={"p-2 rounded-2xl shadow-sm"}>
              <h2 className="text-blue-700 flex justify-between font-bold text-xl p-2s">
                Add a List
              </h2>
              <div className="flex items-end justify-end">
                <button
                  className="text-blue-500 hover:text-blue-600 mt-3"
                  onClick={() => setIsModalOpen(true)}
                >
                  <PlusCircleIcon className="h-10 w-10" />
                </button>
              </div>
            </div>
          </div>
          <PromptModal
            placeholder={""}
            open={isModalOpen}
            message={"Enter list title:"}
            onConfirm={confirmAddLists}
            onCancel={cancel}
            requiresInput
          />
        </DragDropContext>
      </div>
    </div>
  );
}

export default Board;
