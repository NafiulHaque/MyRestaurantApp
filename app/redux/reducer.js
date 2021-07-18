import * as actionTypes from './actionTypes';


const INITIAL_STATE = {
    dishes: [],
    favourites: [],
    token: null,
    userId: null,
    category: [],
    cart: [],
    orders: [],
    // quantity: 1,
}

export const reducer = (state = INITIAL_STATE, action) => {
    const cart = [...state.cart];
    // const dish = [...state.dishes];
    switch (action.type) {

        case actionTypes.LOAD_DISHES:
            return {
                ...state,
                dishes: action.payload,

            }

        case actionTypes.LOAD_ORDERS:
            return {
                ...state,
                orders: action.payload,
            }
        //selectFav
        case actionTypes.ADD_TO_FAVOURITES:

            return {
                ...state,
                favourites: state.favourites.concat(action.payload),

            }
        case actionTypes.REMOVE_FROM_FAVOURITES:

            return {
                ...state,
                favourites: state.favourites.filter(item => item.id !== action.payload.id),
            }

        //selectCat
        case actionTypes.SELECT_CAT:
            return {
                ...state,
                category: action.payload,
            }

        //auth cases
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
            }
        //add to cart
        case actionTypes.ADD_TO_CART:
            return {
                ...state,
                cart: state.cart.concat(action.payload),
            }

        case actionTypes.REMOVE_FROM_CART:
            console.log("remove successfull");
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload.id)
            }

        case actionTypes.CLEAR_CART:
            return {
                ...state,
                cart: [],
            }

        //MORE OR LESS 

        case actionTypes.MORE:
            // console.log(pri);
            // const pri = state.dishes.map(it => it.id === action.payload.id ? it : null);
            for (let item of cart) {

                if (item.id === action.payload.id) {
                    // item.price = pri * action.payload.quantity;
                    item.quantity++;

                };
            }
            // quantity = quantity + quantity++;
            console.log(action.payload, "action payload");
            return {
                ...state,
                // cart: state.cart.map(it => it.id === action.payload.id ? it = action.payload : it),
                cart: cart,

            }

        case actionTypes.LESS:
            // console.log(cart);
            // const pris = dish.map(it => it.id === action.payload.id ? it.price : null);
            for (let item of cart) {

                if (item.id === action.payload.id) {
                    if (item.quantity <= 1) {

                    } else {
                        // item.price = pris * action.payload.quantity;
                        item.quantity--;
                    }

                };
            }
            // quantity = quantity + quantity++;
            // console.log(action.payload, "action payload");
            return {
                ...state,
                // cart: state.cart.map(it => it.id === action.payload.id ? it = action.payload : it),
                cart: cart,

            }




        default:
            return state;
    }
}