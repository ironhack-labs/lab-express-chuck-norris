const express = require("express");
const app = express();
const Chuck = require("chucknorris-io");
const client = new Chuck();

app.set("view engine", "ejs");

app.get("/random", (req, res, next) => {
  client
    .getRandomJoke()
    .then(joke => {
      res.render("random", {
        joke: joke.value
      });
    })
    .catch(err => {
      console.log("Chuck Norris never gets errors: he returns undefined");
    });
  console.log("got a request");
});

app.get("/categories", (req, res, next) => {
  client
    .getJokeCategories()
    .then(categories => {
      res.render("categories", {
        categories: categories
      });
    })
    .catch(err => {
      console.log("Chuck Norris doesn't error, he waits.");
    });
  console.log("got a request");
});

app.listen(3000, () => {
  console.log("take me!");
});
