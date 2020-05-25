import { put, delay, call } from 'redux-saga/effects'
import axios from 'axios';

import { apiKey } from './../../keys'
import * as actions from './../actions/index'

// FUNCTIONALITY
// COMBINE ACTIONS

export function* logoutSaga() {
    yield call([localStorage, 'removeItem'], 'expiration')
    yield call([localStorage, 'removeItem'], 'token')
    yield call([localStorage, 'removeItem'], 'userId')
    yield put(actions.logoutSuccess())
}

export function* checkoutTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000)
    yield put(actions.logout())
}

export function* authUserSaga(action) {
    yield put(actions.authStart())

    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='

    if (!action.isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
    }

    try {
        const res = yield axios.post(`${url}${apiKey}`, authData)

        const idToken = res.data.idToken;
        const userId = res.data.localId
        const expiresIn = res.data.expiresIn
        const expiration = new Date(new Date().getTime() + expiresIn * 1000)
        yield call([localStorage, 'setItem'], 'token', idToken)
        yield call([localStorage, 'setItem'],'userId', userId)
        yield call([localStorage, 'setItem'], 'expiration',expiration)
        yield put(actions.authSuccess(idToken, userId))
        yield put(actions.checkoutTimeout(expiresIn))

    } catch (err) {
        console.log(err.response.data.error.message);
        yield put(actions.authFailed(err.response.data.error))
    }
}

export function* authCheckStateSaga() {
    const token = yield localStorage.getItem('token');
    const userId = yield localStorage.getItem('userId');
    const expiration = yield new Date(localStorage.getItem('expiration'))
    if (!token) {
        yield put(actions.logout())
    } else {
        if (expiration <= new Date()) {
            yield put(actions.logout())
        } else {
            yield put(actions.authSuccess(token, userId))
            yield put(actions.checkoutTimeout(
                (expiration.getTime() - new Date().getTime()) / 1000))
        }
    }
}