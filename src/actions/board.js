import { myFirebase } from "../firebase/firebase";

export const GET_BOARD_REQUEST = "GET_BOARD_REQUEST";
export const GET_BOARD_SUCCESS = "GET_BOARD_SUCCESS";
export const GET_BOARD_FAIL = "GET_BOARD_FAIL";
export const GET_BOARD_MEMBERS_SUCCESS = "GET_BOARD_MEMBERS_SUCCESS";
export const GET_BOARD_MEMBERS_FAIL = "GET_BOARD_MEMBERS_FAIL";
export const GET_MEMBER_NAME_SUCCESS = "GET_MEMBER_NAME_SUCCESS";
export const GET_MEMBER_NAME_FAIL = "GET_MEMBER_NAME_FAIL";

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
                // dispatch(receiveUpdatedBoard());
            }).catch((err) => {
                dispatch(updateBoardError());
            });
        myFirebase.database()
            .ref('/board/' + board.boardId)
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
    return {
        type: DELETE_LIST,
        payload: { listID }
    };
};

export const addCard = (listID, text, id, createTime, createUser) => {
    return {
        type: ADD_CARD,
        payload: { text, listID, id, createTime, createUser },
    };
};

export const addCardToBoard = (board, listID, text, id, createTime, createUser) => dispatch => {
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
            .set({
                "text": text,
                "completed": false,
                "createTime": createTime,
                "createUser": createUser,
                "completeTime": null,
                "completeUser": null,
                "content": text
            }).then(() => {
                console.log("Add card successfully")
                dispatch(receiveUpdatedBoard());
                console.log("real id of newly created card: ", id);
                return id;
            }).catch((err) => {
                dispatch(updateBoardError());
            });
    }
};

export const updateCard = (cardID, listID, completed, completeTime, completeUser) => {
    return {
        type: UPDATE_CARD,
        payload: { cardID, listID, completed, completeTime, completeUser },
    };
};


export const updateCardToBoard = (board, cardID, listID, completed, completeTime, completeUser) => dispatch => {
    const user = myFirebase.auth().currentUser;
    console.log("card id: ", cardID);
    if (!user) {
        dispatch(updateBoardError());
    } else {
        // dispatch(requestUpdateBoard());
        myFirebase.database()
            .ref('/board/' + board.boardId + '/lists/'  + listID + '/cards/' + cardID)
            .get()
            .then(function (snap) {
                snap.ref.update({ 
                    "completed": !completed,
                    "completeTime": completeTime,
                    "completeUser": completeUser,
                });
            })
            .then(() => {
                // console.log(board.boardId, listID, cardID)
                console.log("Change card state successfully")
                dispatch(receiveUpdatedBoard());
            }).catch((err) => {
                dispatch(updateBoardError());
            });
    }
};

export const moveCardToBoard = (board, cardID, listID, new_listID) => dispatch => {
    const user = myFirebase.auth().currentUser;
    if (!user) {
        dispatch(updateBoardError());
    } else {
        // dispatch(requestUpdateBoard());
        var oldRef = myFirebase.database()
            .ref('/board/' + board.boardId + '/lists/'  + listID + '/cards/' + cardID);
        var newRef = myFirebase.database()
            .ref('/board/' + board.boardId + '/lists/'  + new_listID + '/cards/' + cardID);
        console.log(oldRef);
        console.log(newRef);
        oldRef.once('value').then(snap => {
                newRef.set(snap.val());
            })
            .then(() => {
                if ('/board/' + board.boardId + '/lists/'  + listID + '/cards/' + cardID !== '/board/' + board.boardId + '/lists/'  + new_listID + '/cards/' + cardID) {
                    oldRef.set(null);
                }
                console.log("old, new", '/board/' + board.boardId + '/lists/'  + listID + '/cards/' + cardID !== '/board/' + board.boardId + '/lists/'  + new_listID + '/cards/' + cardID);
            })
            .then(() => {
                // console.log(board.boardId, listID, cardID)
                console.log("move card successfully")
                dispatch(receiveUpdatedBoard());
            }).catch((err) => {
                dispatch(updateBoardError());
            });
    }
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
export const receiveBoardMembers = (members) => {
    return {
        type: GET_BOARD_MEMBERS_SUCCESS,
        payload: { members },
    };
};

export const receiveBoardMembersError = (uid) => {
    return {
        type: GET_BOARD_MEMBERS_FAIL,
        payload: { uid },
    };
};
export const receiveMemberName = (name) => {
    return {
        type: GET_MEMBER_NAME_SUCCESS,
        payload: { name },
    };
};

export const receiveMemberNameError = (uid) => {
    return {
        type: GET_MEMBER_NAME_FAIL,
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


export const moveCard = (
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
    dispatch(requestBoard());

    myFirebase.database().ref('/board/' + uid).once('value').then(function (snapshot) {
        let board = {};
        console.log(snapshot.val());

        // transform firbase storage format to local format
        const formatedLists = [];
        if(snapshot.val().lists !== undefined){
            for (const [boardId, board] of Object.entries(snapshot.val().lists)) {
                const formatedCards = [];
                if(board.cards !== undefined){
                    for (const [cardId, card] of Object.entries(board.cards)){
                        console.log("haha", card);
                        const curCard = {
                            id: cardId,
                            text: card.text,
                            createTime: card.createTime,
                            createUser: card.createUser,
                            completed: card.completed,
                            completeTime: card.completeTime,
                            completeUser: card.completeUser,
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
        board.boardId = snapshot.val().boardId;
        board.title = snapshot.val().title;
        board.lists = formatedLists;

        return board;
    }).then((board)=>{
        console.log("dispatch");
        console.log(board);
        dispatch(receiveBoard(board));
    }).catch((err) => {
        dispatch(receiveBoardError(uid));
    });
};

export const loadBoardMembers = (boardId, uid) => dispatch => {
    myFirebase.database().ref('/boards/' + boardId + '/members/').once('value', function (snapshot) {
        const members = [];
        snapshot.forEach((snap) => {
            members.push(snap.val().uid);
        });
        return members;
    }).then((members)=>{
        console.log("members");
        console.log(members);
        dispatch(receiveBoardMembers(members));
    }).catch((err) => {
        dispatch(receiveBoardMembersError(uid));
    });
}

export const convertUIDtoName = (uid) => dispatch => {
    var name;
    myFirebase.database().ref('/users/' + uid).once('value', function (snapshot) {
        name = snapshot.val().name;
        return name
    }).then((name)=>{
        console.log("name");
        console.log(name);
        dispatch(receiveMemberName(name));
    }).catch((err) => {
        dispatch(receiveMemberNameError(name));
    });
}

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

// function moveFbRecord(oldRef, newRef) {    
//     return Promise((resolve, reject) => {
//          oldRef.once('value').then(snap => {
//               return newRef.set(snap.val());
//          }).then(() => {
//               return oldRef.set(null);
//          }).then(() => {
//               console.log('move done!');
//               resolve();
//          }).catch(err => {
//               console.log(err.message);
//               reject();
//          });
//     })
// }