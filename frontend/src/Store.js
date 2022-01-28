import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension"
import {productDetailsReducer, productsReducer} from './reducers/productReducers'


const reducer = combineReducers({
    products: productsReducer,
    // getting singlr product
    productDetails: productDetailsReducer
})

const initialState = {}

const middlewares = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)))

export default store;

// proxy=connects frontend and backend 