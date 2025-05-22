import './App.css';
import Search from './component/search/search';
import { WEATHER_API_URL, WEATHER_API_KEY } from './apis';
import { useState } from 'react';
import { lazy,Suspense } from 'react';

const CurrentWeather = lazy(() => import ('./component/current-weather/current-weather'));
const Forecast = lazy (() => import ('./component/forecast/forecast'));


function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentweatherfetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastfetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentweatherfetch, forecastfetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((promiseERR) => console.log(promiseERR));
  }

  console.log(currentWeather);
  console.log(forecast);

  return (

    <div className='container'>
      <Search onSearchChange={handleOnSearchChange} />

      <Suspense fallback={<div>Loading weather...</div>}>
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </Suspense>

    </div>


  )
}

export default App
