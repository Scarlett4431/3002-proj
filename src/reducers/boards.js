import {
    CREATE_BOARD_REQUEST,
    CREATE_BOARD_SUCCESS,
    CREATE_BOARD_FAIL,
    GET_BOARDS_REQUEST,
    GET_BOARDS_SUCCESS,
    GET_BOARDS_FAIL,
    GET_BOARD_NAME_SUCCESS
  } from "../actions/boards";
  
  const initialState = {
    loading: false,
    boards: [],
    error: null,
    currentBoard: null
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
          boards: [...state.boards, { boardId: action.payload.uid, title: "" }]
        };
  
      case GET_BOARDS_SUCCESS:
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
  
      case GET_BOARD_NAME_SUCCESS:
        return {
          ...state,
          currentBoard: {
            ...state.currentBoard,
            boardId: action.payload.boardId,
            title: action.payload.name
          }
        };
  
      default:
        return state;
    }
  }
  
  export default boardsReducer;