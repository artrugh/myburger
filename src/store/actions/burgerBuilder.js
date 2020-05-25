import * as actionTypes from './actionTypes'

export const addIngredient = ingredientName => ({
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingredientName,
})

export const removeIngredient = ingredientName => ({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingredientName,
})

export const setIngredients = ingredients => ({
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
})

export const fetchIngredientsFailed = () => ({
    type: actionTypes.FETCH_INGREDIENTS_FAILED
})

export const initIngredients = () => ({
    type: actionTypes.INIT_INGREDIENTS
})
