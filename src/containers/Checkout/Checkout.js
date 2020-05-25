import React from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'

// REAXT-REDUX
import { useSelector } from 'react-redux'

// COMPONENTS
import CheckoutSummery from './../../components/Order/CheckoutSummary/CheckoutSummary'
// CONTACT INITIL DATA
import ContactData from './ContactData/ContactData'

export default withRouter(function Checkout(props) {

    // REDUCERS
    const ingredients = useSelector(state => state.burgerBuilder.ingredients)
    const purchased = useSelector(state => state.order.purchased)

    // HANDLERS EVENTS
    const checkoutCancelledHandler = () => {
        props.history.goBack()
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

    // IF THERE ARE INGREDIENTS TO BUILD THE BURGER
    let summary
    if (ingredients) {
        // WHEN THE ORDER HAS BEEN PURCHASED REDIRECT
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
    } else {
        summary = <Redirect to="/" />
    }

    return summary
})