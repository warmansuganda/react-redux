import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavigationBar from '../NavigationBar';
import SignupForm from './SignupForm';
import { userSignupRequest, isUserExist } from '../../actions/signupActions';
import { addFlashMessage } from '../../actions/flashMessages';

class SignupPage extends React.Component {
    render() {
        const { userSignupRequest, addFlashMessage, isUserExist } = this.props;
        return (
            <div>
                <NavigationBar />
                <div className="jumbotron">
                    <SignupForm 
                    isUserExist={isUserExist}
                    userSignupRequest={userSignupRequest} 
                    addFlashMessage={addFlashMessage} />
                </div>
            </div>
        )
    }
}

SignupPage.propTypes = {
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isUserExist: PropTypes.func.isRequired,
}

export default connect(null, {userSignupRequest, addFlashMessage, isUserExist})(SignupPage);