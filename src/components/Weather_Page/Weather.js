import React, { useEffect } from "react";
import CurrentLocation from "./currentLocation.js";
import "./Weather.css";
import NavBar from "../Navbar/NavBar.jsx";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useNavigate } from "react-router-dom";
import wordsToNumbers from "words-to-numbers";

const alanKey =
  "2a62828c09317d9b74edd5954968b0c32e956eca572e1d8b807a3e2338fdd0dc/stage";

const Weather = ({ setNewsArticles, setactiveArticle }) => {
  const navigate = useNavigate();
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          // console.log(articles)
          setNewsArticles(articles);
          setactiveArticle(-1);
          navigate("/news");
        } else if (command === "highlight") {
          setactiveArticle((prevActiveArticle) => prevActiveArticle + 1);
          navigate("/news");
        } else if (command === "open") {
          console.log(number);
          // for => four => 4
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText("Please try that again.");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening...");
          }
          navigate("/news")
        }

      },
    });
  });

  return (
    <div className="row weather">
      <div class="col-12" style={{ padding: "0px" }}>
        <NavBar />
        <React.Fragment>
          <div className="container-wh">
            <CurrentLocation />
          </div>
        </React.Fragment>
        <div
          style={{
            marginTop: "50px",
            fontSize: "40px",
            textAlign: "center",
            fontWeight: "bolder",
            color: "rgb(4, 4, 80)",
          }}
        >
          Commands:-
        </div>
        <div className="grid-container">
          <div className="grid-item">
            ↪ What is the weather/temperature/humidity/pressure like?
            <br />
            ↪ What is the weather/temperature/humidity/pressure?
            <br />
            ↪ Is the weather/temperature/humidity/pressure like?
            <br />
            ↪ Is the weather/temperature/humidity/pressure?
            <br />
            ↪ The weather/temperature/humidity/pressure like?
            <br />
            ↪ The weather/temperature/humidity/pressure like?
            <br />
            ↪ Weather/temperature/humidity/pressure like?
            <br />
            ↪ Weather/temperature/humidity/pressure?
          </div>
          <div className="grid-item">
            ↪ What is the weather/temperature/humidity/pressure like in $(LOC)?
            <br />
            ↪ What is the weather/temperature/humidity/pressure in $(LOC)?
            <br />
            ↪ Is the weather/temperature/humidity/pressure like in $(LOC)?
            <br />
            ↪ Is the weather/temperature/humidity/pressure in $(LOC)?
            <br />
            ↪ The weather/temperature/humidity/pressure like in $(LOC)?
            <br />
            ↪ The weather/temperature/humidity/pressure in $(LOC)?
            <br />
            ↪ Weather/temperature/humidity/pressure like in $(LOC)?
            <br />
            ↪ Weather/temperature/humidity/pressure in $(LOC)?
          </div>
          <div className="grid-item">
            ↪ What is the weather/temperature/humidity/pressure like on $(DATE)?
            <br />
            ↪ What is the weather/temperature/humidity/pressure on $(DATE)?
            <br />
            ↪ What will/was the weather/temperature/humidity/pressure be like on $(DATE)?
            <br />
            ↪ What will/was the weather/temperature/humidity/pressure be on $(DATE)?
            <br />
            ↪ Is the weather/temperature/humidity/pressure like on $(DATE)?
            <br />
            ↪ Is the weather/temperature/humidity/pressure on $(DATE)?
            <br />
            ↪ The weather/temperature/humidity/pressure like on $(DATE)?
            <br />
            ↪ The weather/temperature/humidity/pressure on $(DATE)?
            <br />
            ↪ Weather/temperature/humidity/pressure like on $(DATE)?
            <br />
            ↪ Weather/temperature/humidity/pressure on $(DATE)?
          </div>
          <div className="grid-item">
            ↪ Is it raining/rain/hot/warm/cold/chilly/cool?
            <br />
            ↪ Will it rain?
            <br />
            ↪ Will it be raining/rain/hot/warm/cold/chilly/cool?
            <br />
            ↪ It is raining/rain/hot/warm/cold/chilly/cool?
            <br />
            ↪ It going to rain?
            <br />
            ↪ It going to be raining/rain/hot/warm/cold/chilly/cool?
          </div>
          <div className="grid-item">
            ↪ Is it raining/rain/hot/warm/cold/chilly/cool in $(LOC)?
            <br />
            ↪ Will it rain in $(LOC)?
            <br />
            ↪ Will it be raining/rain/hot/warm/cold/chilly/cool in $(LOC)?
            <br />
            ↪ It is raining/rain/hot/warm/cold/chilly/cool in $(LOC)?
            <br />
            ↪ It going to rain in $(LOC)?
            <br />
            ↪ It going to be raining/rain/hot/warm/cold/chilly/cool in $(LOC)?
          </div>
          <div className="grid-item">
            ↪ Is it raining/rain/hot/warm/cold/chilly/cool on $(DATE)?
            <br />
            ↪ Will it rain on $(DATE)?
            <br />
            ↪ Will it be raining/rain/hot/warm/cold/chilly/cool on $(DATE)?
            <br />
            ↪ It is raining/rain/hot/warm/cold/chilly/cool on $(DATE)?
            <br />
            ↪ It going to rain on $(DATE)?
            <br />
            ↪ It going to be raining/rain/hot/warm/cold/chilly/cool on $(DATE)?
          </div>
          <div className="grid-item">
            ↪ Is it raining/rain/hot/warm/cold/chilly/cool in $(LOC) on $(DATE)?
            <br />
            ↪ Will it rain in $(LOC) on $(DATE)?
            <br />
            ↪ Will it be raining/rain/hot/warm/cold/chilly/cool in $(LOC) on $(DATE)?
            <br />
            ↪ It is raining/rain/hot/warm/cold/chilly/cool in $(LOC) on $(DATE)?
            <br />
            ↪ It going to rain in $(LOC) on $(DATE)?
            <br />
            ↪ It going to be raining/rain/hot/warm/cold/chilly/cool in $(LOC) on $(DATE)?
            <br />
            ↪ It was raining/rain/hot/warm/cold/chilly/cool in $(LOC) on $(DATE)?
          </div>
          <div className="grid-item">
            <span style={{ fontWeight: "bolder" }}>Follow ups:-</span>
            <br />
            ↳ And what about $(DATE)?
            <br />
            ↳ And on $(DATE)?
            <br />
            ↳ And what about on $(DATE)?
            <br />
            ↳ And what is in/at/about $(LOC)?
            <br />
            ↳ And what in/at/about $(LOC)?
            <br />
            ↳ And is in/at/about $(LOC)?
            <br />
            ↳ And in/at/about $(LOC)?
            <br />
            ↳ Units to/in $(UNITS metric/standard/imperial/celsius/fahrenheit)
            <br />
            ↳ Units $(UNITS metric/standard/imperial/celsius/fahrenheit)
            <br />
            ↳ Units to/in $(UNITS)
            <br />
            ↳ Units $(UNITS)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
