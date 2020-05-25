import * as actionTypes from './../actions/actionTypes';

import {
    purchaseInit,
    purchaseBurgerStart,
    purchaseBurgerSuccess,
    purchaseBurgerFailed,
    fetchOrdersSuccess,
} from './utilities'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.PURCHASE_INIT: return purchaseInit(state)

        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state)

        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)

        case actionTypes.PURCHASE_BURGER_FAILED: return purchaseBurgerFailed(state)

        case actionTypes.FETCH_ORDERS_START: return purchaseBurgerStart(state)

        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action)

        case actionTypes.FETCH_ORDERS_FAILED: return purchaseBurgerFailed(state)

        default: return state;
    }
}

export default reducer;