import {
  CREATE_BOARD_REQUEST,
  CREATE_BOARD_SUCCESS,
  CREATE_BOARD_FAIL,
  GET_BOARDS_REQUEST,
  GET_BOARDS_SUCCESS,
  GET_BOARDS_FAIL,
  GET_BOARD_NAME_SUCCESS,
  DELETE_BOARD_SUCCESS,
  SET_SELECTED_BOARD_TITLE
} from "../actions/boards";

const initialState = {
  loading: false,
  boards: [],
  error: null,
  currentBoard: null,
  selectedBoardTitle: ''
};

function boardsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_BOARD_REQUEST:
    case GET_BOARDS_REQUEST:
      return {
        ...state,
        loading: true
      };

    case CREATE_BOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        boards: [...state.boards, { boardId: action.payload.uid, title: action.payload.title, owner: action.payload.owner}]
      };

    case GET_BOARDS_SUCCESS:
      console.log("Save new board state");
      console.log("length"+action.payload.boards.length);
      return {
        ...state,
        loading: false,
        boards: action.payload.boards
      };

    case CREATE_BOARD_FAIL:
    case GET_BOARDS_FAIL:
      return {
        ...state,
        loading: false,
        error: "An error occurred while processing your request."
      };
    
    case DELETE_BOARD_SUCCESS:
      return {
          ...state,
          boards: state.boards.filter(board => board.boardId !== action.payload)
      };

    case GET_BOARD_NAME_SUCCESS:
      return {
        ...state,
        currentBoard: {
          ...state.currentBoard,
          boardId: action.payload.boardId,
          title: action.payload.name
        }
      };
    
    case SET_SELECTED_BOARD_TITLE:
      return {
        ...state,
        selectedBoardTitle: action.payload
      };

    default:
      return state;
  }
}

export default boardsReducer;