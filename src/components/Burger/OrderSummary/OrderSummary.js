import React from 'react'

import Button from '../../UI/Button/Button'

const OrderSummary = props => {

    const ingredientSummery = Object.keys(props.ingredients)
        .map(igKey => <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}</li>)

    return (
        <>
            <h3>Your Order:</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummery}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout? </p>
            <Button
                btnType="Danger"
                clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button
                clicked={props.purchaseContinued}
                btnType="Success">CONTINUE</Button>
        </>
    )
}


export default OrderSummary;