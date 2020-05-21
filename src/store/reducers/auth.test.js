
import reducer from './auth'

import * as actionTypes from './../actions/actionTypes'

import { initialState } from './auth'

describe('auth reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should store the token upon login', () => {
        expect(reducer(initialState, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-user-id'
        })).toEqual({
            token: 'some-token',
            userId: 'some-user-id',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })

    })
})

