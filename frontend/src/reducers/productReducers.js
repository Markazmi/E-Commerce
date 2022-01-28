import {

    All_PRODUCTS_REQUEST,
    All_PRODUCTS_SUCCESS,
    All_PRODUCTS_FAIL,
    CLEAR_ERRORS,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    
} from './../constants/productConstants'
// [] because getting an array of products (alot of products)
// state=products??? see in controller and see which variable u used to get data from the database and use the same
//  variable here!!!!!(for example const product= await Products.findById(req.params.id)) so use variable here

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
            products: action.payload.products,
            productsCount: action.payload.productsCount,
            resPerPage: action.payload.resPerPage
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
// {} because getting a single product
// state=product??? see in controller and see which variable u used to get data from the database and use the same
//  variable here!!!!!(for example const product= await Products.findById(req.params.id)) so use variable here

export const productDetailsReducer = (state = {product:{}}, action)=>{
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return{
                loading:true,
                product:{}
            }
        case PRODUCT_DETAIL_SUCCESS:
            return{
                loading:false,
                product:action.payload.product,

            }
        case PRODUCT_DETAIL_FAIL:
            return{
                loading:false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state;
    }
}
// WHY IS
// export const SingleProdReducer = ((state = {product:{}}, action)=>{
// export const productsReducer = (state = {products:[]}, action) =>{

// WYY IS THERE A DIFFERENCE?
// productsREDUCER is getting ALL products so if we go in productvontrollers we can see we fetced products there using the
// variable "products", wehre ass for singleprod the variable userd in controllers is "product"
// why [] and {} well, singleProf is getting on OBJECT only means 1 product
// nut getproducts is getting alot of products .. which we get in array so thats why []

