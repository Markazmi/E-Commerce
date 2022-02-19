import React, { useEffect, useState } from 'react';
import{useSelector, useDispatch} from 'react-redux'
import {useAlert} from 'react-alert'
import { MetaData } from '../layouts/MetaData';
import { Loader } from '../Loader';
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { clearErrors, login } from '../../actions/userActions';

export const Login = () => {
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')

    const alert=useAlert()
    const navigate=useNavigate()
    const dispatch = useDispatch()

    // state.auth from store
    const {loading,error, isAuthenticated} = useSelector((state) => state.auth)
const location= useLocation()
const redirect=location.search? location.search.split('=')[1]:'/'
    useEffect(()=>{
        // if user is authenticated means valid then let him enter and see home page
        if(isAuthenticated){
            navigate(redirect)
        }
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        // WHY NO DISPATCHHHH???
    },[error,alert, isAuthenticated, clearErrors, redirect])
// where do we dispatch this way and not in useEffect 
    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(login(email,password))
    }



  return (
    <>
    {loading?
     (<Loader/>)
     :(
     
     <><MetaData title={'Login'} /><div className='row wrapper'>
                      <div className='col-10 col-lg-5'>
                          <form className='shadow-lg' onSubmit={submitHandler}>
                              <h1 className='mb-3'>Login</h1>
                              <div className='form-group'>
                                  <label htmlFor='email_field'>Email</label>
                                  <input
                                      type='email'
                                      id='email_field'
                                      className='form-control'
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)} />
                              </div>

                              <div className='form-group'>
                                  <label htmlFor='password_field'>Password</label>
                                  <input
                                      type='password'
                                      id='password_field'
                                      className='form-control'
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)} />
                              </div>
                                {/* HOW DID WE PUT THESE TP's link??? went to abckend to see??? */}
                              <Link to='/password/forgot' className='float-right mb-4'>
                                  Forgot Password?
                              </Link>

                              <button
                                  id='login_button'
                                  type='submit'
                                  className='btn btn-block py-3'
                              >
                                  LOGIN
                              </button>

                              <Link to='/register' className='float-right mt-3'>
                                  New User?
                              </Link>
                          </form>
                      </div>
                  </div>
                  </>
     )}
                  </>
  )};
