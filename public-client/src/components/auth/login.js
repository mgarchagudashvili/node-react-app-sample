import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from './../../actions/api';

class Login extends Component {
    handleFormSubmit({ email, password }) {
        this.props.loginUser({ email, password });
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
        const { handleSubmit, fields: { email, password }} = this.props;
        return (
            <div className="row">
                <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) } className="form-group">
                    { this.renderError() }

                    <div className="form-group">
                        <label>Email:</label>
                        <input { ...email } className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input { ...password } className="form-control" placeholder="password"/>
                    </div>
                    <button action="submit" className="btn btn-primary">
                        Log in
                    </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'login',
    fields:  ['email', 'password']
}, mapStateToProps, actions)(Login);