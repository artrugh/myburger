import React from 'react'

// STYLE
import classes from './Order.module.css'

export default function Order(props) {

    const ingredients = []

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    // INGREDIENTS FROM EACH ORDER
    const ingredientsOutput = ingredients.map(ing => (
        <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ing.name}>{ing.name} ({ing.amount})</span>
    ))
    
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price:
                <strong>{props.price.toFixed(2)} €</strong>
            </p>
        </div>
    )
}
