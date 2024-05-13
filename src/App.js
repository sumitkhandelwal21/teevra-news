/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Front from "./components/Front_page/Front";
import Home from "./components/Home_Page/Home";
import Daily_news from "./components/Daily News/Daily_news";
import Weather from "./components/Weather_Page/Weather";
import NavBar from "./components/Navbar/NavBar";

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setactiveArticle] = useState(-1);
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Front />} />
        <Route exact path="/home" element={<Home setNewsArticles={setNewsArticles} setactiveArticle={setactiveArticle} />} />
        <Route exact path="/news" element={<Daily_news newsArticles={newsArticles} setNewsArticles={setNewsArticles} activeArticle={activeArticle} setactiveArticle={setactiveArticle} />} />
        <Route exact path="/weather" element={<Weather setNewsArticles={setNewsArticles} setactiveArticle={setactiveArticle} />} />
        <Route path="*" element={<Navigate to="/" replace />} />{" "}
        {/*If a path(page) doesn't exist then it redirect to home page*/}
      </Routes>
    </>
  );
};

export default App;
