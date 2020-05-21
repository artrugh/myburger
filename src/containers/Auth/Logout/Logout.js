import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './../../../store/actions/index'

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(actions.logout())
})

export default connect(null, mapDispatchToProps)(class Logout extends Component {

    componentDidMount() {
        this.props.onLogout()
    }
    render() {
        return <Redirect to="/" />
    }
})

