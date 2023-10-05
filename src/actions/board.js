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

export const changeBoardTitleToBoard = (board, title) => dispatch => {
    const user = myFirebase.auth().currentUser;
    if (!user) {
        dispatch(updateBoardError());
    } else {
        // dispatch(requestUpdateBoard());
        myFirebase.database()
            .ref('/boards/' + board.boardId)
            .child("title")
            .set(title).then(() => {
                console.log(board.boardId, title)
                console.log("Change board title successfully")
                dispatch(receiveUpdatedBoard());
            }).catch((err) => {
                dispatch(updateBoardError());
            });
    }
};
export const changeBoardTitle = (title) => {
    return {
        type: CHANGE_BOARD_TITLE,
        payload: { title },
    };
};

export const addListToBoard = (board, title, id) => dispatch => {
    const user = myFirebase.auth().currentUser;
    console.log("list id: ", id);
    if (!user) {
        dispatch(updateBoardError());
    } else {
        // dispatch(requestUpdateBoard());
        // let id = myFirebase.database()
        //     .ref('/board/' + board.boardId + '/lists/')
        //     .push().key;
        myFirebase.database()
            .ref('/board/' + board.boardId + '/lists/' + id)
            .set({"title": title}).then(() => {
                console.log("Add list successfully")
                dispatch(receiveUpdatedBoard());
                console.log("real id of newly created list: ", id);
                return id;
            }).catch((err) => {
                dispatch(updateBoardError());
            });
    }
};
export const addList = (title, id) => {
    return {
        type: ADD_LIST,
        payload: { title, id },
    };
};

export const deleteListFromBoard = (board, listID) => dispatch => {
    const user = myFirebase.auth().currentUser;
    if (!user) {
        dispatch(updateBoardError());
    } else {
        // dispatch(requestUpdateBoard());
        myFirebase.database()
            .ref('/board/' + board.boardId + '/lists/'  + listID)
            .remove().then(() => {
                console.log(board.boardId, listID)
                console.log("Delete list successfully")
                dispatch(receiveUpdatedBoard());
            }).catch((err) => {
                dispatch(updateBoardError());
            });
    }
};
export const deleteList = (board, listID) => {
    deleteListFromBoard(board, listID);
    return {
        type: DELETE_LIST,
        payload: { listID }
    };
};

export const addCardToBoard = (board, listID, text, id) => dispatch => {
    const user = myFirebase.auth().currentUser;
    console.log("card id: ", id);
    if (!user) {
        dispatch(updateBoardError());
    } else {
        // dispatch(requestUpdateBoard());
        // let id = myFirebase.database()
        //     .ref('/board/' + board.boardId + '/lists/'  + listID + '/cards/')
        //     .push().key;
        myFirebase.database()
            .ref('/board/' + board.boardId + '/lists/'  + listID + '/cards/' + id)
            .set({"title": text, "completed": false}).then(() => {
                console.log("Add card successfully")
                dispatch(receiveUpdatedBoard());
                console.log("real id of newly created card: ", id);
                return id;
            }).catch((err) => {
                dispatch(updateBoardError());
            });
    }
};
export const addCard = (listID, text, id) => {
    return {
        type: ADD_CARD,
        payload: { text, listID, id },
    };
};

export const updateCardToBoard = (board, cardID, listID, completed) => dispatch => {
    const user = myFirebase.auth().currentUser;
    if (!user) {
        dispatch(updateBoardError());
    } else {
        // dispatch(requestUpdateBoard());
        myFirebase.database()
            .ref('/board/' + board.boardId + '/lists/'  + listID + '/cards/' + cardID)
            .child("completed")
            .set(completed).then(() => {
                console.log(board.boardId, listID, cardID, completed)
                console.log("Change card state successfully")
                dispatch(receiveUpdatedBoard());
            }).catch((err) => {
                dispatch(updateBoardError());
            });
    }
};
export const updateCard = (cardID, listID, completed) => {
    return {
        type: UPDATE_CARD,
        payload: { cardID, listID, completed },
    };
};

export const deleteCardFromBoard = (board, cardID, listID) => dispatch => {
    const user = myFirebase.auth().currentUser;
    if (!user) {
        dispatch(updateBoardError());
    } else {
        // dispatch(requestUpdateBoard());
        myFirebase.database()
            .ref('/board/' + board.boardId + '/lists/'  + listID + '/cards/' + cardID)
            .remove().then(() => {
                console.log(board.boardId, listID, cardID)
                console.log("Delete card successfully")
                dispatch(receiveUpdatedBoard());
            }).catch((err) => {
                dispatch(updateBoardError());
            });
    }
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
    const board = {};

    myFirebase.database().ref('/board/' + uid).once('value').then(function (snapshot) {
        console.log(snapshot.val());
        const formatedLists = [];
        if(snapshot.val().lists !== undefined){
            for (const [boardId, board] of Object.entries(snapshot.val().lists)) {
                const formatedCards = [];
                if(board.cards !== undefined){
                    for (const [cardId, card] of Object.entries(board.cards)){
                        const curCard = {
                            id: cardId,
                            text: card.title,
                            completed: card.completed,
                        };
                        formatedCards.push(curCard);
                    };
                }
                const curBoard = {
                    id: boardId,
                    title: board.title,
                    cards: formatedCards,
                };
                formatedLists.push(curBoard);
            };
        }
        console.log(formatedLists);
        board.boardId = snapshot.val().boardId;
        board.title = snapshot.val().title;
        board.lists = formatedLists;
        console.log(board);
        console.log(snapshot.val());
    }).then(()=>{
        console.log("dispatch");
        dispatch(receiveBoard(board));
    }).catch((err) => {
        console.log(err);
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