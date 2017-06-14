import React from 'react';
import { Route } from 'react-router-dom';

import Greeting from './components/Greeting';
import SignupPage from './components/signup/SignupPage';

export default (
    <div>
        <Route exact path="/" component={Greeting} />
        <Route path="/signup" component={SignupPage} />
    </div>
);