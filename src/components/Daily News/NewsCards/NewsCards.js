import React from "react";
import NewsCard from "../NewsCard/NewsCard";
import { Grid, Grow, Typography } from "@material-ui/core";
import useStyles from "./styles";

const infoCards = [
  { color: "black", title: "Latest News", text: "Give me the latest news" },
  {
    color: "black",
    title: "News by Categories",
    info: "Business, Entertainment, General, Health, Science, Sports, Technology",
    text: "Give me the latest Technology news",
  },
  {
    color: "black",
    title: "News by Terms",
    info: "Bitcoin, PlayStation 5, Smartphones, Donald Trump...",
    text: "News about/from PlayStation 5",
  },
  {
    color: "black",
    title: "News by Sources",
    info: "CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...",
    text: "Give me the news from CNN",
  },
];

const NewsCards = ({ articles, activeArticle }) => {
  const classes = useStyles();

  if (!articles.length) {
    return (
      <Grow in>
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {infoCards.map((infoCard) => (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={3}
              className={classes.infoCard}
            >
              <div
                className={classes.card}
                style={{ backgroundColor: infoCard.color }}
              >
                <Typography variant="h5">
                  <u>{infoCard.title}</u>
                </Typography>
                {infoCard.info ? (
                  <Typography variant="h7">
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        lineHeight: "34px",
                      }}
                    >
                      {infoCard.title.split(" ")[2]}:
                    </span>
                    <br />
                    {infoCard.info}
                  </Typography>
                ) : null}
                <Typography variant="h7">
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      lineHeight: "34px",
                    }}
                  >
                    Try saying:
                  </span>
                  <br /> <i>{infoCard.text}</i>
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>
    );
  }

  return (
    <Grow in>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
        style={{ marginTop: "-130px" }}
      >
        {articles.map((article, i) => (
          <Grid item xs={12} sm={12} md={6} lg={4} style={{ display: "flex" }}>
            <NewsCard article={article} activeArticle={activeArticle} i={i} />
          </Grid>
        ))}
      </Grid>
    </Grow>
  );
};

export default NewsCards;
