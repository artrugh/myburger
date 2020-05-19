import React, { Component } from 'react'

import classes from './ContactData.module.css'

import axios from './../../../axios-orders'

import Button from './../../../components/UI/Button/Button'
import Spinner from './../../../components/UI/Spinner/Spinner'
import Input from './../../../components/UI/Input/Input'


export default class ContactData extends Component {

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
                value: '',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false,

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

    checkValidity = (value, rules) => {
        let isValid = true;

        if (!rules) {
            return true
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid


    }

    inputChangedHandler = (e, id) => {
        const updatedOrderForm = { ...this.state.orderForm }
        const updatedFormEl = { ...updatedOrderForm[id] }

        updatedFormEl.value = e.target.value;
        updatedFormEl.valid = this.checkValidity(updatedFormEl.value, updatedFormEl.validation);
        updatedFormEl.touched = true;
        updatedOrderForm[id] = updatedFormEl

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
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false })
                this.props.history.push('/')
            })
            .catch(e => this.setState({ loading: false }))

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
        if (this.state.loading) {
            form = <Spinner />
        }


        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}
