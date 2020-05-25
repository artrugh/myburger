import React, { useState, useEffect, useCallback } from 'react'
import { Redirect } from 'react-router-dom'

// REACT-REDUX
import { useSelector, useDispatch } from 'react-redux'

// ALL ACTIONS
import * as actions from './../../store/actions/index'

// DATA FOR BUILTFORM
import { authFormData } from './AuthFormData'

// UTILITIES FUNCTIONS
import { updatedObj, checkValidity } from './../../shared/transUtilities'

// STYLE
import classes from './Auth.module.css'

// COMPONENTS
import Input from './../../components/UI/Input/Input'
import Button from './../../components/UI/Button/Button'
import Spinner from './../../components/UI/Spinner/Spinner'

export default function Auth() {

    // INITIATE THE FORM
    const [authForm, setAuthForm] = useState(authFormData)
    // SET WANT ISSIGNUP
    const [isSignUp, setIsSignUp] = useState(true)

    // ACCECSS THE REDUCERS
    const error = useSelector(state => state.auth.error)
    const loading = useSelector(state => state.auth.loading)
    const isAuth = useSelector(state => state.auth.token !== null)
    const building = useSelector(state => state.burgerBuilder.building)
    const authRedirectPath = useSelector(state => state.auth.authRedirectPath)

    // DISPATCH FUNCTIONS
    const dispatch = useDispatch()
    // SIGNUP
    const onAuth = (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    // REDIRECT
    const onSetAuthRedirectPath = useCallback(() => dispatch(actions.setAuthRedirectPath('/')), [dispatch])

    useEffect(() => {
        // IF THE USER IS NOT BUILDING A BURGER 
        // AND THE STORED PATH IS NOT HOME
        // STORE / HOME AS A PATH
        if (!building && authRedirectPath !== '/') {
            console.log("return to home");
            onSetAuthRedirectPath()
        }
    }, [building, authRedirectPath, onSetAuthRedirectPath])

    // HANDLER EVENTS
    const inputChangedHandler = (e, controlName) => {
        // BUILD THE FORM
        const updatedControls = updatedObj(authForm, {
            [controlName]: updatedObj(authForm[controlName], {
                value: e.target.value,
                valid: checkValidity(e.target.value,
                    authForm[controlName].validation),
                touched: true
            })
        })
        // STORE IT IN THE HOOK
        setAuthForm(updatedControls)
    }

    const submitHandler = e => {
        e.preventDefault()
        const email = authForm.email.value
        const password = authForm.password.value
        // SIGN UP
        onAuth(email, password, isSignUp)
    }

    // SWITCH UI MESSAGE - SIGNUP || LOGIN
    const switchAuthModeHandler = () => setIsSignUp(!isSignUp)

    // PRERENDER

    // IF NOT LOADING RENDER THE FORM OTHERWISE SPINNER
    let output;
    if (!loading) {
        const formElementsArray = []
        for (let key in authForm) {
            formElementsArray.push({
                id: key,
                config: authForm[key]
            })
        }
        output = formElementsArray.map(el =>
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
    } else {
        output = <Spinner />
    }

    // SHOW ERROR
    let errorMessage = null
    if (error) {
        errorMessage = <p>{error.message}</p>
    }
    // AFTER THE USER LOGIN REDIRECT TO THE STORED / PATH
    if (isAuth) {
        return <Redirect to={authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {errorMessage}
            <form onSubmit={submitHandler}>
                {output}
                <Button
                    btnType='Success'>
                    SUBMIT
                </Button >
            </form>
            <Button
                clicked={switchAuthModeHandler}
                btnType='Danger'>
                SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}
            </Button >
        </div>
    )
}