import * as actionTypes from "../action/actionTypes";

const initialState = {
    image: {},
    images: []
}

const reducer = ( state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_IMAGE:
            return {
                ...state,
                ...{ image: {...action.image}}
            }
        case actionTypes.GET_IMAGES:
            return {
                ...state,
                ...{ images: {...action.images}}
            }
        default:
            return state;
    }
}

export default reducer;