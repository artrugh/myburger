import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from './../../components/UI/Input/Input'
import Button from './../../components/UI/Button/Button'
import Spinner from './../../components/UI/Spinner/Spinner'

import classes from './Auth.module.css'

import * as actions from './../../store/actions/index'
import { authFormData } from './AuthFormData'

import { updatedObj, checkValidity } from './../../shared/transUtilities'

export default function Auth() {

    // STATE
    const [authForm, setAuthForm] = useState(authFormData)
    const [isSignUp, setIsSignUp] = useState(true)

    const error = useSelector(state => state.auth.error)
    const loading = useSelector(state => state.auth.loading)
    const isAuth = useSelector(state => state.auth.token !== null)
    const building = useSelector(state => state.burgerBuilder.building)
    const authRedirectPath = useSelector(state => state.auth.authRedirectPath)

    // DISPATCH
    const dispatch = useDispatch()
    const onAuth = (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    const onSetAuthRedirectPath = useCallback(() => dispatch(actions.setAuthRedirectPath('/')), [dispatch])

    useEffect(() => {
        if (!building && authRedirectPath !== '/') {
            console.log("return to home");
            onSetAuthRedirectPath()
        }
    }, [building, authRedirectPath ,onSetAuthRedirectPath])

    // HANDLER EVENTS
    const inputChangedHandler = (e, controlName) => {
        const updatedControls = updatedObj(authForm, {
            [controlName]: updatedObj(authForm[controlName], {
                value: e.target.value,
                valid: checkValidity(e.target.value,
                    authForm[controlName].validation),
                touched: true
            })
        })
        setAuthForm(updatedControls)
    }

    const submitHandler = e => {
        e.preventDefault()
        const email = authForm.email.value
        const password = authForm.password.value
        onAuth(email, password, isSignUp)
    }

    const switchAuthModeHandler = () => setIsSignUp(!isSignUp)

    const formElementsArray = []
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key]
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
            changed={e => inputChangedHandler(e, el.id)}
            id={el.id}
            key={el.id}
        />)

    if (loading) {
        form = <Spinner />
    }
    let errorMessage = null
    if (error) {
        errorMessage = <p>{error.message}</p>
    }

    if (isAuth) {
        return <Redirect to={authRedirectPath} />
    }
    return (
        <div className={classes.Auth}>
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType='Success'>SUBMIT</Button >
            </form>
            <Button
                clicked={switchAuthModeHandler}
                btnType='Danger'>
                SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}
            </Button >
        </div>
    )
}