import React from 'react'
// import React, {useState} from 'react';
// import "./form.css";

const Form = props => {

  return (
    <div className='container'>
      <div className='row search-section'>
          <input 
            className='search-input'
            type='text' 
            name='city' 
            placeholder='City...' 
            value={props.cityName}
            onChange={(e)=>{props.onChangeCityName(e.target.value)}}
          />
          {/* <input
            type='text'
            name="country" 
            placeholder="Country..." 
            value='Canada' 
            value={props.countryName}
            onChange={(e)=>{props.onChangeCountryName(e.target.value)}}
          /> */}
          <button className='search-btn' onClick={props.onSubmit}>
            check it!
            </button>
      </div>
    </div>
  )
}

export default Form;

