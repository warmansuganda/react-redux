import React from 'react';
import map from 'lodash/map';
import PropTypes from 'prop-types';

import timezones from '../../data/timezones';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            email : '',
            password : '',
            passwordConfirmation : '',
            timezone : ''
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        // console.log(this.state);
        this.props.userSignupRequest(this.state);
    }

    render() {
        const optTimezone = map(timezones, (val, key) => 
            <option key={val} value={val}>{key}</option> 
        );
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join with our community!</h1>

                <div className="form-group">
                    <label className="control-label">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={this.state.username}
                        onChange={this.onChange}
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label className="control-label">Email</label>
                    <input 
                        type="text" 
                        name="email" 
                        value={this.state.email}
                        onChange={this.onChange}
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={this.state.password}
                        onChange={this.onChange}
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label className="control-label">Password Confirmation</label>
                    <input 
                        type="password" 
                        name="passwordConfirmation" 
                        value={this.state.passwordConfirmation}
                        onChange={this.onChange}
                        className="form-control" />
                </div>

                <div className="form-group">
                    <label className="control-label">Timezone</label>
                    <select
                        name="timezone" 
                        value={this.state.timezone}
                        onChange={this.onChange}
                        className="form-control">
                        <option value="" disabled>Select your timezone</option>
                        {optTimezone}
                    </select>
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-lg">Sign Up</button>
                </div>

            </form>
        );
    }
}

SignupForm.propTypes = {
    userSignupRequest: PropTypes.func.isRequired
}

export default SignupForm;