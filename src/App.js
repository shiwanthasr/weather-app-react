import {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [weather, setWeather] = useState(null); //null beacause we check if weather avaialbe before render
  const [input, setInput] = useState('');

  // useEffect(() => {

  //   axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=London`)
  //   .then((data) => {
  //     //console.log(data.data)
  //     setWeather(data.data)
  //   })
  //   .catch(err => console.log(err));

  // },[]);

  useEffect(() => {

    try{

      const fetchData = async() => {
        const apiData = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=Kandy`);
        setWeather(apiData.data);
      }

      fetchData();

    }catch(err){
      console.log(err)
    }

  },[]);

  //Event
  const weatherInputHandlerr = (e) => {
    setInput(e.target.value);
  }

  const searchWeatherHandler = (e) => {
    e.preventDefault();

    try{

      const fetchData = async() => {
        const apiData = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${input}`);
        setWeather(apiData.data);
      }

      fetchData();

    }catch(err){
      console.log(err)
    }

    setInput('');

  }

  //check weather is available then render

  return (
    <div className="App">
      <div className="search">
        <input onChange={weatherInputHandlerr} type="text" value={input}/>
        <button onClick={searchWeatherHandler}>Search</button>
      </div>
      <div className="weather-info">
        {weather && (
          <div>
            <h1>{weather.location.country}</h1>
            <h2>{weather.location.region}</h2>
          <div className="condition">
            <h3>{weather.current.condition.text}</h3>
            <img src={weather.current.condition.icon} alt="weather-icon"/>
            <h3>{weather.current.temp_c} °C</h3>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
