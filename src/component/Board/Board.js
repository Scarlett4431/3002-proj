import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import List from "./List";
import uuid from "react-uuid";
import BoardBar from "../BoardMenu/BoardBar";
import NewList from "./NewList";

const itemsFromBackend = [
  { id: uuid(), text: "First task" },
  { id: uuid(), text: "Second task" },
  { id: uuid(), text: "Third task" },
  { id: uuid(), text: "Fourth task" },
  { id: uuid(), text: "Fifth task" },
];

const columnsFromBackend = {
  [uuid()]: {
    title: "Requested",
    items: itemsFromBackend,
  },
  [uuid()]: {
    title: "To do",
    items: [],
  },
  [uuid()]: {
    title: "In Progress",
    items: [],
  },
  [uuid()]: {
    title: "Done",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function Board() {
  const [columns, setColumns] = useState(columnsFromBackend);
  return (
    <div>
      <BoardBar />
      <div className="ml-12 mr-12">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mx-auto">
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div key={columnId}>
                  <List
                    title={column.title}
                    cards={column.items}
                    columnId={columnId}
                  ></List>
                </div>
              );
            })}
            <NewList />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default Board;
