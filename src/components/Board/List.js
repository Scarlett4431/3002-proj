import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import PromptModal from "../PromptModal";
import { useDispatch, useSelector} from "react-redux";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { deleteList, updateBoard, addCard } from "../../actions";

function List({ cards, listID, title, index}) {
  const board = useSelector((state) => state.board);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promptMessage, setPromptMessage] = useState("");
  const [columnToDelete, setColumnToDelete] = useState(null);
  const [operationType, setOperationType] = useState(null); // 'add' or 'delete'
  const dispatch = useDispatch();
  const addColumn = () => {
    setOperationType("add");
    setPromptMessage("Enter card title:");
    setIsModalOpen(true);
  };
;

  const handleDeleteClick = (listID) => {
    setOperationType("delete");
    setColumnToDelete(listID);
    setPromptMessage("Are you sure you want to delete this list?");
    setIsModalOpen(true);
  };


  const cancel = () => {
    setIsModalOpen(false);
    setColumnToDelete(null);
  };

  const confirmAction = (inputValue) => {
    if (operationType === "add") {
      dispatch(addCard(listID, inputValue));
      dispatch(updateBoard(board));
    } else if (operationType === "delete") {
      dispatch(deleteList(columnToDelete));
      dispatch(updateBoard(board));
    }
    setIsModalOpen(false);
    setOperationType(null);
  };

  return (
    <Droppable
      droppableId={listID}
      key={listID}
      index={index}
      // direction="horizontal"
      // type="column"
    >
      {(provided, snapshot) => {
        return (
          <div
            className={`p-2 rounded-2xl shadow-sm ${
              snapshot.isDraggingOver ? "bg-green-200" : "bg-gray-100"
            }`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h2 className="flex justify-between font-bold text-xl p-2">
              {title}
            </h2>
            {cards != null
              ? cards.map((item, index) => {
                  return (
                    <Card
                      id={item.id}
                      text={item.text}
                      listID={listID}
                      index={index}
                      completed={item.completed}
                    />
                  );
                })
              : null}
            {provided.placeholder}
            <div className="flex items-end justify-end">
              <button
                className="text-green-500 hover:text-green-600 mt-3"
                onClick={addColumn}
              >
                <PlusCircleIcon className="h-10 w-10" />
              </button>
              <button
                onClick={() => handleDeleteClick(listID)}
                className="text-red-500 hover:text-red-600"
              >
                <XCircleIcon className="h-10 w-810" />
              </button>
              <PromptModal
                open={isModalOpen}
                message={promptMessage}
                onConfirm={confirmAction}
                onCancel={cancel}
              />
              <PromptModal
                open={isModalOpen}
                message={promptMessage}
                onConfirm={confirmAction}
                onCancel={cancel}
                requiresInput={operationType === "add"}
              />
            </div>
          </div>
        );
      }}
    </Droppable>
  );
}

export default List;
