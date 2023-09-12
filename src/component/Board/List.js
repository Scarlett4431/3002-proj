import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";

function List({ items, id }) {
  return (
    <Droppable
      droppableId={id}
      key={id}
      // direction="horizontal"
      // type="column"
    >
      {(provided, snapshot) => {
        return (
          <div
            // className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
              padding: 4,
              width: 250,
              minHeight: 500,
            }}
          >
            {items.map((item, index) => {
              return <Card id={item.id} content={item.content} />;
            })}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
}

export default List;
