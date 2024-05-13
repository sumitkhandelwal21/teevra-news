/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Clock from "react-live-clock";
import Forcast from "./forcast";
import loader from "./images/WeatherIcons.gif";
import ReactAnimatedWeather from "react-animated-weather";
import haze from './images/climateImages/haze.jpg';
import clouds from './images/climateImages/cloudy.jpg';
import rain from './images/climateImages/rain.jpg';
import snow from './images/climateImages/snow.jpg';
import wind from './images/climateImages/wind.jpg';
import drizzle from './images/climateImages/drizzle.jpg';
import fog from './images/climateImages/fog.jpg';
import thunderstorm from './images/climateImages/thunderstorm.jpg';


const apiKeys = {
  key: "18667ba3170ee40fbcb42e3b9fc59a22",
  base: "https://api.openweathermap.org/data/2.5/",
};

const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

const CurrentLocation = (props) => {
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [temperatureC, setTemperatureC] = useState();
  const [temperatureF, setTemperatureF] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [humidity, setHumidity] = useState();
  const [description, setDescription] = useState();
  const [icon, setIcon] = useState("CLEAR_DAY");

  const updateData = (weatherf) => {
    if (typeof weatherf.main != "undefined") {
      console.log(weatherf.main.temp);
      setTemperatureC(Math.round(weatherf.main.temp));
      setCity(weatherf.name);
      setCountry(weatherf.sys.country);
      setDescription(weatherf.weather[0].main);
      switch (weatherf.weather[0].main) {
        case "Haze":
          setIcon("CLEAR_DAY");
          break;
        case "Clouds":
          setIcon("CLOUDY");
          break;
        case "Rain":
          setIcon("RAIN");
          break;
        case "Snow":
          setIcon("SNOW");
          break;
        case "Dust":
          setIcon("WIND");
          break;
        case "Drizzle":
          setIcon("SLEET");
          break;
        case "Fog":
        case "Smoke":
          setIcon("FOG");
          break;
        case "Tornado":
          setIcon("WIND");
          break;
        default:
          setIcon("CLEAR_DAY");
      }
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      getPosition()
        .then((position) => {
          getWeather(26.876618376009827, 75.81540738310045);
        })
        .catch((err) => {
          getWeather(26.876618376009827, 75.81540738310045);
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
          );
        });
    } else {
      alert("Geolocation not available");
    }

    const timerID = setInterval(
      () => getWeather(lat, lon),
      600000
    );

    return () => {
      clearInterval(timerID);
    };
  }, [lat, lon]);

  const getPosition = async (options) => {
    return await new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  const getWeather = async (lat, lon) => {
    const api_call = await fetch(
      `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
    );
    const data = await api_call.json();
    setLat(lat);
    setLon(lon);
    setCity(data.name);
    setTemperatureC(Math.round(data.main.temp));
    setTemperatureF(Math.round(data.main.temp * 1.8 + 32));
    setHumidity(data.main.humidity);
    setDescription(data.weather[0].main);
    setCountry(data.sys.country);
    switch (data.weather[0].main) {
      case "Haze":
        setIcon("CLEAR_DAY");
        break;
      case "Clouds":
        setIcon("CLOUDY");
        break;
      case "Rain":
        setIcon("RAIN");
        break;
      case "Snow":
        setIcon("SNOW");
        break;
      case "Dust":
        setIcon("WIND");
        break;
      case "Drizzle":
        setIcon("SLEET");
        break;
      case "Fog":
      case "Smoke":
        setIcon("FOG");
        break;
      case "Tornado":
        setIcon("WIND");
        break;
      default:
        setIcon("CLEAR_DAY");
    }
  };

  if (temperatureC) {
    let backgroundImage;

    if (description === "Clouds") {
      backgroundImage = clouds;
    } else if (description === "Rain") {
      backgroundImage = rain;
    } else if (description === "Snow") {
      backgroundImage = snow;
    } else if (description === "Dust" || description === "Tornado") {
      backgroundImage = wind;
    } else if (description === "Drizzle") {
      backgroundImage = drizzle;
    } else if (description === "Fog" || description === "Smoke") {
      backgroundImage = fog;
    } else if (description === "Thunderstorm") {
      backgroundImage = thunderstorm;
    } else {
      backgroundImage = haze;
    }

    return (
      <>
        <div className="city" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="pozition">
            <h2>{city}</h2>
            <h3>{country}</h3>
          </div>
          <div className="mb-icon">
            <ReactAnimatedWeather
              icon={icon}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            />
            <p>{description}</p>
          </div>
          <div className="date-time">
            <div className="dmy">
              <div id="txt"></div>
              <div className="current-time">
                <Clock format="HH:mm:ss" interval={1000} ticking={true} />
              </div>
              <div className="current-date">{dateBuilder(new Date())}</div>
            </div>
            <div className="temperature">
              <p>
                {temperatureC}°<span>C</span>
              </p>
            </div>
          </div>
        </div>
        <Forcast icon={icon} weather={description} updateData={updateData} />
      </>
    );
  } else {
    return (
      <>
        <img src={loader} style={{ width: "50%", WebkitUserDrag: "none" }} alt="" />
        <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
          Detecting your location
        </h3>
        <h3 style={{ color: "white", marginTop: "10px" }}>
          Your current location wil be displayed on the App <br></br> & used
          for calculating Real time weather.
        </h3>
      </>
    );
  }
};

export default CurrentLocation;

