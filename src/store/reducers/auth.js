import * as actionsTypes from './../actions/actionTypes';

import {
    authStart,
    authSuccess,
    authFailed,
    authLogout,
    setAuthRedirectPath
} from './utilities'

export const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}


const reducer = (state = initialState, action) => {
    switch (action.type) {

        case (actionsTypes.AUTH_START): return authStart(state)

        case (actionsTypes.AUTH_SUCCESS): return authSuccess(state, action)

        case (actionsTypes.AUTH_FAILED): return authFailed(state, action)

        case (actionsTypes.AUTH_LOGOUT): return authLogout(state)

        case (actionsTypes.SET_AUTH_REDIRECT_PATH): return setAuthRedirectPath(state, action)

        default: return state;
    }
}

export default reducer;