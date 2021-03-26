import React, { useEffect, useState } from "react";
import axios from 'axios';

import Titles from "./components/Titles"
import Form from "./components/Form"
import Weather from "./components/Weather"
import "./App.css";

import { WeatherProvider, useWeatherDispatch, useWeatherState } from './context/WeatherProvider'

const ErrorModal = () => {
  const { error } = useWeatherState();
  const dispatch = useWeatherDispatch();

  const closeModal = () => dispatch({ type: "ERROR", payload: null })

  if(!error) return null

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <p>{error}</p>
        <button onClick={closeModal}>Ok</button>
      </div>
    </div>
  )
}

const WeatherDisplay = () => {
  const [changingWeather, setChangingWeather] = useState(true)
  // const { weather, cityName, countryName } = useWeatherState();
  const { weather, cityName } = useWeatherState();
  const dispatch = useWeatherDispatch();

  const changeWeather = () => setChangingWeather(true)

  // const changeCountry = () => dispatch({ type: "CHANGE_WEATHER", payload: { cityName, countryName } })

  const changeCity = city => dispatch({ type: "SET_CITY_NAME", payload: city })

  useEffect(() => {
    const fetchWeather = async () => {
      setChangingWeather(false)
      try {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=a69f91a75eaef12893f8ceb6edd05841&units=metric`
        const response = await axios.get(url);
  
        console.log(weather)
        dispatch({ type: "SET_WEATHER", payload: response.data })
      } catch (error) {
        console.log("error")
        dispatch({ type: "ERROR", payload: "Error: This city is unavailable in our system" })
      }
    }

    if(changingWeather) fetchWeather()
  }, [changingWeather])

  if(!weather) {
    return <h1>Loading.....</h1>
  }

  return (
    <div className="wrap">
      <Titles />
      <Form 
        cityName={cityName} 
        // countryName={countryName} 
        onSubmit={changeWeather} 
        onChangeCityName={changeCity} 
        // onChangeCountryName={changeCountry} 
      />
      <Weather 
        city={cityName}
        // country={weather.sys.country}
        icon={weather.weather[0].icon}
        description={weather.weather[0].description}
        temperature={weather.main.temp}
        feelsLike={weather.main.feels_like}
        humidity={weather.main.humidity}
        winds={weather.wind.speed}
      />
    </div>
  )
}

const App = () => {
  return (
    <WeatherProvider>
      <ErrorModal />
      <WeatherDisplay />
    </WeatherProvider>
  )
}

export default App

