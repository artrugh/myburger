import React from 'react'

// STYLE
import classes from './CheckoutSummary.module.css'

// COMPONENTS
import Burger from './../../Burger/Burger'
import Button from './../../UI/Button/Button'

export default function CheckoutSummary(props) {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{
                width: "100%",
                margin: "auto",
            }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                clicked={props.checkoutCancelled}
                btnType="Danger" >CANCEL</Button>
            <Button
                clicked={props.checkoutContinued}
                btnType="Success" >CONTINUE</Button>

        </div>
    )
}