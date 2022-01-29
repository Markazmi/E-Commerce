import { MetaData } from "./MetaData";
import { Product } from "./product/Product";
import { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { getProducts } from "../../actions/productActions";
import { Loader } from "../Loader";
import {useAlert} from 'react-alert'
import Pagination from 'react-js-pagination'
import {useParams} from 'react-router-dom'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range)

export const Home = () => {
  const [currentPage, setCurrentPage]=useState(1)
  const [price, setPrice] = useState([1,1000])
  const [category, setCategory] = useState('')
  // const [rating,setRating]= useState(0)

 const  dispatch=useDispatch();
 const alert = useAlert()
//  destructure keyword from params 
 const { keyword} = useParams()

  // these are coming from ptoductReducer file
 const {products,loading,error,resPerPage,productsCount, filteredProductsCount}=
 useSelector((state) => state.products)

useEffect(()=>{
  if(error){
  return alert.error(error)
  }
  // if there is an error then it wont go to else part
  // which is displaying products
// coming from productActions
dispatch(getProducts(keyword,currentPage, price, category))
}
,[dispatch, error, alert, keyword, currentPage, price, category])

function setCurrentPageNo(pageNumber){
  setCurrentPage(pageNumber)
}
let count = productsCount
if(keyword){
  count = filteredProductsCount
}
const categories = [
  'Electronics',
  'Cameras',
  'Laptops',
  'Accessories',
  'Headphones',
  'Food',
  'Books',
  'Clothes/Shoes',
  'Beauty/Health',
  'Sports',
  'Outdoor',
  'Home',
];

  return (
    <>
      {loading?
      (<Loader/>):
      (
        <>
        <MetaData title={'Buy Best Product Online - ShopIT'}/>
        <h1 id='products_heading'> Latest Products</h1>

        <section id='products' className="container mt-5">
          <div className="row">
            {keyword ? (
              <><div className="'col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: `$1`,
                          1000: `$1000`
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{
                          placement: 'top',
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)} />
                      <hr className="my-5" />
                      <div className="mt-5">
                        <h4 className="mb-3"> Categories </h4>
                        <ul className="pl-0">
                          {categories.map((category) => (
                            <li
                              key={category}
                              style={{
                                cursor: 'pointer',
                                listStyleType: 'none'
                              }}
                              onClick={() => setCategory(category)}>
                              {category}


                            </li>

                          )
                          )}

                        </ul>

                      </div>

                    </div>
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products && products.map((product)=> (
                      <Product
                      key={product._id}
                      product={product}
                      col={4}/>
                      ))}

                    </div>
                  </div></>
            ):(
              products && products.map((product)=> (
                <Product
                      key={product._id}
                      product={product}/>

              )
            ))

            }

          </div>
        </section>
        {resPerPage<=count &&(
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

        )}
        </>
      )
      }
 </>
)}