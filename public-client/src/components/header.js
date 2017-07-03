import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
    renderLinks () {
        if (this.props.authenticated) {
            return [
                <li key={1}><a href="/users">Users list</a></li>,
                <li key={2}><a href="/logout">Log out</a></li>
            ];
        }

        return [
            <li key={1}><a href="/login">Log in</a></li>,
            <li key={2}><a href="/register">Create an account</a></li>
        ];
    }

    render () {
        return (
            <nav className="navbar">
                <ul className="list-unstyled pull-right">
                    { this.renderLinks() }
                </ul>
            </nav>
        );
    }
}

function mapStateToProps (state) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(Header);
