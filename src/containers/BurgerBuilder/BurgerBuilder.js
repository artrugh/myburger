import React, { Component } from 'react'
import { connect } from 'react-redux'

import Burger from './../../components/Burger/Burger'
import BuildControls from './../../components/Burger/BuildControls/BuildControls'
import Modal from './../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from './../../components/UI/Spinner/Spinner'
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler'

import * as actions from './../../store/actions/index';

import axios from './../../axios-orders'

export class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    purchaseHandle = () => {
        if (this.props.isAuth) {
            this.setState({ purchasing: true })
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }
    purchaseCancelHandle = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandle = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    render() {

        const disabledInfo = {
            ...this.props.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }


        let orderSummery = null
        let burger = this.props.error ? <p>ingredients can't be loaded</p> : <Spinner />

        if (this.props.ingredients) {
            burger = (

                <>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        price={this.props.totalPrice}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemove}
                        disabled={disabledInfo}
                        isAuth={this.props.isAuth}
                        ordered={this.purchaseHandle}
                    />
                </>
            )

            orderSummery = <OrderSummary
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandle}
                purchaseContinued={this.purchaseContinueHandle}
                ingredients={this.props.ingredients} />
        }

        if (this.state.loading) {
            orderSummery = <Spinner />
        }

        return (
            <>
                <Modal
                    modalClosed={this.purchaseCancelHandle}
                    show={this.state.purchasing}>
                    {orderSummery}
                </Modal>
                {burger}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null,
        redirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingredientName => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemove: ingredientName => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
