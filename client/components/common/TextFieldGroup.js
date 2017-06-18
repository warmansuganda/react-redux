import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({field, value, label, error, type, onChange, checkUnique}) => {
    
    return (
        <div className={classnames('form-group', {'has-error': error})}>
            <label className="control-label">{label}</label>
            <input 
                type={type} 
                name={field} 
                value={value}
                onChange={onChange}
                onBlur={checkUnique}
                className="form-control" />

            {error && <span className="help-block">{error}</span>}
        </div>
    );
}

TextFieldGroup.propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checkUnique: PropTypes.func,
}

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;