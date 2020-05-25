import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import axios from './../../axios-orders'
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler'

import Order from './../../components/Order/Order'
import Spinner from './../../components/UI/Spinner/Spinner'

import * as actions from './../../store/actions/'

export default withErrorHandler(function Orders() {

        const orders = useSelector(state => state.order.orders)
        const loading = useSelector(state => state.order.loading)
        const token = useSelector(state => state.auth.token)
        
        const dispatch = useDispatch();
        const onFetchOrders = useCallback((token, userId) => dispatch(actions.fetchOrders(token, userId)), [dispatch])

        useEffect(() => {
            onFetchOrders(token, userId)
        }, [onFetchOrders, token, userId])

        let orderList = <Spinner />
        if (!loading) orderList =
            orders.map(order =>
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+ order.price} />)

        return <div>{orderList}</div>

    }, axios)
