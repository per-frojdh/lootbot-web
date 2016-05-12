import {ApiHelper} from '../helpers/apiHelper';
import {LOGIN, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL} from '../constants/ActionTypes';

export function login(username, password) {
    return {
        types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
        promise: ApiHelper.login('auth', {username, password}, ),
        username,
    };
}

export function logout() {
    return {
        types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
        promise: ApiHelper.logout('auth'),
    };
}
