import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const Search = () => {
    const [keyword, setKeyword]=useState('')
    const navigate = useNavigate()

    const searchHandler =(e)=>{
        e.preventDefault();
        // cut all extra spaces
        if(keyword.trim())
        navigate(`/search/${keyword}`)
        else
        navigate('/')

        
    }

  return (
  <form onSubmit={searchHandler}>
      <div className='input-group'>
        <input
          type='text'
          id='search_field'
          className='form-control'
          placeholder='Enter Product Name ...'
        //   whenever we have a field to write something
          value={keyword}
          onChange={(e)=> setKeyword(e.target.value)}
        />
        <div className='input-group-append'>
          <button id='search_btn' className='btn'>
            <i className='fa fa-search' aria-hidden='true'></i>
          </button>
        </div>
      </div>

    </form>
  )};
