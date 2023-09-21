import React, { Component, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import List from "./List";
import BoardBar from "../BoardMenu/BoardBar";
import NewList from "./NewList";

const board = {
  boardId: "-NdjpaVH4vldXr8jyEmP",
  lists: [],
};

// const board = {
//   boardId: "-NdjpaVH4vldXr8jyEmP",
//   lists: [
//     {
//       id: "64f9d187d213b75a59bc264rg",
//       title: "Todo",
//     },
//     {
//       id: "64f9d111d213b75a59bc2649",
//       title: "woqu",
//     },
//     {
//       id: "64f9d187d213b75a59bc264a",
//       title: "test",
//     },
//     {
//       cards: [
//         {
//           id: "64f9d06ad213b75a59bc2648",
//           text: "123",
//         },
//         {
//           id: "64f9d06ad213gffg9bc2648",
//           text: "456",
//         },
//         {
//           id: "64f9d06adgfrg75a59bc2648",
//           text: "789",
//         },
//       ],
//       id: "64f9d187d213b75a59bc264agrn",
//       title: "Todo",
//     },
//   ],
// };

class Board extends Component {
  // constructor(props) {
  //   super(props);
  //   const boardID = this.props.match.params.id;
  //   this.props.loadBoard(boardID);
  // }

  // componentDidMount() {
  //   const boardID = this.props.match.params.id;
  //   this.props.listenBoard(boardID);
  // }

  // onDragEnd = (result) => {
  //   const { destination, source, draggableId, type } = result;
  //   if (!destination) {
  //     return;
  //   }
  //   this.props.sort(
  //     source.droppableId,
  //     destination.droppableId,
  //     source.index,
  //     destination.index,
  //     draggableId,
  //     type
  //   );
  //   this.props.updateBoard(this.props.board);
  // };

  render() {
    const { lists } = board;
    return (
      <div>
        {/* <BoardBar />
        <div className="ml-12 mr-12">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mx-auto">
              {lists != null
                ? lists.map((list, index) => (
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
              <NewList />
            </div>
          </DragDropContext>
        </div> */}
      </div>
    );
  }
};

export default Board;
