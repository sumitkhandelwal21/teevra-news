/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import bgVideo from "../assets/front-bg.mp4";
import "./frontPage.css";
// import "./Front.css";
// import "./Front-desc.css";

const Front = () => {
  const words = [
    "Display latest news",
    "Read news headlines",
    "Show weather conditions",
    "Display day information",
  ];
  const [mobView, setMobView] = useState();
  const [part, setPart] = useState("");
  const [i, setI] = useState(0);
  const [offset, setOffset] = useState(0);
  const [forwards, setForwards] = useState(true);
  const [skipCount, setSkipCount] = useState(0);
  const skipDelay = 15;
  const speed = 70;
  useEffect(() => {
    const wordFlickInterval = setInterval(() => {
      if (forwards) {
        if (offset >= words[i].length) {
          setSkipCount((prevCount) => prevCount + 1);
          if (skipCount === skipDelay) {
            setForwards(false);
            setSkipCount(0);
          }
        }
      } else {
        if (offset === 0) {
          setForwards(true);
          setI((prevI) => (prevI + 1) % words.length);
        }
      }

      setOffset((prevOffset) => (forwards ? prevOffset + 1 : prevOffset - 1));
    }, speed);

    return () => {
      clearInterval(wordFlickInterval);
    };
  }, [forwards, i, offset, skipCount, speed, words]);

  useEffect(() => {
    setPart(words[i].substr(0, offset));
  }, [i, offset]);

  const divStyle = {
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  };

  const videoStyle = {
    position: "absolute",
    top: 0,
    right: "-10%",
    height: "100%",
  };

  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.className = "MainPage";
    }
  }, []);

  useEffect(() => {
    setMobView(window.screen.width);
    console.log(mobView);
  }, []);

  return (
    <div className="main-div">
      <div className="desc">
        {mobView < 550 ? (
          <p className="desc-content">
            I'm Voice Controlled App & I will <br />
            <span className="word">{part}</span>
          </p>
        ) : (
          <p className="desc-content">
            I'm Voice Controlled App <br />& I will
            <span className="word">{part}</span>
          </p>
        )}
        <div className="start">
          <NavLink className="start-link" exact to="/home">
            Let's Start &gt;
          </NavLink>
        </div>
      </div>
      <div className="logo">
        <div style={divStyle}>
          <video style={videoStyle} autoPlay loop muted>
            <source src={bgVideo} type="video/mp4" />
          </video>
          <div className="videoText">
            <img
              className="t"
              src={logo}
              alt="logo"
              style={{ height: "100px", width: "100px" }}
            />
            <p className="title" style={{color:'#bd7c2a'}}>TEEVRA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Front;
