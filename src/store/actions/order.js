import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
})

export const purchaseBurgerFailed = err => ({
    type: actionTypes.PURCHASE_BURGER_FAILED,
    err: err
})

export const purchaseBurgerStart = () => ({
    type: actionTypes.PURCHASE_BURGER_START
})

export const purchaseBurger = (orderData, token) => ({
    type: actionTypes.PURCHASE_BURGER,
    orderData: orderData,
    token: token
})

export const purchaseInit = () => ({
    type: actionTypes.PURCHASE_INIT
})

export const fetchOrdersStart = () => ({
    type: actionTypes.FETCH_ORDERS_START
})

export const fetchOrdersSuccess = orders => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
})

export const fetchOrdersFailed = () => ({
    type: actionTypes.FETCH_ORDERS_FAILED
})

export const fetchOrders = (token, userId) => ({
    type: actionTypes.FETCH_ORDERS,
    token: token,
    userId: userId
})