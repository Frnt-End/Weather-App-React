import React, { useState } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import nightIcon from './img/moon.svg';
import dayIcon from './img/sun.svg';
import './style.css';



const apikey = process.env.REACT_APP_API_KEY;


const WeatherApp = () => {
  const [temperature, setTemperature] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("01d");
  const [city, setCity] = useState("Berlin");
  const [country, setCountry] = useState("DE");

  const [tabState, setTabState] = useState(1);
  const toggleTab = (index) => {
    setTabState(index);
}


  const clickBerlin = () => {
    setCity("Berlin");
    setCountry("DE");
    toggleTab(1);
  }
  const clickParis = () => {
    setCity("Paris");
    setCountry("FR");
    toggleTab(2);
  }
  const clickNY = () => {
    setCity("New York");
    setCountry("US");
    toggleTab(3);
  }
  const clickLondon = () => {
    setCity("London");
    setCountry("GB");
    toggleTab(4);
  }



  const getWeatherData = (city, country) => {
    axios({
      method: "GET",
      url:  `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${apikey}`,
    })
      .then((response) => {
        // console.log(response.data);
        setIcon(response.data.weather[0].icon);
        //setIcon("04n");
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
    <div className={`bg-img ${city}`}></div>
      <div className="wrap-box">
        <div className="weather-box">
        <div className="tabs-wrap">
            <div className="tabs">
              <button className={tabState === 1 ? "tabs button active-tab" : "tabs button"} onClick={clickBerlin}>Berlin</button>
              <button className={tabState === 2 ? "tabs button active-tab" : "tabs button"} onClick={clickParis}>Paris</button>
              <button className={tabState === 3 ? "tabs button active-tab" : "tabs button"} onClick={clickNY}>New York</button>
              <button className={tabState === 4 ? "tabs button active-tab" : "tabs button"} onClick={clickLondon}>London</button>
            </div>
          </div>

            <p style={{ marginBottom: "30px" }}>
              <span className="header"><strong>{city}</strong></span>
              <span className="date">  {new Date().toLocaleString()}</span>
            </p>

        <div>
          { icon === "01n"
            ?
            <img src={nightIcon} className={icon === "01n" ? "night-time" : "weather-icon" } alt="weather-icon" height="55" width="55" />
            :
            icon === "01d"
            ?
            <img src={dayIcon} className={icon === "01d" ? "day-time" : "weather-icon" } alt="weather-icon" height="65" width="65" />
            :
            <img src={ `https://openweathermap.org/img/wn/${icon}@2x.png` } className="weather-icon" alt="weather-icon" />
          }
        </div>

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
