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
export const logout = () => ({
    type: actionsTypes.AUTH_INITIATE_LOGOUT
})

export const logoutSuccess = () => ({
    type: actionsTypes.AUTH_LOGOUT
})

export const checkoutTimeout = expirationTime => ({
    type: actionsTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime
})

export const auth = (email, password, isSignUp) => ({
    type: actionsTypes.AUTH_USER,
    email: email,
    password: password,
    isSignUp: isSignUp
})

export const setAuthRedirectPath = authRedirectPath => ({
    type: actionsTypes.SET_AUTH_REDIRECT_PATH,
    authRedirectPath: authRedirectPath
})

export const authCheckState = () => ({
    type: actionsTypes.AUTH_CHECK_STATE
})
