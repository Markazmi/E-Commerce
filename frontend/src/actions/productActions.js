import axios from 'axios'
import{

    All_PRODUCTS_REQUEST,
    All_PRODUCTS_SUCCESS,
    All_PRODUCTS_FAIL,
    CLEAR_ERRORS,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL
    
} from './../constants/productConstants'

export const getProducts =(keyword='', currentPage=1)=> async(dispatch) =>{
    try{
        dispatch({type:All_PRODUCTS_REQUEST})
        // this route should be same as the one in producrRoutes for getallprodducts
        const {data} =await axios(`/api/v1/products?keyword=${keyword}&page=${currentPage}`)
       console.log(data);
        dispatch({type:All_PRODUCTS_SUCCESS, payload:data})
    }
    catch(error){
        dispatch({ type:All_PRODUCTS_FAIL, payload: error.response.data.message})

    }
}
export const getProductDetails = (id) => async(dispatch)=>{
    try{
        dispatch({type: PRODUCT_DETAIL_REQUEST})
        const {data} = await axios(`/api/v1/product/${id}`)
        dispatch({type: PRODUCT_DETAIL_SUCCESS, payload:data})

    }
    catch(error){
        dispatch({type:PRODUCT_DETAIL_FAIL, payload: error.respose.data.message})
    }

}

export const clearErrors =() => async(dispatch) =>{
dispatch({ type:CLEAR_ERRORS})
}

