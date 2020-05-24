import React from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import CheckoutSummery from './../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'


export default withRouter(function Checkout(props) {

    const ingredients = useSelector(state => state.burgerBuilder.ingredients)
    const purchased = useSelector(state => state.order.purchased)

    const checkoutCancelledHandler =() => {
        props.history.goBack()
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

    let summary = <Redirect to="/" />

    if (ingredients) {
        const purchasedRedirect = purchased ? <Redirect to="/" /> : null
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummery
                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}
                    ingredients={ingredients} />
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        )
    }
    return summary
})