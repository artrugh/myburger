import React, { useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';

// REACT-REDUX
import { useDispatch } from 'react-redux';
// ALL ACTIONS
import * as actions from './../../../store/actions/index'

export default function () {
    // DISPATCH ACTIONS
    const dispatch = useDispatch();
    const onLogout = useCallback(() => dispatch(actions.logout()), [dispatch])

    useEffect(() => { onLogout() }, [onLogout])
    
    return <Redirect to="/" />
}

