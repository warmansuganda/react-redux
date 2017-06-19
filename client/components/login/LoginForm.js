import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../server/shared/validations/login';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : '',
            isLoading: false,
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    isValid() {
        let {errors, isValid} = validateInput(this.state);
        if (!isValid) {
            this.setState({errors});
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true});
            this.props.userAuth(this.state).then(
                (res) => {
                    this
                        .props
                        .history
                        .push('/');
                },
                (err) => {
                    this.setState({errors: err.response.data.errors, isLoading: false})
                }
            );
        }
    }

    render() {
        const {username, password, errors} = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login Form</h1>

                {errors.form && <div className="alert alert-danger">{errors.form}</div>}

                <TextFieldGroup
                    label="Username / Email"
                    field="username"
                    value={username}
                    error={errors.username}
                    onChange={this.onChange}
                />
                <TextFieldGroup
                    label="Password"
                    field="password"
                    type="password"
                    value={password}
                    error={errors.password}
                    onChange={this.onChange}
                />

                <div className="form-group">
                    <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">Sign Up</button>
                </div>
            </form>
        );
    }
}

LoginForm.propTypes = {
    userAuth: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
}

export default withRouter(LoginForm);