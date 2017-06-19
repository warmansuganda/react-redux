import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from './types';

import setAuthorizationToken from '../utils/setAuthorizationToken';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    }
}

export function userAuth(params) {
    return dispatch => {
        return axios.post('/api/users/auth', params).then(res => {
            const token = res.data.token;
            localStorage.setItem('jwtToken', token);

            dispatch(setCurrentUser(jwt.decode(token)));
            
        });
    }
}