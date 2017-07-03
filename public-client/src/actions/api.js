import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    GET_USERS,
    GET_USER
} from './status';
// @todo: handle better way
const ROOT_URL = 'http://localhost:3000/api';

export function authError (error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function loginUser ({ email, password }) {
    return function (dispatch) {
        // Make login request to api
        axios.post(`${ROOT_URL}/user/login`, { email, password })
            .then((response) => {
                // Update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });

                // Save the JWT token
                localStorage.setItem('token', response.headers['x-auth']);

                // Redirect to the route '/users' list
                browserHistory.push('/users');
            })
            .catch((e) => {
                dispatch(authError(e));
            });
    };
}

export function registerUser ({ email, password }) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/user`, { email, password })
            .then((response) => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.headers['x-auth']);

                // Redirect to the route '/users' list
                browserHistory.push('/users');
            })
            .catch(response => dispatch(authError(response.data.error)));
    };
}

export function logoutUser () {
    localStorage.removeItem('token');

    return { type: UNAUTH_USER };
}

export function getUsers () {
    return function (dispatch) {
        axios.get(`${ROOT_URL}/user`, {
            headers: { 'x-auth': localStorage.getItem('token') }
        }).then((response) => {
            dispatch({
                type: GET_USERS,
                payload: response.data.data
            });
        }).catch(response => dispatch(authError(response)));
    };
}

export function getUser (id) {
    return (dispatch) => {
        axios.get(`${ROOT_URL}/user/${id}`, {
            headers: { 'x-auth': localStorage.getItem('token') }
        }).then((response) => {
            dispatch({
                type: GET_USER,
                payload: response.data.data
            });
        }).catch(response => dispatch(authError(response)));
    };
}

