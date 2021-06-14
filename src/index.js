import React, { useState } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import './style.css';



const apikey = process.env.REACT_APP_API_KEY;


const WeatherApp = () => {
  const [temperature, setTemperature] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("01d");
  const [city, setCity] = useState("Berlin");
  const [country, setCountry] = useState("DE");



  const getWeatherData = (city, country) => {
    axios({
      method: "GET",
      url:  `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${apikey}`,
    })
      .then((response) => {
        // console.log(response.data);
        setIcon(response.data.weather[0].icon);
        // Kelvin to Fahrenheit
        // setTemperature((response.data.main.temp - 273.15) * 1.8 + 32);
        // Kelvin to Celsius
        setTemperature(Math.round((response.data.main.temp - 273.15) * 100) / 100);
        setDesc(response.data.weather[0].main);
        setCity(response.data.name);
        setCountry(response.data.sys.country);
      })
      .catch((error) => {
        console.log(error);
      });

  };



  return (
    <>
      <div className="wrap-box">

      <div className="weather-box">
      <img className={icon === "01n" ? "nightime" : "weather-icon" } src={ `http://openweathermap.org/img/wn/${icon}@2x.png` } alt="weather-icon" />
      <p>
      <span className="header"><strong>{city}</strong></span>
        <span className="date">  {new Date().toLocaleString()}</span>
        </p>
            <p className="temp">
        {temperature}
        <span><strong>o </strong></span>
                </p>


                 <p className="desc">
                    {desc}
                  </p>
        </div>

</div>
{ getWeatherData(city, country) }

    </>
  );

};


render(<WeatherApp />, document.querySelector("#root"));
