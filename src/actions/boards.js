import { myFirebase } from "../firebase/firebase";

export const CREATE_BOARD_REQUEST = "CREATE_BOARD_REQUEST";
export const CREATE_BOARD_SUCCESS = "CREATE_BOARD_SUCCESS";
export const CREATE_BOARD_FAIL = "CREATE_BOARD_FAIL";

export const GET_BOARDS_REQUEST = "GET_BOARDS_REQUEST";
export const GET_BOARDS_SUCCESS = "GET_BOARDS_SUCCESS";
export const GET_BOARDS_FAIL = "GET_BOARDS_FAIL";

export const GET_BOARD_NAME_SUCCESS = "GET_BOARD_NAME_SUCCESS";
export const DELETE_BOARD_SUCCESS = "DELETE_BOARD_SUCCESS";

export const SET_SELECTED_BOARD_TITLE = 'SET_SELECTED_BOARD_TITLE';

// Get Boards
const requestBoards = () => {
    return {
        type: GET_BOARDS_REQUEST
    };
};
const receiveBoards = (boards) => {
    return {
        type: GET_BOARDS_SUCCESS,
        payload: { boards },
    };
};
const receiveBoardsError = () => {
    return {
        type: GET_BOARDS_FAIL
    };
};

const deleteBoardSuccess = (boardId) => {
    return {
        type: DELETE_BOARD_SUCCESS,
        payload: boardId
    };
};

// Create Board
const requestCreateBoard = () => {
    return {
        type: CREATE_BOARD_REQUEST
    };
};
const receiveCreateBoard = (data) => {
    return {
        type: CREATE_BOARD_SUCCESS,
        payload: data
    };
};

const createBoardError = () => {
    return {
        type: CREATE_BOARD_FAIL
    };
};

// Listen Board Name
const receiveBoardName = (name, boardId) => {
    return {
        type: GET_BOARD_NAME_SUCCESS,
        payload: { name, boardId },
    };
};

export const createBoard = (title, userId) => async dispatch => {
    console.log("createBoard");
    dispatch(requestCreateBoard());
    const user = myFirebase.auth().currentUser;
    if (!user) {
        dispatch(createBoardError());
    } else {
        const uid = user.uid;
        const key = myFirebase.database().ref('boards/')
            .push({
                title: title
            }, (err) => {
                if (err) {
                    dispatch(createBoardError());
                }
            }).key;
        myFirebase.database().ref('boards/' + key + '/members').push({
            uid: uid
        });
        // add board owner logic
        myFirebase.database().ref('boards/' + key + '/owner').set({
            uid: uid
        });
        myFirebase.database().ref('/userBoards/' + uid).child(key).set(true);
        myFirebase.database().ref('/board/' + key).set({
            boardId: key,
            title: title,
            // lists: { 0: { id: '0', title: 'Todo' } },
        });
        console.log("receiveCreateBoard");
        dispatch(receiveCreateBoard({ uid: key, title: title, owner: userId }));

    }
};

export const deleteBoard = (boardId) => async dispatch => {
    // Get a list of all userIds from '/boards/boardId/members/' 
    // Go through that list and delete all occurrences of boardId in each userId
    console.log("deleteBoard");
    myFirebase.database().ref('/boards/' + boardId + '/members/').once('value', function (snapshot) {
        if (snapshot.exists()) {
            snapshot.forEach(function (data) {
                myFirebase.database().ref('/userBoards/' + data.val().uid).child(boardId).remove();
            })
        }
    }).then(() => {
        // remove from '/boards/'
        myFirebase.database().ref('/boards/' + boardId).remove();
        // remove from '/board/'
        myFirebase.database().ref('/board/' + boardId).remove().then(() => {
            dispatch(deleteBoardSuccess(boardId));
        });
    });
}

export const exitBoard = (boardId) => async dispatch => {
    // Get a list of all userIds from '/boards/boardId/members/' 
    // Go through that list and delete occurrences of boardId with specific userId
    console.log("exitBoard");
    const user = myFirebase.auth().currentUser;
    myFirebase.database().ref('/boards/' + boardId + '/members/').once('value', function (snapshot) {
        if (snapshot.exists()) {
            myFirebase.database().ref('/userBoards/' + user.uid).child(boardId).remove();
        }
    }).then(() => {
        dispatch(deleteBoardSuccess(boardId));
    });
}

export const loadUserBoards = () => async dispatch => {

    console.log("loadUserBoards");
    dispatch(requestBoards());
    const user = myFirebase.auth().currentUser;

    // Get list of boardIds from /userBoards/
    // Then get boards titles from /boards/ using the boardIds
    myFirebase.database().ref('/userBoards/' + user.uid).once('value')
    .then((snapshot) => {
        return new Promise( resolve => {
            let boards = [], i = 0;
            snapshot.forEach((data) =>{
                myFirebase.database().ref('/boards/' + data.key).once('value')
                .then((snap) => {
                    console.log(snap);
                    if (snap.exists()) {
                        boards.push({
                            boardId: data.key,
                            owner: snap.val().owner.uid,
                            title: snap.val().title,
                        });
                        console.log(data.key, snap.val().owner.uid, snap.val().title);
                    }
                    ++i;
                    if(i == snapshot.numChildren()) { resolve(boards); }
                });
            });
            if(snapshot.toJSON() === null) { resolve(boards); }
        });
    }).then((boards) =>{
        console.log("receiveBoards");
        console.log(boards);
        dispatch(receiveBoards(boards));
    }).catch((e) => {
        console.log(e);
        dispatch(receiveBoardsError());
    });
    
};

export const addUserToBoard = (email, boardId) => async dispatch => {
    const emailWithoutDot = email.replace(".", ",");
    // get userId from email
    var userToAdd;
    myFirebase.database().ref('/emailToUid/' + emailWithoutDot).child('userId').once('value', function (snapshot) {
        if (snapshot.exists()) {
            userToAdd = snapshot.val();
            // Add boardId as key so that the boardIds are not duplicated 
            // if a user is added to a board multiple times
            myFirebase.database().ref('/userBoards/' + userToAdd).child(boardId).set(true);
            // also add userid to members array
            myFirebase.database().ref('/boards/' + boardId + '/members/').push({
                uid: userToAdd
            })
        }
    });
    // // Todo: dispatch if Add was successful & display error message
}

export const updateBoardName = (boardName, boardId) => async dispatch => {
    myFirebase.database().ref('/boards/' + boardId).update({ title: boardName });
};

export const listenBoardName = (boardId) => async dispatch => {
    myFirebase.database().ref('/boards/' + boardId).on('value', function (snapshot) {
        if (snapshot.val() != null)
            dispatch(receiveBoardName(snapshot.val().title, boardId));
    });
};

export function setSelectedBoardTitle(title) {
    return {
      type: SET_SELECTED_BOARD_TITLE,
      payload: title
    };
}