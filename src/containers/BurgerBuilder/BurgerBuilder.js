import React, { Component } from 'react'

import Burger from './../../components/Burger/Burger'
import BuildControls from './../../components/Burger/BuildControls/BuildControls'
import Modal from './../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from './../../components/UI/Spinner/Spinner'
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler'

import axios from './../../axios-orders'

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(res => this.setState({ ingredients: res.data }))
            .catch(err => {
                this.setState({ error: true })
            })
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    }

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    }

    purchaseHandle = () => {
        this.setState({ purchasing: true })
    }
    purchaseCancelHandle = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandle = () => {
        this.setState({ loading: true })


        const queryParams = []
        for (let i in this.state.ingredients) {
            queryParams.push(
                encodeURIComponent(i)
                + '=' +
                encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: "?" + queryString
        })
    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummery = null
        let burger = this.state.error ? <p>ingredients can't be loaded</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        price={this.state.totalPrice}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        // purchasable={this.state.purchasable}
                        ordered={this.purchaseHandle}
                    />
                </>
            )

            orderSummery = <OrderSummary
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandle}
                purchaseContinued={this.purchaseContinueHandle}
                ingredients={this.state.ingredients} />
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

export default withErrorHandler(BurgerBuilder, axios);
