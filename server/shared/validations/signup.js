import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

    if (Validator.isEmpty(data.username)) {
        errors.username = 'The field is required';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'The field is required';
    } else {
        if (!Validator.isEmail(data.email)) {
            errors.email = 'Email invalid';
        }
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'The field is required';
    }

    if (Validator.isEmpty(data.passwordConfirmation)) {
        errors.passwordConfirmation = 'The field is required';
    } else {
        if (!Validator.equals(data.password, data.passwordConfirmation)) {
            errors.passwordConfirmation = 'Password not match';
        }
    }

    if (Validator.isEmpty(data.timezone)) {
        errors.timezone = 'The field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
