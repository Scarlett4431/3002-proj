import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import List from "./List";
import BoardBar from "../BoardMenu/BoardBar";
import PromptModal from "../PromptModal";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import uuid from "react-uuid";

const board = {
  boardId: "-NdjpaVH4vldXr8jyEmP",
  title: "123",
  lists: [
    {
      id: "64f9d187d213b75a59bc264rg",
      title: "Todo",
    },
    {
      id: "64f9d111d213b75a59bc2649",
      title: "woqu",
    },
    {
      id: "64f9d187d213b75a59bc264a",
      title: "test",
    },
    {
      cards: [
        {
          id: "64f9d06ad213b75a59bc2648",
          text: "123",
        },
        {
          id: "64f9d06ad213gffg9bc2648",
          text: "456",
        },
        {
          id: "64f9d06adgfrg75a59bc2648",
          text: "789",
        },
      ],
      id: "64f9d187d213b75a59bc264agrn",
      title: "Todo",
    },
  ],
};

function Board() {
  const [columns, setColumns] = useState(board.lists);
  const [title, setTitle] = useState(board.title);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangeBoardName = (inputValue) => {
    setTitle(inputValue);
  };

  const deleteColumn = (listID) => {
    setColumns((lists) => {
      lists.forEach(function (list, index) {
        if (list.id === listID) {
          lists.splice(index, 1);
        }
      });
      return [...lists];
    });
  };

  const cancel = () => {
    setIsModalOpen(false);
  };

  const confirmAddLists = (inputValue) => {
    if (inputValue) {
      setColumns((lists) => [
        ...lists,
        {
          id: uuid(),
          title: inputValue,
        },
      ]);
    }
    setIsModalOpen(false);
  };

  const deleteCard = (cardID, listID) => {
    setColumns((lists) => {
      lists = lists.map((list) => {
        if (list.id === listID) {
          const cardsList = [...list.cards];
          list.cards.forEach(function (card, index) {
            if (card.id === cardID) {
              cardsList.splice(index, 1);
            }
          });
          return { ...list, cards: cardsList };
        } else {
          return list;
        }
      });
      return [...lists];
    });
  };

  const addCard = (inputValue, listIndex) => {
    if (inputValue) {
      const newCard = {
        text: inputValue,
        id: uuid(),
      };
      setColumns((lists) =>
        lists.map((list) => {
          if (list.id === listIndex) {
            if (list.cards) {
              return { ...list, cards: [...list.cards, newCard] };
            } else {
              return { ...list, cards: [newCard] };
            }
          } else {
            return list;
          }
        })
      );
    }
  };

  const addList = () => {
    setIsModalOpen(true);
  };
  // constructor(props) {
  //   super(props);
  //   const boardID = this.props.match.params.id;
  //   this.props.loadBoard(boardID);
  // }

  // componentDidMount() {
  //   const boardID = this.props.match.params.id;
  //   this.props.listenBoard(boardID);
  // }

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    // sort(
    //   source.droppableId,
    //   destination.droppableId,
    //   source.index,
    //   destination.index,
    //   draggableId,
    //   type
    // );
    // updateBoard(this.props.board);
  };

  return (
    <div>
      <BoardBar title={title} onChangeBoardTitle={handleChangeBoardName}/>
      <div className="ml-12 mr-12">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mx-auto">
            {columns != null
              ? columns.map((list, index) => (
                  <div key={list.id}>
                    <List
                      index={index}
                      title={list.title}
                      cards={list.cards}
                      listID={list.id}
                      onDeleteList={deleteColumn}
                      onAddCard={addCard}
                      onDeleteCard={deleteCard}
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
                  onClick={addList}
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
