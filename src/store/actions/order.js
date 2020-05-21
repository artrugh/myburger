import * as actionTypes from './actionTypes';
import axios from './../../axios-orders'


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


export const purchaseBurger = (orderData, token) => dispatch => {
    dispatch(purchaseBurgerStart())
    axios.post('/orders.json?auth=' + token, orderData)
        .then(res => dispatch(purchaseBurgerSuccess(res.data.name, orderData)))
        .catch(err => {
            console.log(err);
            dispatch(purchaseBurgerFailed(err))
        })
}

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

export const fetchOrdersFailed = err => ({
    type: actionTypes.FETCH_ORDERS_FAILED
})

export const fetchOrders = (token, userId) => dispatch => {
    dispatch(fetchOrdersStart());

    const url = `/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios.get(url)
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        })
        .catch(err => dispatch(fetchOrdersFailed(err)))
}
