import React, { Component } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummery from './../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'


const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
})

export default withRouter(connect(mapStateToProps)
    (class Checkout extends Component {

        checkoutCancelledHandler = () => {
            this.props.history.goBack()
        }
        checkoutContinuedHandler = () => {
            this.props.history.replace('/checkout/contact-data')
        }

        render() {

            let summary = <Redirect to="/" />

            if (this.props.ingredients) {

                const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null

                summary = <div>
                    {purchasedRedirect}
                    <CheckoutSummery
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                        ingredients={this.props.ingredients} />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            }
            return summary
        }
    }))
