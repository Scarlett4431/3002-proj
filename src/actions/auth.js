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

const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    };
};

const receiveLogin = user => {
    return {
        type: LOGIN_SUCCESS,
        user
    };
};

const loginError = (message) => {
    return {
        type: LOGIN_FAILURE,
        message
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
        user
    }
}

const registerError = (message) => {
    return {
        type: REGISTER_FAILURE,
        message
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

export const loginUser = (email, password, callback, dir) => async dispatch => {

    // // code to check frontend logic
    // console.log("LoginUser")
    // dispatch(requestLogin());
    // console.log('requestLogin');
    // dispatch(receiveLogin({
    //     name: 'Ringo',
    //     email: 'rdl@nb.com',
    // }));
    // console.log('receiveLogin');
    // callback();

    // code with firebase backend

    dispatch(requestLogin());
    myFirebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            console.log("LoginSuccess");
            console.log(myFirebase.auth().currentUser);
            dispatch(receiveLogin(user.user));
            console.log("Prepare Redirect");
            callback(dir);
        })
        .catch(error => {
            //Do something with the error if you want!
            console.log("LoginFail");
            dispatch(loginError(error.code));
        });
};

export const registerUser = (email, password, displayName, callback, dir) => async dispatch => {

    // // code to check frontend logic
    // console.log(displayName, email, password);
    // console.log("Register User")
    // dispatch(requestRegister());
    // console.log('requestRegister');
    // dispatch(receiveRegister({
    //     name: 'Ringo',
    //     email: 'rdl@nb.com',
    // }));
    // console.log('receiveRegister');
    // callback();

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
                    name: name
                });
                myFirebase.database().ref('/emailToUid/').child(email).set({
                    userId
                })
                dispatch(receiveRegister());
                callback(dir);
            });
        })
        .catch(error => {
            // Do something with the error if you want!
            dispatch(registerError(error.message));
        });
};

export const logoutUser = () => async dispatch => {

    // code to check frontend logic
    dispatch(requestLogout());
    console.log('requestLogout');
    // dispatch(receiveLogout());
    // console.log('receiveLogout');

    // code with firebase backend
    
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
    // dispatch(loginError());
    // dispatch(verifyRequest());
    // console.log('verifyRequest');
    // dispatch(receiveLogin({
        //     name: 'Ringo',
        //     email: 'rdl@nb.com',
        // }));
        // console.log('receiveLogin');
        // dispatch(verifySuccess());
        // console.log('verifySuccess');

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