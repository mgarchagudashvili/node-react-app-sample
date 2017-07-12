import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class ForgotPassword extends Component {
    render () {

    }
}

export default reduxForm({
    form: 'forgot-password',
    fields: ['email']
})(ForgotPassword);
