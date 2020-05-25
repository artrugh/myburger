import React, { useState } from 'react'

// REACT-REDUX
import { useSelector, useDispatch } from 'react-redux'
// STYLE
import classes from './ContactData.module.css'
// AXIOS INSTANCE
import axios from './../../../axios-orders'
// FUNCTION UTILITIES
import { updatedObj, checkValidity } from './../../../shared/transUtilities'
// ALL ACTIONS
import * as actions from './../../../store/actions/index'
// FORM INITIAL DATA
import { formContactData } from './formContactData'
// COMPONENTS
import Button from './../../../components/UI/Button/Button'
import Spinner from './../../../components/UI/Spinner/Spinner'
import Input from './../../../components/UI/Input/Input'
// WRAPPER
import withErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler'


export default withErrorHandler(function ContactData() {

    // HOOKS STATE 
    const [orderForm, setOrderForm] = useState(formContactData)
    const [formIsValid, setFormIsValid] = useState(false)
    // REDUCERS
    const ingredients = useSelector(state => state.burgerBuilder.ingredients)
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice)
    const loading = useSelector(state => state.order.loading)
    const token = useSelector(state => state.auth.token)
    const userId = useSelector(state => state.auth.userId)
    // DISPATCH
    const dispatch = useDispatch()
    const onOrderBurger = (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))

    //HANDLER EVENTS
    const inputChangedHandler = (e, id) => {
        const updatedFormEl = updatedObj(orderForm[id], {
            value: e.target.value,
            valid: checkValidity(e.target.value, orderForm[id].validation),
            touched: true
        })
        const updatedOrderForm = updatedObj(orderForm, {
            [id]: updatedFormEl
        })
        let formIsValid = true;
        for (let id in updatedOrderForm) {
            formIsValid = updatedOrderForm[id].valid && formIsValid
        }
        setOrderForm(updatedOrderForm)
        setFormIsValid(formIsValid)
    }


    const orderHandler = (e) => {
        e.preventDefault()
        const formData = {};

        for (let id in orderForm) {
            formData[id] = orderForm[id].value;
        }

        const order = {
            ingredients: ingredients,
            price: totalPrice,
            orderData: formData,
            userId: userId
        }

        onOrderBurger(order, token)
    }

    //PRERENDER
    const formElementsArray = []
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        })
    }

    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(el => (
                <Input
                    elementType={el.config.elementType}
                    elementConfig={el.config.elementConfig}
                    value={el.config.value}
                    invalid={!el.config.valid}
                    shouldValidate={el.config.validation}
                    touched={el.config.touched}
                    changed={e => inputChangedHandler(e, el.id)}
                    id={el.id}
                    key={el.id} />
            ))}

            <Button
                btnType="Success"
                disabled={!formIsValid}
            >ORDER</Button>
        </form>
    )
    if (loading) {
        form = <Spinner />
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    )
}, axios)
