import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavigationBar from '../NavigationBar';
import SignupForm from './SignupForm';
import { userSignupRequest } from '../../action/signupActions';

class SignupPage extends React.Component {
    render() {
        const { userSignupRequest } = this.props;

        return (
            <div>
                <NavigationBar />
                <div className="jumbotron">
                    <SignupForm userSignupRequest={userSignupRequest} />
                </div>
            </div>
        )
    }
}

SignupPage.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
}

export default connect(null, {userSignupRequest})(SignupPage);