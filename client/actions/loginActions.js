import axios from 'axios';

export function userAuth(params) {
    return dispatch => {
        return axios.post('/api/users/auth', params);
    }
}