const express = require('express');
const app = express();
const layouts = require("express-ejs-layouts");
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set("view engine", "ejs");

app.use(layouts);


app.get("/", (req, res, next) => {
  res.locals.client = client;
  res.render("home.ejs");
});

app.get("/random", (req, res, next) => {

  client.getRandomJoke()

    .then((response) => {

      console.log(response);
      res.locals.joke = response.value;
      res.render("random.ejs");

    })
    .catch((err) => {
      console.log(err);
      res.render("error.ejs");

    });
});

app.get("/categories", (req, res, next) => {

  client.getJokeCategories()

  .then((response)=>  {

    res.locals.categories = response;
    res.render("categories.ejs");

  })
  .catch((err)=> {
    res.render("error.ejs");

  });
});

app.get("/categories?=", (req,res, next)=> {

  client.getRandomJoke('dev')

  .then((response) => {

    res.locals.jokeCategory = response;
    res.render("joke-by-category.ejs");

  }).catch((err) => {
    res.render("error.ejs");

  });
});

app.get("/search", (req, res, next) => {

  res.render("search.ejs");

});

app.listen(3000);
