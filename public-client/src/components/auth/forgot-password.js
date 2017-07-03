import React, { Component } from 'react';

class ForgotPassword extends Component {
    render() {

    }
}

export default reduxForm({
    form: 'forgot-password',
    fields:  ['email']
})(ForgotPassword);