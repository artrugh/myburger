import { put } from 'redux-saga/effects'

import * as actions from './../actions/index'
import axios from './../../axios-orders'

// FUNCTIONALITY
// COMBINE ACTIONS

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart())
    try {
        const res = yield axios.post('/orders.json?auth=' + action.token, action.orderData)
        yield put(actions.purchaseBurgerSuccess(res.data.name, action.orderData))

    } catch (err) {
        yield put(actions.purchaseBurgerFailed(err))
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    try {
        const url = `/orders.json?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
        const res = yield axios.get(url)
        const fetchedOrders = [];
        for (let key in res.data) {
            fetchedOrders.push({
                ...res.data[key],
                id: key
            })
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders))

    } catch (err) {
        yield put(actions.fetchOrdersFailed(err))
    }
}

