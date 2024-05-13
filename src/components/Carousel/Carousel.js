import React from "react";
import "./Carousel.css";
import cnn from "./images/cnn.png";
import wired from "./images/wired.webp";
import bbc from "./images/bbc.jpg";
import times from "./images/times.webp";
import ign from "./images/ign.png";
import buzzfeed from "./images/buzzfeed.webp";
import abc from "./images/abc.webp";
import breitbart from "./images/breitbart.jpeg";
import axios from "./images/axios.webp";

const Carousel = () => {
  return (
    <div class="cont">
      <div class="carousel">
        <div class="carousel__face">
          <img src={cnn} alt="" style={{ width: "1260px" }} />
        </div>
        <div class="carousel__face">
          <img src={wired} alt="" style={{ width: "1260px" }} />
        </div>
        <div class="carousel__face">
          <img src={times} alt="" style={{ width: "1260px" }} />
        </div>
        <div class="carousel__face">
          <img src={bbc} alt="" style={{ width: "1260px" }} />
        </div>
        <div class="carousel__face">
          <img src={buzzfeed} alt="" style={{ width: "1260px" }} />
        </div>
        <div class="carousel__face">
          <img src={abc} alt="" style={{ width: "1260px" }} />
        </div>
        <div class="carousel__face">
          <img src={ign} alt="" style={{ width: "1260px" }} />
        </div>
        <div class="carousel__face">
          <img src={breitbart} alt="" style={{ width: "1260px" }} />
        </div>
        <div class="carousel__face">
          <img src={axios} alt="" style={{ width: "1260px" }} />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
