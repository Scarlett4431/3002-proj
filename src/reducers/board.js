import {
  GET_LISTS,
  DRAG_HAPPENED,
  ADD_CARD,
  ADD_LIST,
  GET_BOARD_SUCCESS,
  GET_BOARD_FAIL,
  CREATE_BOARD_SUCCESS,
  DELETE_CARD,
  DELETE_LIST,
  CHANGE_BOARD_TITLE,
} from "../actions/";
import uuid from "react-uuid";

const initialState = {
  boardId: uuid(),
  title: "",
  lists: [],
};

function board(state = initialState, action) {
  switch (action.type) {
    case CHANGE_BOARD_TITLE:
      console.log("CHANGE_BOARD_TITLE");
      return {
        ...state,
        title: action.payload.title
      };
    case CREATE_BOARD_SUCCESS:
      console.log("CREATE_BOARD_SUCCESS");
      return {
        ...state,
        payload: action.payload.uid,
        lists: [],
      };
    case GET_BOARD_SUCCESS:
      console.log("GET_BOARD_SUCCESS");
      return action.payload.board;
    case GET_BOARD_FAIL:
      console.log("GET_BOARD_FAIL");
      return { ...state, lists: [], boardId: action.payload.uid };
    case GET_LISTS:
      console.log("GET_LISTS");
      return state;
    case ADD_LIST:
      console.log("Add list");
      const newList = {
        title: action.payload.title,
        cards: [],
        id: uuid(),
      };
      if (state.lists) {
        return { ...state, lists: [...state.lists, newList] };
      } else {
        return { ...state, lists: [newList] };
      }
    case DELETE_LIST:
      const listID = action.payload.listID;
      const newLists = [...state.lists];
      state.lists.forEach(function (list, index) {
        if (list.id === listID) {
          newLists.splice(index, 1);
          return;
        }
      });
      return { ...state, lists: newLists };
    case ADD_CARD:
      console.log("ADD_CARD");
      const newCard = {
        text: action.payload.text,
        id: uuid(),
      };
      const newLists_2 = state.lists.map((list) => {
        if (list.id === action.payload.listID) {
          if (list.cards) {
            return { ...list, cards: [...list.cards, newCard] };
          } else {
            return { ...list, cards: [newCard] };
          }
        } else {
          return list;
        }
      });

      return { ...state, lists: newLists_2 };
    case DELETE_CARD:
      const cardID = action.payload.cardID;
      const listID_2 = action.payload.listID;
      const newLists_3 = state.lists.map((list) => {
        if (list.id === listID_2) {
          const cardsList = [...list.cards];
          list.cards.forEach(function (card, index) {
            if (card.id === cardID) {
              cardsList.splice(index, 1);
              return;
            }
          });
          return { ...list, cards: cardsList };
        } else {
          return list;
        }
      });
      return { ...state, lists: newLists_3 };

    case DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
        type,
      } = action.payload;
      const newState = { ...state };

      //dragging lists around
      if (type === "list") {
        const list = newState.lists.splice(droppableIndexStart, 1);
        newState.lists.splice(droppableIndexEnd, 0, ...list);
        return newState;
      }

      //same list
      if (droppableIdStart === droppableIdEnd) {
        const list = newState.lists.find(
          (list) => droppableIdStart === list.id
        );
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      //other list
      if (droppableIdStart !== droppableIdEnd) {
        const list = newState.lists.find(
          (list) => droppableIdStart === list.id
        );
        const otherList = newState.lists.find(
          (list) => droppableIdEnd === list.id
        );
        const card = list.cards.splice(droppableIndexStart, 1);
        if (!otherList.cards) {
          otherList.cards = [...card];
        } else {
          otherList.cards.splice(droppableIndexEnd, 0, ...card);
        }
      }

      return newState;

    default:
      return state;
  }
}

export default board;
