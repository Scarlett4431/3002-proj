import { myFirebase } from "../firebase/firebase";

export const GET_BOARD_REQUEST = "GET_BOARD_REQUEST";
export const GET_BOARD_SUCCESS = "GET_BOARD_SUCCESS";
export const GET_BOARD_FAIL = "GET_BOARD_FAIL";

export const UPDATE_BOARD_REQUEST = "UPDATE_BOARD_REQUEST";
export const UPDATE_BOARD_SUCCESS = "UPDATE_BOARD_SUCCESS";
export const UPDATE_BOARD_FAIL = "UPDATE_BOARD_FAIL";

export const SET_BOARD_ID = "SET_BOARD_ID";

export const CHANGE_BOARD_TITLE = "CHANGE_BOARD_TITLE"

export const ADD_LIST = "ADD_LIST";
export const DELETE_LIST = "DELETE_LIST";
export const GET_LISTS = "GET_LISTS";

export const ADD_CARD = "ADD_CARD";
export const UPDATE_CARD = "UPDATE_CARD";
export const DELETE_CARD = "DELETE_CARD";

export const DRAG_HAPPENED = "DRAG_HAPPENED";

export const changeBoardTitle = (title) => {
    return {
        type: CHANGE_BOARD_TITLE,
        payload: { title },
    };
};

export const addList = (title) => {
    return {
        type: ADD_LIST,
        payload: { title },
    };
};

export const deleteList = (listID) => {
    return {
        type: DELETE_LIST,
        payload: { listID }
    };
};

export const addCard = (listID, text) => {
    return {
        type: ADD_CARD,
        payload: { text, listID },
    };
};

export const updateCard = (cardID, listID, completed) => {
    return {
        type: UPDATE_CARD,
        payload: { cardID, listID, completed },
    };
};

export const deleteCard = (cardID, listID) => {
    return {
        type: DELETE_CARD,
        payload: { cardID, listID }
    };
};

export const requestBoard = () => {
    return {
        type: GET_BOARD_REQUEST,
    };
};

export const receiveBoard = (board) => {
    return {
        type: GET_BOARD_SUCCESS,
        payload: { board },
    };
};

export const receiveBoardError = (uid) => {
    return {
        type: GET_BOARD_FAIL,
        payload: { uid },
    };
};

export const requestUpdateBoard = () => {
    return {
        type: UPDATE_BOARD_REQUEST,
    };
};

export const receiveUpdatedBoard = () => {
    return {
        type: UPDATE_BOARD_SUCCESS,
    };
};

export const updateBoardError = () => {
    return {
        type: UPDATE_BOARD_FAIL,
    };
};


export const sort = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type
) => {
    return {
        type: DRAG_HAPPENED,
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId,
            type
        }
    };
};

export const updateBoard = (board) => dispatch => {
    console.log(board);
    // if (false) {
    //     console.log("updateBoardError");
    //     dispatch(updateBoardError());
    // } else {
    //     console.log("requestUpdateBoard");
    //     dispatch(requestUpdateBoard());

    const user = myFirebase.auth().currentUser;
    if (!user) {
        dispatch(updateBoardError());
    } else {
        dispatch(requestUpdateBoard());
        myFirebase.database()
            .ref('/board/')
            .child(board.boardId)
            .set(board).then(() => {
                dispatch(receiveUpdatedBoard());
            }).catch((err) => {
                dispatch(updateBoardError());
            });
    }
};

export const loadBoard = (uid) => dispatch => {
    console.log("requestBoard");
    // dispatch(requestBoard());
    // const board = {
    //     boardId: "-NdjpaVH4vldXr8jyEmP",
    //     title: "123",
    //     lists: [
    //       {
    //         id: "list1",
    //         title: "Todo",
    //       },
    //       {
    //         id: "list2",
    //         title: "woqu",
    //       },
    //       {
    //         id: "list3",
    //         title: "test",
    //       },
    //       {
    //         cards: [
    //           {
    //             id: "card1",
    //             text: "123",
    //             completed: false
    //           },
    //           {
    //             id: "card2",
    //             text: "456",
    //             completed: false
    //           },
    //           {
    //             id: "card3",
    //             text: "789",
    //             completed: false
    //           },
    //         ],
    //         id: "list4",
    //         title: "Todo",
    //       },
    //     ],
    //   };
    // dispatch(receiveBoard(board));

    myFirebase.database().ref('/board/' + uid).once('value').then(function (snapshot) {
        const board = {
            boardId: snapshot.val().boardId,
            lists: snapshot.val().lists,
        }
        dispatch(receiveBoard(board));
        console.log(board);
    }).catch((err) => {
        dispatch(receiveBoardError(uid));
    });
};

export const listenBoard = (uid) => dispatch => {
    myFirebase.database().ref('/board/' + uid).on('value', function (snapshot) {
        if (snapshot.val() != null) {
            const board = {
                boardId: snapshot.val().boardId,
                lists: snapshot.val().lists,
            }
            dispatch(receiveBoard(board));
        }
    });
};