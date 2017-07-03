import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/api';

class Register extends Component {
    handleFormSubmit(formProps) {
        this.props.registerUser(formProps);
    }

    renderError() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Error: </strong> { this.props.errorMessage }
                </div>
            );
        }
    }

    render() {
        const { handleSubmit, fields: { email, password, confirmPassword }} = this.props;

        return (
            <div className="row">
                <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) } className="form-group">
                    { this.renderError() }

                    <div className="form-group">
                        <label>Email:</label>
                        <input className="form-control" { ...email } />
                        { email.touched && email.error && <div className="error">{ email.error }</div>}
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input className="form-control" { ...password } type="password" />
                        { password.touched && password.error && <div className="error">{ password.error }</div>}
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input className="form-control" { ...confirmPassword } type="password" />
                        { confirmPassword.touched && confirmPassword.error && <div className="error">{ confirmPassword.error}</div> }
                    </div>
                    <button action="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        );
    }
}

function validate(formProps) {
    const errors = {};

    if (!formProps.email) {
        errors.email = 'Please enter an email';
    }

    if (!formProps.password) {
        errors.password = 'Please enter a password';
    }

    if (!formProps.confirmPassword) {
        errors.confirmPassword = 'Please enter a password confirmation';
    }

    if (formProps.password !== formProps.confirmPassword) {
        errors.password = 'Passwords have to match';
    }

    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'register',
    fields: ['email', 'password', 'confirmPassword'],
    validate
}, mapStateToProps, actions)(Register);
