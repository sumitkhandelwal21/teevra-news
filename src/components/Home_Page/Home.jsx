/* eslint-disable react/jsx-pascal-case */
import React from "react";
import "./Home.css";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
// import NavBar from "../Navbar/NavBar";
import Carousel from "../Carousel/Carousel";
import Home_news from "./Home_news";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import wordsToNumbers from "words-to-numbers";
import alanBtn from "@alan-ai/alan-sdk-web";

const alanKey =
  "2a62828c09317d9b74edd5954968b0c32e956eca572e1d8b807a3e2338fdd0dc/stage";

const Home = ({ setNewsArticles, setactiveArticle }) => {
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
          navigate("/news");
        }
        console.log(command);
      }


    });
  });
  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.className = "";
      if ((rootElement.className = "")) {
        window.location.reload();
      }
    }
  }, []);
  return (
    <>
      <div className="col col-lg-12 p-0 d-flex flex-column home">
        <Carousel />
        <Home_news />
      </div>
    </>
  );
};

export default Home;
