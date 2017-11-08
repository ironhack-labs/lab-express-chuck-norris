const express = require("express");
const app = express();
const Chuck = require("chucknorris-io");
const client = new Chuck();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//app.use(express.static("views"));
app.get("/index", (req, res, next) => {
  res.render("index");
});

app.get("/random", (req, res, next) => {
  client
    .getRandomJoke()
    .then(function(response) {
      res.render("random", {response});
    })
    .catch(function(err) {});
});

app.get("/categories", (req, res, next) => {
  if(req.query.cat != undefined){
    client
      .getRandomJoke(req.query.cat)
      .then(function(response) {
        response.categories = req.query.cat;
        res.render("joke-by-category", {response});
      })
      .catch(function(err) {});
  } else {
  let cat = {};
  client
    .getJokeCategories()
    .then(function(response) {
      cat.categs = response;
      res.render("categories", {cat});
    })
    .catch(function(err) {});
  }
});

// Random categorie quote generator, Bonus!!
app.get("/rcategories", (req, res, next) => {
  let joke = {};
  client
    .getJokeCategories()
    .then(function(response) {
      joke.cat = response;
      let x = Math.floor(Math.random() * joke.cat.length);
      client
        .getRandomJoke(joke.cat[x])
        .then(function(response) {
          response.categories = joke.cat[x];
          res.render("rcategories", {response});
        })
        .catch(function(err) {});
    })
    .catch(function(err) {});
});

app.listen(3000, () => {
  console.log("listening");
});
