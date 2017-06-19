import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(params) {
    let errors = {};

    if (Validator.isEmpty(params.username)) {
        errors.username = "This field is required";
    }

    if (Validator.isEmpty(params.password)) {
        errors.password = "This field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}