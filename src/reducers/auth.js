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
    FETCH_NEWCOMER_STATUS_SUCCESS,
    FETCH_NEWCOMER_STATUS_REQUEST,
    FETCH_NEWCOMER_STATUS_FAILURE,
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
    newcomerStatus: null,
    newcomerStatusLoading: false,
    newcomerStatusError: null
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
                user: action.user,
                loginErrorMessage: '',
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loginErrorMessage: action.message,
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
                isAuthenticated: true,
                user: action.user
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                registerErrorMessage: action.message,
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
                verifyingError: false
            };
        case VERIFY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true
            };
        case FETCH_NEWCOMER_STATUS_REQUEST:
            return{
                ...state,
                newcomerStatusLoading: true,
                newcomerStatusError: null,
            }
        case FETCH_NEWCOMER_STATUS_SUCCESS:
            return {
                ...state,
                newcomerStatus: action.newcomerStatus,
                newcomerStatusLoading: false,
                newcomerStatusError: null,
            };
        case FETCH_NEWCOMER_STATUS_FAILURE:
            return{
                ...state,
                newcomerStatus: null, // Reset newcomerStatus on failure
                newcomerStatusLoading: false,
                newcomerStatusError: action.error,
            }
        default:
            return state;
    }
};

export default auth;