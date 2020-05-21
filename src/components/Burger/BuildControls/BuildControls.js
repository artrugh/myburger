import React from 'react'

import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'


const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]
export default function BuildControls(props) {


    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong> </p>
            {controls.map(ctrl =>
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.type}
                    added={() => props.ingredientAdded(ctrl.type)}
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />)}
            <button
                className={classes.OrderButton}
                onClick = {props.ordered }
                disabled={props.price > 4 ? false : true}>{props.isAuth ? 'ORDER NOW' : 'SIGNUP TO ORDER'}</button>
        </div>
    )
}
