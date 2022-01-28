import { MetaData } from "./MetaData";
import { Product } from "./product/Product";
import { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { getProducts } from "../../actions/productActions";
import { Loader } from "../Loader";
import {useAlert} from 'react-alert'
import Pagination from 'react-js-pagination'
import {useParams} from 'react-router-dom'
export const Home = () => {
 const  dispatch=useDispatch();
 const alert = useAlert()
//  destructure keyword from params 
 const { keyword} = useParams()
 const [currentPage, setCurrentPage]=useState(1)
  // these are coming from ptoductReducer file
 const {products,loading,error,resPerPage,productsCount}=
 useSelector((state) => state.products)

useEffect(()=>{

  if(error)
  return alert.error(error)
  // if there is an error then it wont go to else part
  // which is displaying products
// coming from productActions
dispatch(getProducts(keyword,currentPage))

}
,[dispatch, error, alert, keyword, currentPage])

function setCurrentPageNo(pageNumber){
  setCurrentPage(pageNumber)
}
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
        <div className="d-flex justify-content-center mt-5">
          <Pagination 
          activePage={currentPage}
          itemsCountPerPage={resPerPage}
          totalItemsCount={productsCount}
          onChange={setCurrentPageNo}
          prevPageText={'Prev'}
          nextPageText={'Next'}
          firstPageText={'first'}
          lastPageText={'last'}
          itemClass="page-item"
          linkClass="page-link"
          
          
          />
        </div>
        </>
      )}
  </>
  )
};

// RUN BOTH BACKEND AND FRONTEND SERVER TO SEE THE RESULTS
// BACKEND => yarn run dev
// FRONTEND => yarn start

// then only we can fetch products from backend and display in frontend+