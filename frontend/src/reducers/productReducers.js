import {

    All_PRODUCTS_REQUEST,
    All_PRODUCTS_SUCCESS,
    All_PRODUCTS_FAIL,
    CLEAR_ERRORS
    
} from './../constants/productConstants'

export const productsReducer = (state = {products:[]}, action) =>{
    switch (action.type) {
        case All_PRODUCTS_REQUEST:
            return{
            loading:true,
            products:[],
            }
        
        case All_PRODUCTS_SUCCESS:
            return{
            loading: false,
            products: action.payload.products
            }
        case All_PRODUCTS_FAIL:
            return {
            loading:false,
            error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state
    }

}
