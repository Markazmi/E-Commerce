import { MetaData } from "./MetaData";
import { Product } from "./product/Product";
import { useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { getProducts } from "../../actions/productActions";
import { Loader } from "../Loader";
import {useAlert} from 'react-alert'
export const Home = () => {
 const  dispatch=useDispatch();
 const alert = useAlert()
  // these are coming from ptoductReducer file
 const {products,loading,error}=useSelector((state) => state.products)

useEffect(()=>{

  if(error)
  return alert.error(error)
  // if there is an error then it wont go to else part
  // which is displaying products
// coming from productActions
dispatch(getProducts())

}
,[dispatch, error, alert])


  return (
      <>
      {loading ? (<Loader/>) : (

    <>
    <MetaData title={'Buy Best Products Online -ShopIT'} /><h1 id='products_heading'>Latest Products</h1><section id='products' className='container mt-5'>
          <div className='row'>
            {/* if products available then(&&) show all products using map function */}
            {products && products.map((product) => (
              <Product key={product._id} product={product} />
            ))}

          </div>
        </section>
        </>
      )}
  </>
  )
};

// RUN BOTH BACKEND AND FRONTEND SERVER TO SEE THE RESULTS
// BACKEND => yarn run dev
// FRONTEND => yarn start

// then only we can fetch products from backend and display in frontend