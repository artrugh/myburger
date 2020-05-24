import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// COMPONENTS
import Burger from './../../components/Burger/Burger'
import BuildControls from './../../components/Burger/BuildControls/BuildControls'
import Modal from './../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from './../../components/UI/Spinner/Spinner'
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler'

import * as actions from './../../store/actions/index';

import axios from './../../axios-orders'

export const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);

    // STATE
    const ingredients = useSelector(state => state.burgerBuilder.ingredients)
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice)
    const error = useSelector(state => state.burgerBuilder.error)
    const isAuth = useSelector(state => state.auth.token !== null)

    // DIPATCH FUNCTIONS
    const dispatch = useDispatch();
    const onIngredientAdded = ingredientName => dispatch(actions.addIngredient(ingredientName))
    const onIngredientRemove = ingredientName => dispatch(actions.removeIngredient(ingredientName))
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch])
    const onInitPurchase = () => dispatch(actions.purchaseInit())
    const onSetAuthRedirectPath = path => dispatch(actions.setAuthRedirectPath(path))

    useEffect(() => { onInitIngredients() }, [onInitIngredients])

    // HANDLER EVENTS
    const purchaseHandle = () => {
        if (isAuth) {
            setPurchasing(true)
        } else {
            onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }
    const purchaseCancelHandle = () => setPurchasing(false)

    const purchaseContinueHandle = () => {
        onInitPurchase()
        props.history.push('/checkout')
    }

    // PRERENDER
    const disabledInfo = {
        ...ingredients
    }

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummery = null
    let burger = error ? <p>ingredients can't be loaded</p> : <Spinner />

    if (ingredients) {
        burger = (
            <>
                <Burger ingredients={ingredients} />
                <BuildControls
                    price={totalPrice}
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemove}
                    disabled={disabledInfo}
                    isAuth={isAuth}
                    ordered={purchaseHandle}
                />
            </>
        )

        orderSummery = <OrderSummary
            price={totalPrice}
            purchaseCancelled={purchaseCancelHandle}
            purchaseContinued={purchaseContinueHandle}
            ingredients={ingredients} />
    }

    // if (props.isLoading) {
    //     orderSummery = <Spinner />
    // }

    return (
        <>
            <Modal
                modalClosed={purchaseCancelHandle}
                show={purchasing}>
                {orderSummery}
            </Modal>
            {burger}
        </>
    )
}

export default withErrorHandler(BurgerBuilder, axios);
