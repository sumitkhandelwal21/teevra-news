/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./NavBar.css";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import Clock from "react-live-clock";
import * as moment from "moment";
import cal from "./cal.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const NavBar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });
  const handleHover = () => {
    setIsHovered(true);
  };

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        // width: window.innerWidth,
        width: "20px"
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    windowSize.width >= 990 && setShowMenu(false)
  })
  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    <nav class="navbar navbar-expand-lg  ">
      <div class="container-fluid">
        <div className="icon">
          <img
            src={logo}
            alt="logo"
            style={{
              height: "40px",
              width: "40px",
              marginRight: "10px",
              marginTop: "0px",
            }}
          />
          
        </div>
        <a
            class="navbar-brand"
            href="/"
            style={{ fontWeight: "bolder", color: "red"}}
        >
            TEEVRA
        </a>
        <button
          class="navbar-toggler"
          type="button"
          onClick={() => setShowMenu(!showMenu)}
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        {showMenu ? (
          <div
            class={`navbar-collapse bg-white w-100 px-4 pb-3 rounded`}
          >
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              &nbsp; &nbsp;
              <li class="nav-item">
                <NavLink
                  aria-current="page"
                  exact
                  to="/home"
                  onClick={() => setShowMenu(false)}
                  style={({ isActive }) => ({
                    color: isActive ? "#bd7c2a" : "gray",
                    textDecoration: isActive ? "underline" : "none",
                    textUnderlineOffset: isActive && "3px",
                  })}
                >
                  Home
                </NavLink>
              </li>
              &nbsp; &nbsp;
              <li class="nav-item">
                <NavLink
                  aria-current="page"
                  exact
                  to="/news"
                  onClick={() => setShowMenu(false)}
                  style={({ isActive }) => ({
                    color: isActive ? "#bd7c2a" : "gray",
                    textDecoration: isActive ? "underline" : "none",
                    textUnderlineOffset: isActive && "3px",
                  })}
                >
                  Daily News
                </NavLink>
              </li>
              &nbsp; &nbsp;
              <li class="nav-item">
                <NavLink
                  aria-current="page"
                  exact
                  to="/weather"
                  onClick={() => setShowMenu(false)}
                  style={({ isActive }) => ({
                    color: isActive ? "#bd7c2a" : "gray",
                    textDecoration: isActive ? "underline" : "none",
                    textUnderlineOffset: isActive && "3px",
                  })}
                >
                  Weather
                </NavLink>
              </li>
            </ul>
            {
              showMenu ? "" :
                <div className="d-flex">
                  <div style={{ color: "#bd7c2a" }}>
                    <Clock
                      format="HH:mm:ss"
                      interval={1000}
                      ticking={true}
                      style={{ marginLeft: "23px" }}
                    />
                    <br />
                    {moment(new Date()).format("DD-MM-YYYY")}
                  </div>
                  &nbsp; &nbsp;

                  <div className="image-container" onMouseLeave={handleLeave}>
                    {
                      <img
                        src={cal}
                        alt=""
                        className="cal"
                        style={{ width: "45px", height: "45px" }}
                        onMouseEnter={handleHover}
                      />
                    }

                    {isHovered && (
                      <div className="dialog-box">
                        <Calendar />
                      </div>
                    )}
                  </div>

                </div>
            }
          </div>
        ) :
          (
            <div
              class={`collapse navbar-collapse `}
            // id="navbarSupportedContent"
            >
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                &nbsp; &nbsp;
                <li class="nav-item">
                  <NavLink
                    aria-current="page"
                    exact
                    to="/home"
                    style={({ isActive }) => ({
                      color: isActive ? "#bd7c2a" : "gray",
                      textDecoration: isActive ? "underline" : "none",
                      textUnderlineOffset: isActive && "3px",
                    })}
                  >
                    Home
                  </NavLink>
                </li>
                &nbsp; &nbsp;
                <li class="nav-item">
                  <NavLink
                    aria-current="page"
                    exact
                    to="/news"
                    style={({ isActive }) => ({
                      color: isActive ? "#bd7c2a" : "gray",
                      textDecoration: isActive ? "underline" : "none",
                      textUnderlineOffset: isActive && "3px",
                    })}
                  >
                    Daily News
                  </NavLink>
                </li>
                &nbsp; &nbsp;
                <li class="nav-item">
                  <NavLink
                    aria-current="page"
                    exact
                    to="/weather"
                    style={({ isActive }) => ({
                      color: isActive ? "#bd7c2a" : "gray",
                      textDecoration: isActive ? "underline" : "none",
                      textUnderlineOffset: isActive && "3px",
                    })}
                  >
                    Weather
                  </NavLink>
                </li>
              </ul>
              <div className="d-flex">
                <div style={{ color: "#bd7c2a" }}>
                  <Clock
                    format="HH:mm:ss"
                    interval={1000}
                    ticking={true}
                    style={{ marginLeft: "23px" }}
                  />
                  <br />
                  {moment(new Date()).format("DD-MM-YYYY")}
                </div>
                &nbsp; &nbsp;
                <div className="image-container" onMouseLeave={handleLeave}>
                  <img
                    src={cal}
                    alt=""
                    className="cal"
                    style={{ width: "45px", height: "45px" }}
                    onMouseEnter={handleHover}
                  />
                  {isHovered && (
                    <div className="dialog-box">
                      <Calendar />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        }
      </div>
    </nav>
  );
};

export default NavBar;
