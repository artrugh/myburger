import React, { useState, useEffect, useCallback } from 'react'

// REACT-REDUX
import { useDispatch, useSelector } from 'react-redux'

// ALL ACTIONS
import * as actions from './../../store/actions/index';
// AXIOS INSTANCE
import axios from './../../axios-orders'

// COMPONENTS
import Burger from './../../components/Burger/Burger'
import BuildControls from './../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
// UI
import Modal from './../../components/UI/Modal/Modal'
import Spinner from './../../components/UI/Spinner/Spinner'
// WRAPPER
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler'

// EXPORT THE BURGERBUILDER TO TEST IT
// OTHERWISE THE WRAPPER UNABBLE THE TEST
export const BurgerBuilder = props => {

    // PURCHASING HOOK
    const [purchasing, setPurchasing] = useState(false);

    // REDUCERS
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

    // INIT THE INGREDIENT AFTER THE FIRST RENDER
    useEffect(() => { onInitIngredients() }, [onInitIngredients])

    // HANDLER EVENTS

    // PURCHASE
    const purchaseHandle = () => {
        // IF THE USER HAS ALREADY SIGNUP
        if (isAuth) {
            // THE ORDER IS AVAILABLE
            setPurchasing(true)
        } else {
            //OTHERWISE STORE THE PATH AND PUSH TO THE NECESSARY AUTH
            // THIS STORED PATH IS USED IN THE AUTH CONTAINER
            onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }

    // LEAVE THE PURCHASE AND HIDE THE MODEL = purchasing false
    const purchaseCancelHandle = () => setPurchasing(false)
    // CONTINUE
    const purchaseContinueHandle = () => {
        // SET THE PURCHASE = FALSE (INITIAL STATE)
        onInitPurchase()
        props.history.push('/checkout')
    }

    // DISABLED BUTTONS
    const getDisabledState = () => {
        const disabledInfo = { ...ingredients }
        // RETURN TRUE || FALSE BASED IN QUANTITY
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return disabledInfo
    }

    // PRERENDER

    let orderSummery = null
    let burger;
    // IT THE INGREDIENTS HAVE ALREADY BEEN INITIATED
    if (ingredients) {
        burger = (
            <>
                <Burger ingredients={ingredients} />
                <BuildControls
                    price={totalPrice}
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemove}
                    disabled={getDisabledState()}
                    isAuth={isAuth}
                    ordered={purchaseHandle}
                />
            </>
        )
        orderSummery = (
            <OrderSummary
                price={totalPrice}
                purchaseCancelled={purchaseCancelHandle}
                purchaseContinued={purchaseContinueHandle}
                ingredients={ingredients} />
        )

    } else {
        burger = error ? <p>ingredients can't be loaded</p> : <Spinner />
    }

    return (
        <>
            <Modal
                modalClosed={purchaseCancelHandle}
                // IF PUCHASING SHOW OTHERWHISE NOT
                show={purchasing}>
                {orderSummery}
            </Modal>
            {burger}
        </>
    )
}

export default withErrorHandler(BurgerBuilder, axios);
