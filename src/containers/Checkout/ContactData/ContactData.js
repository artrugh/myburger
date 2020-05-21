import React, { Component } from 'react'
import { connect } from 'react-redux'

import classes from './ContactData.module.css'

import axios from './../../../axios-orders'

import { updatedObj, checkValidity } from './../../../shared/transUtilities'

import Button from './../../../components/UI/Button/Button'
import Spinner from './../../../components/UI/Spinner/Spinner'
import Input from './../../../components/UI/Input/Input'
import withErrorHandler from './../../../hoc/withErrorHandler/withErrorHandler'

import * as actions from './../../../store/actions/index'

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
})

const mapDispatchToProps = dispatch => ({
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(class ContactData extends Component {

    state = {
        orderForm: {
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ],
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
    }

    componentDidMount() {
        this.setState({
            orderForm: {
                name: this.completeForm('input', 'text', 'Your name'),
                email: this.completeForm('input', 'email', 'Your email'),
                street: this.completeForm('input', 'text', 'street'),
                zipCode: this.completeForm('input', 'text', 'ZIP Code'),
                country: this.completeForm('input', 'text', 'Your country'),
                ...this.state.orderForm,
            }
        })
    }

    completeForm = (elementType, type, placeholder) => {
        return {
            elementType: elementType,
            elementConfig: {
                type: type,
                placeholder: placeholder
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
            },
            valid: false,
            touched: false
        }
    }

    inputChangedHandler = (e, id) => {

        const updatedFormEl = updatedObj(this.state.orderForm[id], {
            value: e.target.value,
            valid: checkValidity(e.target.value, this.state.orderForm[id].validation),
            touched: true
        })

        const updatedOrderForm = updatedObj(this.state.orderForm, {
            [id]: updatedFormEl

        })

        let formIsValid = true;

        for (let id in updatedOrderForm) {
            formIsValid = updatedOrderForm[id].valid && formIsValid
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })

    }


    orderHandler = (e) => {
        e.preventDefault()
        this.setState({ loading: true })

        const formData = {};

        for (let id in this.state.orderForm) {
            formData[id] = this.state.orderForm[id].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token)
    }


    render() {

        const formElementsArray = []
        for (let key in this.state.orderForm) {

            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(el => (
                    <Input
                        elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig}
                        value={el.config.value}
                        invalid={!el.config.valid}
                        shouldValidate={el.config.validation}
                        touched={el.config.touched}
                        changed={e => this.inputChangedHandler(e, el.id)}
                        id={el.id}
                        key={el.id} />
                ))}

                <Button
                    btnType="Success"
                    disabled={!this.state.formIsValid}
                >ORDER</Button>
            </form>
        )
        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}, axios))
