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
            console.log(user._id)
            return (
                <li key={ user._id }>
                    <a href={'/users/' + user._id}>
                        { user.email }
                    </a>
                </li>
            );
        });

    };
    render() {
        let { users } = this.props;
        console.log(this.props)

        return (
            <div className="content-block">
                <ol>
                    { this.renderUsers(users) }
                </ol>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.auth.users
    };
}

export default connect(mapStateToProps, actions)(UserList);
