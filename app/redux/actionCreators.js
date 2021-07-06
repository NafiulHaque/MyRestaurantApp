import axios from 'axios';
import * as actionTypes from './actionTypes';


export const loadDishes = dishes => {
    return {
        type: actionTypes.LOAD_DISHES,
        payload: dishes,
    }


}


export const getDishes = () => dispatch => {
    axios.get("https://myapp-c3e74-default-rtdb.asia-southeast1.firebasedatabase.app/dishes.json")
        .then(response => dispatch(loadDishes(response.data)))
        .catch(err => console.log(err))
}


export const addToFavourites = dish => {
    return {
        type: actionTypes.ADD_TO_FAVOURITES,
        payload: dish,
    }
}

export const removeFromFavourites = (dish) => {
    return {
        type: actionTypes.REMOVE_FROM_FAVOURITES,
        payload: dish,
    }
}

export const selectCat = (item) => {
    return {
        type: actionTypes.SELECT_CAT,
        payload: item,
    }
}

export const addToCart = (item) => {
    return {
        type: actionTypes.ADD_TO_CART,
        payload: item,
    }
}

export const removeFromCart = (item) => {
    return {
        type: actionTypes.REMOVE_FROM_CART,
        payload: item,
    }
}

export const more = (sitem) => {
    return {
        type: actionTypes.MORE,
        payload: sitem,

    }
}

export const less = (sitem) => {
    return {
        type: actionTypes.LESS,
        payload: sitem,

    }
}
