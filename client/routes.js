import React from 'react';
import { Route } from 'react-router-dom';

import Greeting from './components/Greeting';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';

export default (
    <div>
        <Route exact path="/" component={Greeting} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
    </div>
);