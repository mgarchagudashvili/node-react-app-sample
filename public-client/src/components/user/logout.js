import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/api';

class Logout extends Component {
    componentWillMount () {
        this.props.logoutUser();
    }

    render () {
        return (
            <div className="content-block">
                Come back soon
            </div>
        );
    }
}

export default connect(null, actions)(Logout);
