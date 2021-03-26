import React from 'react'


const Weather = props => {

  return (
    <div className='weather-section'>
      <h3>{props.city}, {props.country}</h3>
      {/* <h3>{props.city}</h3>
      <h4>{props.country}</h4> */}
      <div>
        {
          props.icon && (
            <img className='weather-img' src={`http://openweathermap.org/img/w/${props.icon}.png`} alt='' />
          )
        }
      </div>
      <div className='weather-temp'><h1>{props.temperature} <span>°c</span></h1></div> 
      <div className='weather-detail'>
      <p>
        Feels Like {props.feelsLike} °c<br />
        Humidity {props.humidity} %<br />
        Wind {props.winds} km/h<br />
      </p>
      </div>
    </div>
  )
};

export default Weather;


