import { takeEvery, takeLatest, all } from 'redux-saga/effects'

import * as actionsTypes from './../actions/actionTypes'
import {
    logoutSaga,
    checkoutTimeoutSaga,
    authUserSaga,
    authCheckStateSaga
} from './auth'

import {
    initIngredientSaga
} from './BurgerBuilder'

import {
    purchaseBurgerSaga,
    fetchOrdersSaga
} from './orders'

export function* watchAuth() {
    yield all([
        takeEvery(actionsTypes.AUTH_CHECK_TIMEOUT, checkoutTimeoutSaga),
        takeEvery(actionsTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionsTypes.AUTH_USER, authUserSaga),
        takeEvery(actionsTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ])
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionsTypes.INIT_INGREDIENTS, initIngredientSaga)
}

export function* watchOrders() {
    yield takeLatest(actionsTypes.PURCHASE_BURGER, purchaseBurgerSaga)
    yield takeEvery(actionsTypes.FETCH_ORDERS, fetchOrdersSaga)

}