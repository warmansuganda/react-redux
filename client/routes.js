import React from 'react';
import { Route } from 'react-router-dom';

import requireAuth from './utils/requireAuth';

import Greeting from './components/Greeting';
import SignupPage from './components/signup/SignupPage';
import LoginPage from './components/login/LoginPage';
import EventPage from './components/events/EventPage';

export default (
    <div>
        <Route exact path="/" component={Greeting} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/events" component={requireAuth(EventPage)} />
    </div>
);