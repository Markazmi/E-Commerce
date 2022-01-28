import React from 'react';
import { Link } from 'react-router-dom';
// prop coming from home.js
export const Product = ({product}) => {
  return (
    <div className='col-sm-12 col-md-6 col-lg-3 my-3'>
    <div className='card p-3 rounded'>
      <img
        className='card-img-top mx-auto'
        // 0 because start drom index 0 which means first prodct
        // it will go from 0 index to last index.. like a loop using map function
        src={product.images[0].url}
        alt='Product 1'
      />
      <div className='card-body d-flex flex-column'>
        <h5 className='card-title'>
         <Link to={`/product/${product._id}`} href='/'>{product.name}</Link>
        </h5>
        <div className='ratings mt-auto'>
          <div className='rating-outer'>
            <div className='rating-inner' style = {{width: `${(product.rating/5)*100}%`}}>

            </div>
          </div>

          <span id='no_of_reviews'>{product.Numofreveiws} Reviews</span>
        </div>
        <p className='card-text'>{product.price}</p>
       <Link 
       to={`/product/${product._id}`} 
       id='view-btn'
       href='/'
       className="btn-btn-block">View  Details</Link>
      </div>
    </div>
  </div>
  );
};
