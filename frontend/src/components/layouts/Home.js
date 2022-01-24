import { MetaData } from "./MetaData";
import { Product } from "./product/Product";
import { useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { getProducts } from "../../actions/productActions";

export const Home = () => {
 const  dispatch=useDispatch();
  // these are coming from ptoductReducer file
 const {products,loading,error}=useSelector((state) => state.products)

useEffect(()=>{

// coming from productActions
dispatch(getProducts())

}
,[dispatch])


  return (
      <>
    <MetaData title={'Buy Best Products Online -ShopIT'}/>
    <h1 id='products_heading'>Latest Products</h1>
    
    <section id='products' className='container mt-5'>
      <div className='row'>
        {/* if products available then(&&) show all products using map function */}
        {products && products.map((product)=>(
          <Product key={product._id} product={product}/>
        ))}
        
      </div>
    </section>

  </>
  )
};
