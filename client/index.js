import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import jwtDecode from 'jwt-decode';

import App from './components/App';
import rootReducer from './rootReducer';

import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/loginActions';

const store = createStore(
    // (state = {}) => state,
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

if (localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
}

render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('app'));