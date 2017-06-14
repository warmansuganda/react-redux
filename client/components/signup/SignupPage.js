import React from 'react';
import NavigationBar from '../NavigationBar';

import SignupForm from './SignupForm';

class SignupPage extends React.Component {
    render() {
        return (
            <div>
                <NavigationBar />
                <div className="jumbotron">
                    <SignupForm />
                </div>
            </div>
        )
    }
}

export default SignupPage;