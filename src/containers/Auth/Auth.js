import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from './../../components/UI/Input/Input'
import Button from './../../components/UI/Button/Button'
import Spinner from './../../components/UI/Spinner/Spinner'

import classes from './Auth.module.css'

import * as actions from './../../store/actions/index'

import { updatedObj, checkValidity } from './../../shared/transUtilities'

const mapStateToProps = state => ({
    error: state.auth.error,
    loading: state.auth.loading,
    isAuth: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
})

const mapDispatchToProps = dispatch => ({
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
})

export default connect(mapStateToProps, mapDispatchToProps)(class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email',
                    autoComplete: 'email'
                },
                value: '',
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password',
                    autoComplete: 'current-password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true

    }

    componentDidMount() {
        if (!this.props.building && this.props.authRedirectPath !== '/') {
            console.log("return to home");

            this.props.onSetAuthRedirectPath()
        }
    }

    inputChangedHandler = (e, controlName) => {

        const updatedControls = updatedObj(this.state.controls, {
            [controlName]: updatedObj(this.state.controls[controlName], {
                value: e.target.value,
                valid: checkValidity(e.target.value,
                    this.state.controls[controlName].validation),
                touched: true
            })
        })

        this.setState({ controls: updatedControls })

    }

    submitHandler = e => {
        e.preventDefault()
        const email = this.state.controls.email.value
        const password = this.state.controls.password.value
        const isSignUp = this.state.isSignUp
        this.props.onAuth(email, password, isSignUp)

    }

    switchAuthModeHandler = () => this.setState(prevState => ({
        isSignUp: !prevState.isSignUp
    }))

    render() {

        const formElementsArray = []
        for (let key in this.state.controls) {

            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(el =>
            <Input
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                invalid={!el.config.valid}
                shouldValidate={el.config.validation}
                touched={el.config.touched}
                changed={e => this.inputChangedHandler(e, el.id)}
                id={el.id}
                key={el.id}
            />)

        if (this.props.loading) {
            form = <Spinner />
        }
        let errorMessage = null
        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>
        }

        if (this.props.isAuth) {
            return <Redirect to={this.props.authRedirectPath} />
        }
        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>SUBMIT</Button >
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType='Danger'>
                    SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
                </Button >
            </div>
        )
    }
})
