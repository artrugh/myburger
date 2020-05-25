import { updatedObj } from './../../shared/transUtilities'

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

// BURGER BUILDER

export const addIng = (state, action) => {
    const addIng = {
        [action.ingredientName]:
            state.ingredients[action.ingredientName] + 1
    }
    const addIngs = updatedObj(state.ingredients, addIng)
    const addState = {
        ingredients: addIngs,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
        building: true
    }
    return updatedObj(state, addState)
}

export const removeIng = (state, action) => {
    const removeIng = {
        [action.ingredientName]:
            state.ingredients[action.ingredientName] - 1
    }
    const removeIngs = updatedObj(state.ingredients, removeIng)
    const removeState = {
        ingredients: removeIngs,
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
        building: true
    }
    return updatedObj(state, removeState)
}

export const setIng = (state, action) => {
    return updatedObj(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
        building: false
    })
}

export const fetchIngFailed = state => updatedObj(state, { error: true })


// ORDER

export const purchaseInit = state => updatedObj(state, { purchased: false })

export const purchaseBurgerStart = state => updatedObj(state, { loading: true })

export const purchaseBurgerFailed = state => updatedObj(state, { loading: false })

export const purchaseBurgerSuccess = (state, action) => {

    const newOrder = updatedObj(action.orderData, {
        id: action.orderId
    })
    return updatedObj(state, {
        purchased: true,
        loading: false,
        orders: state.orders.concat(newOrder)
    })
}

export const fetchOrdersSuccess = (state, action) => updatedObj(state, {
    orders: action.orders,
    loading: false
})

// AUTH

export const authStart = state => updatedObj(state, {
    error: null,
    loading: true
})

export const authSuccess = (state, action) => updatedObj(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
})

export const authFailed = (state, action) => updatedObj(state, {
    error: action.error,
    loading: false
})


export const authLogout = state => updatedObj(state, {
    token: null,
    userId: null,
})

export const setAuthRedirectPath = (state, action) => updatedObj(state, {
    authRedirectPath: action.authRedirectPath
})
