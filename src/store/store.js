import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import Image from './reducers/image';
import Product from './reducers/product';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    rImg: Image,
    rProd: Product
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));