import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";
import NewCard from "./NewCard";

function List({ cards, listID, title, index }) {
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
              snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
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
                    />
                  );
                })
              : null}
            {provided.placeholder}
            <div className="flex items-end justify-end">
              <NewCard />
            </div>
          </div>
        );
      }}
    </Droppable>
  );
}

export default List;
