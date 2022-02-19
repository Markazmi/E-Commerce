import axios from 'axios';
import { CLEAR_ERRORS,  FORGOT_PASSWORD_FAIL,  FORGOT_PASSWORD_REQUEST,  FORGOT_PASSWORD_SUCCESS,  LOAD_FAIL,  LOAD_REQUEST,  LOAD_SUCCESS,  LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, NEW_PASSWORD_FAIL, NEW_PASSWORD_REQUEST, NEW_PASSWORD_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from '../constants/userConstants';

export const login = (email,password) => async(dispatch)=> {
  try{
    dispatch({type:LOGIN_REQUEST})
    const config ={
      headers:{
        'Content-Type':'application/json'
      }
    }
    // login was a post req in our backend so thats why writing post and sending email and password of the user
    const {data} = await axios.post(
      '/api/v1/login',
      {email,password},
      config
    )
    dispatch({type:LOGIN_SUCCESS, payload:data.user})

  }
 catch(error)
{
  dispatch({type:LOGIN_FAIL, payload: error.response.data.message})
}
  

}
export const register = (userData)=> async(dispatch)=>{
try{
  dispatch({type: REGISTER_REQUEST})
  const config ={
    headers:{
    'Content-Type': 'multipart/form-data'
  }}

  const {data} = await axios.post('/api/v1/register',
   userData,
    config)
    console.log(data);

dispatch({type:REGISTER_SUCCESS, payload: data.user})
}
catch(error)
{
  dispatch({type:REGISTER_FAIL, payload: error.response.data.message})
}
}

export const loadUser =()=>async(dispatch)=>{
  try{
    dispatch({type:LOAD_REQUEST})
    // getting user profile
    // to show his name on header
    const {data} = await axios('/api/v1/me')
    dispatch({type:LOAD_SUCCESS, payload:data.user})
  }
  catch(error){
    dispatch({type:LOAD_FAIL, payload: error.response.data.message})
  }
}
export const logoutUser =()=>async(dispatch)=>{
  try{
    await axios('/api/v1/logout')
    dispatch({type:LOGOUT_SUCCESS})
  }
  catch(error){
    dispatch({type:LOGOUT_FAIL, payload: error.response.data.message})
  }
}

export const updateUser=(userData)=>async(dispatch)=>{
try{
  dispatch({type:UPDATE_PROFILE_REQUEST})
  const config={
    headers:{
      'Content-type':'multipart/form-data'

    }
  }

  const {data} = await axios.put('/api/v1/me/update',
  userData,
  config)
 
  dispatch({type:UPDATE_PROFILE_SUCCESS, payload:data.success})
}
catch(error){
  dispatch({type:UPDATE_PROFILE_FAIL, payload: error.response.data.message})
}
}

export const updatePassword=(passwords)=>async(dispatch)=>{
  try{
    dispatch({type: UPDATE_PASSWORD_REQUEST})
    const config={
      headers:{
        'Content-type': 'application/json'
      }
    }
    const {data}= await axios.put('/api/v1/update/password',
    passwords,
    config)

    dispatch({type: UPDATE_PASSWORD_SUCCESS, payload:data.success})
  }
  catch(error){
    dispatch({type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message})
  }
}
export const forgotPassword =(email)=>async(dispatch)=>{
  try{
    dispatch({type: FORGOT_PASSWORD_REQUEST})
    const config={
      headers:{
        'Content-type':'application/json'
      }
    }
    const {data}=await axios.post('/api/v1/password/forgot',email,config)
    dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: data.message})

  }
  catch(error){
    dispatch({type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message})

  }
}
export const resetPassword=(token,passwords)=>async(dispatch)=>{
  try{
    dispatch({type: NEW_PASSWORD_REQUEST})
    const config={
      headers:{
        'Content-type':'application/json'
      }}
      const {data}= await axios.put(`/api/v1/password/reset/${token}`
      ,passwords,config)
      dispatch({type: NEW_PASSWORD_SUCCESS,
         payload:data.success})
  }
  catch(error){
    dispatch({type: NEW_PASSWORD_FAIL,
       payload: error.response.data.message})
  }

}
export const clearErrors =() => async(dispatch) =>{
  dispatch({ type:CLEAR_ERRORS})
  }


