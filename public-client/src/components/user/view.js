import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/api';

class UserView extends Component {
    componentDidMount () {
        this.props.getUser(this.props.params.id);
    }

    renderUserLogins (userLogins = []) {
        if (userLogins.length === 0) {
            return ' No logins';
        }

        return userLogins.map((login, index) => {
            return (
                <li key={ index }>
                    { login.loginDate }
                </li>
            );
        });

    }

    render () {
        const { user } = this.props;
        return (
            <div className="content-block">
                <h1>User Log in dates</h1>
                <ol>
                    { user ? this.renderUserLogins(user.logIns) : '' }
                </ol>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return { user: state.auth.user };
}

export default connect(mapStateToProps, actions)(UserView);
