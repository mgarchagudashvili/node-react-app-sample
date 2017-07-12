import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/api';

class UserList extends Component {
    componentDidMount () {
        this.props.getUsers();
    }

    renderUsers (users = []) {
        if (users.length === 0) {
            return 'Nothing found';
        }

        return users.map((user) => {
            return (
                <li key={ user._id }>
                    <a href={'/users/' + user._id}>
                        { user.email }
                    </a>
                </li>
            );
        });
    }

    render () {
        const { users } = this.props;

        return (
            <div className="content-block">
                <ol>
                    { this.renderUsers(users) }
                </ol>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        users: state.auth.users
    };
}

export default connect(mapStateToProps, actions)(UserList);
