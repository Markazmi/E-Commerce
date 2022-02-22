import React, { useEffect } from 'react'
import {useSelector } from 'react-redux'

import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
  } from '@stripe/react-stripe-js';
import { CheckoutSteps } from './CheckoutSteps';
import { MetaData } from '../components/layouts/MetaData';
import { useNavigate } from 'react-router-dom';
import {useAlert} from 'react-alert'
import axios from 'axios'
const options={
    style:{
        base:{
            fontSize: '16px',
        },
        invalid:{
            color:'#9e2146'
        }
    }
}
export const Payment = () => {
  const navigate = useNavigate()
  const alert = useAlert()
  const stripe=useStripe()
  const elements = useElements()
    const {user}=useSelector((state)=> state.auth)
    // const {shippingInfo, cartItems}=useSelector((state)=> state.cart)
    
    const orderInfo= JSON.parse(sessionStorage.getItem('orderItems'))
    const paymentData ={
      amount: Math.round(orderInfo.totalPrice * 100),

    }
    useEffect(() => {}, [])
    const submitHandler = async (e)=>{

      e.preventDefault()
// console.log("hello");
      // for hitting a html button
      document.querySelector('#pay_btn').disabled = true;

    
      try{
        const config={
          headers:{
            'Content-type':'application/json'
          }
        }

        const res = await axios.post('/api/v1/payment/process', paymentData,config)
      console.log(res);
      
      const client_secret = res.data.client_secret;
      if(!stripe || !elements){
        return;
      }
      const result = await stripe.confirmCardPayment(client_secret,{
        payment_method:{
          card: elements.getElement(CardNumberElement),
          billing_details:{
            name: user.name,
            email: user.email
          }
        }
      })

      if(result.error){
        alert(result.error.message)
        document.querySelector('#pay_btn').disabled = false;
      }
      else{
        if(result.paymentIntent.status ==='succeeded'){
          navigate('/success')
        }
        else{
          alert.error('There is some problem with your payment')
        }
      }
    }
    catch(error){
      document.querySelector('#pay_btn').disabled = false;
      alert.error(error.response.data.message)
    }
    }
    
  return (
    <>
    <MetaData title={'Payment'} />
      <CheckoutSteps shipping confirmOrder payment />

      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form className='shadow-lg' onSubmit={submitHandler}>
            <h1 className='mb-4'>Card Info</h1>
            <div className='form-group'>
              <label htmlFor='card_num_field'>Card Number</label>
              <CardNumberElement
                type='text'
                id='card_num_field'
                className='form-control'
                options={options}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='card_exp_field'>Card Expiry</label>
              <CardExpiryElement
                type='text'
                id='card_exp_field'
                className='form-control'
                options={options}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='card_cvc_field'>Card CVC</label>
              <CardCvcElement
                type='text'
                id='card_cvc_field'
                className='form-control'
                options={options}
              />
            </div>

            <button id='pay_btn' type='submit' className='btn btn-block py-3'>
              Pay -${`${orderInfo && orderInfo.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    
    </>
  )
}
