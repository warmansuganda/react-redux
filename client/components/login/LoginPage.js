import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NavigationBar from '../NavigationBar';
import LoginForm from './LoginForm';
import { userAuth } from '../../actions/loginActions';

class LoginPage extends React.Component {
    render() {
        const {userAuth} = this.props;
        return (
            <div>
                <NavigationBar />
                <div className="jumbotron">
                    <LoginForm userAuth={userAuth} />
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    userAuth: PropTypes.func.isRequired
}

export default connect(null, {userAuth})(LoginPage);