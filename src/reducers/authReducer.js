import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL} from '../constants/ActionTypes';

const initialState = {
    authenticated: (typeof sessionStorage.accessToken === 'undefined') ? false : true,
    user: sessionStorage.userName,
    loading: false,
};

export default function authenticated(state = initialState, action) {
    switch (action.type) {
    case LOGIN:
        return Object.assign({}, state, {
            loading: true,
            error: null,
        });
    case LOGIN_SUCCESS:
        return Object.assign({}, state, {
            authenticated: true,
            loading: false,
            user: action.username,
            error: null,
        });
    case LOGIN_FAIL:
        return Object.assign({}, state, {
            authenticated: false,
            user: null,
            loading: false,
            error: action.error.message,
        });
    case LOGOUT:
        return Object.assign({}, state, {
            loading: true,
            error: null,
        });
    case LOGOUT_SUCCESS:
        return Object.assign({}, state, {
            authenticated: false,
            loading: false,
            user: null,
            error: null,
        });
    case LOGOUT_FAIL:
        return Object.assign({}, state, {
            authenticated: false,
            loading: false,
            user: null,
            error: action.error.message,
        });
    default:
        return state;
    }
}
