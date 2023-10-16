import { myFirebase } from "../firebase/firebase";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

export const FINISH_TUTORIAL_SUCCESS = "FINISH_TUTORIAL_SUCCESS";


const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    };
};

 const receiveLogin = (user, newcomerStatus) => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            user : user,
            newcomerStatus : newcomerStatus
        }
    };
};

const loginError = (message) => {
    return {
        type: LOGIN_FAILURE,
        payload: {
            message : message
        }
    };
};

const requestRegister = () => {
    return {
        type: REGISTER_REQUEST
    };
};

const receiveRegister = user => {
    return {
        type: REGISTER_SUCCESS,
        payload: {
            user : user
        }
    }
}

const registerError = (message) => {
    return {
        type: REGISTER_FAILURE,
        payload: {
            message : message
        }
    };
};

const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

const logoutError = () => {
    return {
        type: LOGOUT_FAILURE
    };
};

const verifyRequest = () => {
    return {
        type: VERIFY_REQUEST
    };
};

const verifySuccess = () => {
    return {
        type: VERIFY_SUCCESS
    };
};

const finishTutorialSuccess = (newcomerStatus) => {
    return {
        type: FINISH_TUTORIAL_SUCCESS,
        payload: {
            newcomerStatus: newcomerStatus
        }
    };
};


export const loginUser = (email, password, callback, dir) => async dispatch => {

    // code with firebase backend

    dispatch(requestLogin());
    myFirebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            myFirebase.database().ref('/users/' + user.user.uid + '/newcomer/').on('value', (snapshot) => {
                const newcomerStatus = snapshot.val();
                console.log("LoginSuccess");
                console.log(user.user.uid, "newcomer:", newcomerStatus);
                dispatch(receiveLogin(user.user, newcomerStatus));
                console.log("Prepare Redirect");
                callback(dir);
            })
        })
        .catch(error => {
            //Do something with the error if you want!
            console.log("LoginFail");
            console.log(error);
            dispatch(loginError(error.code));
        });
};

export const registerUser = (email, password, displayName) => async dispatch => {

    // code with firebase backend

    dispatch(requestRegister());
    myFirebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            userCredential.user.updateProfile({
                displayName: displayName,
            }).then(() => {
                const email = userCredential.user.email.replaceAll(".", ","); // cannot save "." in DB
                const userId = userCredential.user.uid;
                const name = userCredential.user.displayName;
                myFirebase.database().ref('/users/' + userId).set({
                    email: email,
                    name: name,
                    newcomer: true,
                });
                myFirebase.database().ref('/emailToUid/').child(email).set({
                    userId
                })
                dispatch(receiveRegister({email : email}));
            });
        })
        .catch(error => {
            // Do something with the error if you want!
            dispatch(registerError(error.message));
        });
};

export const finishTutorial = (userId) => async dispatch => {
    myFirebase.database().ref('/users/' + userId).set({
        newcomer: false
    });
    console.log("tutorial finished for newcomer");
    dispatch(finishTutorialSuccess(false));
};

export const logoutUser = () => async dispatch => {
    
    // code with firebase backend

    dispatch(requestLogout());
    console.log('requestLogout');
    
    myFirebase
        .auth()
        .signOut()
        .then(() => {
            dispatch(receiveLogout());
        })
        .catch(error => {
            //Do something with the error if you want!
            dispatch(logoutError());
        });
};

export const verifyAuth = () => async dispatch => {

    // code to check frontend logic
    // currently always assume saved account info auth fail

    console.log("verifyAuth");

    // code with firebase backend
    dispatch(verifyRequest());
    myFirebase.auth().onAuthStateChanged(user => {
        if (user !== null) {
        console.log("userNotNull");
        console.log(user);
        dispatch(receiveLogin(user));
        console.log("receiveLogin");
        dispatch(verifySuccess());
        console.log("verifySuccess");
        } else {
            dispatch(loginError());
        }
    });
};

  


  