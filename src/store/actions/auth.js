import axios from 'axios';

import { apiKey } from './../../keys'

import * as actionsTypes from './actionTypes'

export const authStart = () => ({
    type: actionsTypes.AUTH_START
})

export const authSuccess = (idToken, userId) => ({
    type: actionsTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId
})

export const authFailed = error => ({
    type: actionsTypes.AUTH_FAILED,
    error: error
})
export const logout = () => {
    localStorage.removeItem('expiration')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    return {
        type: actionsTypes.AUTH_LOGOUT
    }
}
export const checkoutTimeout =
    expirationTime =>
        dispatch =>
            setTimeout(() => dispatch(logout()), expirationTime * 1000)


export const auth = (email, password, isSignUp) => dispatch => {

    dispatch(authStart())

    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='

    if (!isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
    }
    axios.post(`${url}${apiKey}`,
        authData)
        .then(res => {
            const idToken = res.data.idToken;
            const userId = res.data.localId
            const expiresIn = res.data.expiresIn
            const expiration = new Date(new Date().getTime() + expiresIn * 1000)
            localStorage.setItem('token', idToken)
            localStorage.setItem('userId', userId)
            localStorage.setItem('expiration', expiration)
            dispatch(authSuccess(idToken, userId))
            dispatch(checkoutTimeout(expiresIn))

        })
        .catch(err => {
            console.log(err.response.data.error.message);
            dispatch(authFailed(err.response.data.error))
        })
}

export const setAuthRedirectPath = authRedirectPath => ({
    type: actionsTypes.SET_AUTH_REDIRECT_PATH,
    authRedirectPath: authRedirectPath
})

export const authCheckState = () => dispatch => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expiration = new Date(localStorage.getItem('expiration'))
    if (!token) {
        dispatch(logout())
    } else {
        if (expiration <= new Date()) {
            dispatch(logout())
        } else {
            dispatch(authSuccess(token, userId))
            dispatch(checkoutTimeout((expiration.getTime() - new Date().getTime()) / 1000))
        }
    }
}
