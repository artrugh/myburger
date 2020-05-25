import * as actionTypes from './../actions/actionTypes';

import {
    addIng,
    removeIng,
    setIng,
    fetchIngFailed
} from './utilities'

const InitialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const reducer = (state = InitialState, action) => {

    switch (action.type) {

        case actionTypes.ADD_INGREDIENT: return addIng(state, action)

        case actionTypes.REMOVE_INGREDIENT: return removeIng(state, action)

        case actionTypes.SET_INGREDIENTS: return setIng(state, action)

        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngFailed(state)

        default: return state;
    }
}

export default reducer;
