import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    VERIFY_REQUEST,
    VERIFY_SUCCESS,
    FINISH_TUTORIAL_SUCCESS,
  } from "../actions/";

const initialState = {
    isLoading: false,
    loginError: false,
    logoutError: false,
    registerError: false,
    isAuthenticated: false,
    error: false,
    loginErrorMessage: '',
    registerErrorMessage: '',
    user: {},
    newcomerStatus: false,
};

function auth(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                loginError: false,
                loginErrorMessage: '',
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload.user,
                loginErrorMessage: '',
                newcomerStatus : action.payload.newcomerStatus,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loginErrorMessage: action.payload.message,
                isLoading: false,
                isAuthenticated: false,
                loginError: true
            };
        case REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true,
                registerError: false,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                user: action.payload.user
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                registerErrorMessage: action.payload.message,
                isLoading: false,
                isAuthenticated: false,
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: true,
                logoutError: false
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                user: {}
            };
        case LOGOUT_FAILURE:
            return {
                ...state,
                isLoading: false,
                logoutError: true
            };
        case VERIFY_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case VERIFY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true
            };
        case FINISH_TUTORIAL_SUCCESS:
            return {
                ...state,
                newcomerStatus: action.payload.newcomerStatus
            }
        default:
            return state;
    }
};

export default auth;