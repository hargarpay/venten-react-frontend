import * as actionTypes from "../action/actionTypes";

const initialState = {
    newProduct: {},
    products: [],
    product: {},
}

const reducer = ( state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PRODUCT:
            return {
                ...state,
                ...{ newProduct: {...action.newProduct}}
            }
        case actionTypes.GET_PRODUCTS:
            return {
                ...state,
                ...{ products: {...action.products}}
            }
        case actionTypes.GET_PRODUCT:
            return {
                ...state,
                ...{ product: {...action.product}}
            }
        default:
            return state;
    }
}

export default reducer;