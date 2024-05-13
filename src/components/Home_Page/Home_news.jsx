import React, { useState, useEffect } from "react";
// import axios from 'axios';
import defNews from "../Daily News/NewsCard/news.png";
import Loader from "../loader/Loader";

const Home_news = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(
      "https://gnews.io/api/v4/top-headlines?token=96c02c45f449305374a67c2b952047dc&lang=en&country=in"
    )
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   setLoading(true);
  //   axios.get("https://gnews.io/api/v4/top-headlines?token=96c02c45f449305374a67c2b952047dc&lang=en&country=in")
  //     .then((res) => {
  //       console.log(res.data.articles);
  //       setNews(res.data.articles);
  //     })
  // }, []);

  return (
    <div className="home-news-section">
      <div className="container my-5">
        <div className="row text-center">
          {loading === true ? (
            <Loader />
          ) : (
            <div className="card-grid-cont">
              {news.map((val) => {
                return (
                  //   <div className="col my-4 xs-6 sm-6 p-0">
                  <div className="card">
                    <div className="img-cont">
                      <img
                        src={val.image || defNews}
                        className="card-img-top"
                        alt=""
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{val.title}</h5>
                      <p className="card-text">{val.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home_news;
