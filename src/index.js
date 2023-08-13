import React, { useState } from "react";
import { render } from "react-dom";
import axios from "axios";
import nightIcon from "./img/moon.svg";
import dayIcon from "./img/sun.svg";
import "./style.css";

const apikey = process.env.REACT_APP_API_KEY;

const WeatherApp = () => {
  const [temperature, setTemperature] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("01d");
  const [city, setCity] = useState("Berlin");

  const [tabState, setTabState] = useState(0);
  const toggleTab = (index) => {
    setTabState(index);
  };

  const arrTabs = ["Berlin", "Paris", "New York", "London"];

  const getWeatherData = (city) => {
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apikey}`,
    })
      .then((response) => {
        // setCity(response.data.name);
        // setIcon(response.data.weather[0].icon);
        setTemperature(response.data.main.temp);
        setDesc(response.data.weather[0].main);
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
              {arrTabs.map((e, i) => {
                return (
                  <button
                    key={i}
                    className={
                      tabState === i ? "tabs button active-tab" : "tabs button"
                    }
                    onClick={() => {
                      setCity(e);
                      toggleTab(i);
                    }}
                  >
                    {e}
                  </button>
                );
              })}
            </div>
          </div>
          <p style={{ marginBottom: "30px" }}>
            <span className="header">
              <strong>{city}</strong>
            </span>
            <span className="date"> {new Date().toLocaleString()}</span>
          </p>

          <div>
            {icon === "01n" ? (
              <img
                src={nightIcon}
                className={icon === "01n" ? "night-time" : "weather-icon"}
                alt="weather-icon"
                height="55"
                width="55"
              />
            ) : icon === "01d" ? (
              <img
                src={dayIcon}
                className={icon === "01d" ? "day-time" : "weather-icon"}
                alt="weather-icon"
                height="65"
                width="65"
              />
            ) : (
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                className="weather-icon"
                alt="weather-icon"
              />
            )}
          </div>

          <p className="temp">
            {temperature}
            <span>
              <strong>o </strong>
            </span>
          </p>

          <p className="desc">{desc}</p>
        </div>
      </div>

      {getWeatherData(city)}
    </>
  );
};

render(<WeatherApp />, document.querySelector("#root"));
