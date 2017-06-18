import axios from 'axios';

export function userSignupRequest(userData) {
    return dispatch => {
        return axios.post('/api/users', userData);
    } 
}

export function isUserExist(identifier, field) {
    return dispatch => {
        return axios.get('/api/users/is-exist', {
            params: {
                identifier: identifier,
                field: field
            }
        });
    } 
}