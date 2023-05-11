import { useState } from 'react';
import Search from './components/search/Search';
import CurrentWeather from './components/currentWeather/CurrentWeather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import Forecast from './components/forecast/Forecast';
import './App.css';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [celsius, setCelsius] = useState(true);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async response => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <Search favorites={favorites} onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} favorites={favorites} setFavorites={setFavorites} celsius={celsius} setCelsius={setCelsius} />}
      {forecast && <Forecast data={forecast} celsius={celsius} />}
    </div>
  )
}

export default App
