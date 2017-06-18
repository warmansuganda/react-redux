import React from 'react';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {withRouter} from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import timezones from '../../data/timezones';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            isLoading: false,
            invalid: 0,
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            timezone: ''
        }

        this.onChange = this
            .onChange
            .bind(this);
        this.onSubmit = this
            .onSubmit
            .bind(this);
        this.checkUserExist = this
            .checkUserExist
            .bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    checkUserExist(e) {
        const field = e.target.name;
        const val = e.target.value;

        if (!isEmpty(val)) {
            this
                .props
                .isUserExist(val, field)
                .then(res => {
                    let errors = this.state.errors;
                    let invalid = this.state.invalid;
                    if (res.data.user) {
                        errors[field] = 'There is user with such ' + field;
                        invalid++;
                    } else {
                        errors[field] = '';
                        if (invalid > 0) {
                            invalid--;
                        }
                    }
                    
                    this.setState({errors, invalid});
                });
        }

    }

    isValid() {
        const {errors, isValid} = validateInput(this.state);
        if (!isValid) {
            this.setState({errors});
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        // console.log(this.state);
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            this
                .props
                .userSignupRequest(this.state)
                .then(() => {
                    this
                        .props
                        .addFlashMessage({type: 'success', text: 'You signed up successfuly. Welcome!'});
                    this
                        .props
                        .history
                        .push('/');
                }, (err) => this.setState({errors: err.response.data, isLoading: false}));
        }
    }

    render() {
        const {errors} = this.state;
        const optTimezone = map(timezones, (val, key) => <option key={val} value={val}>{key}</option>
        );
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join with our community!</h1>

                <TextFieldGroup
                    label="Username"
                    field="username"
                    value={this.state.username}
                    error={errors.username}
                    checkUnique={this.checkUserExist}
                    onChange={this.onChange}/>

                <TextFieldGroup
                    label="Email"
                    field="email"
                    value={this.state.email}
                    error={errors.email}
                    checkUnique={this.checkUserExist}
                    onChange={this.onChange}/>

                <TextFieldGroup
                    label="Password"
                    field="password"
                    type="password"
                    value={this.state.password}
                    error={errors.password}
                    onChange={this.onChange}/>

                <TextFieldGroup
                    label="Password Confirmation"
                    field="passwordConfirmation"
                    type="password"
                    value={this.state.passwordConfirmation}
                    error={errors.passwordConfirmation}
                    onChange={this.onChange}/>

                <div className={classnames('form-group', {'has-error': errors.timezone})}>
                    <label className="control-label">Timezone</label>
                    <select
                        name="timezone"
                        value={this.state.timezone}
                        onChange={this.onChange}
                        className="form-control">
                        <option value="" disabled>Select your timezone</option>
                        {optTimezone}
                    </select>

                    {errors.timezone && <span className="help-block">{errors.timezone}</span>}
                </div>

                <div className="form-group">
                    <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">Sign Up</button>
                </div>

            </form>
        );
    }
}

SignupForm.propTypes = {
    history: PropTypes.object.isRequired,
    userSignupRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    isUserExist: PropTypes.func.isRequired
}

export default withRouter(SignupForm);