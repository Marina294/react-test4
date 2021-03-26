import React, { createContext, useReducer, useContext } from "react";

const initialState = {
  weather: {
		main: { temp: null },
		wind: { speed: null },
		sys: { country: null },
		weather: [ {icon: ""} ]
	},
  cityName: "Vancouver",
//   countryName: "Canada",
	error: null
}

const reducer = (state, action) => {
	switch (action.type) {
		case "SET_WEATHER":
			return {
				...state,
				weather: action.payload
			};
    case "SET_CITY_NAME":
      return {
        ...state,
        cityName: action.payload
      };
    // case "SET_COUNTRY_NAME":
    //   return {
    //     ...state,
    //     countryName: action.payload
    //   };
		case "ERROR":
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
};

const WeatherState = createContext(undefined);
const WeatherDispatch = createContext(undefined);

const WeatherProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<WeatherState.Provider value={state}>
			<WeatherDispatch.Provider value={dispatch}>{children}</WeatherDispatch.Provider>
		</WeatherState.Provider>
	);
};

const useWeatherState = () => {
	const context = useContext(WeatherState);
	if (undefined === context) {
		throw new Error("Please use within WeatherStateProvider");
	}
	return context;
};

const useWeatherDispatch = () => {
	const context = useContext(WeatherDispatch);
	if (undefined === context) {
		throw new Error("Please use within WeatherDispatchProvider");
	}
	return context;
};

export { WeatherProvider, useWeatherState, useWeatherDispatch };
