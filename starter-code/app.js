/*jshint esversion: 6 */

const express = require('express');
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require('body-parser');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.use(expressLayouts);
app.set("layout", "layouts/index");
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", (request, response, next) => {
  response.render("home");
});

app.get("/random", (request, response, next) => {
  client.getRandomJoke()
    .then((newJoke) => {
      let data = {
        joke: newJoke.value
      };
      response.render("random", data);
    }).catch((err) => {
      // window.alert(err);
    });
});

app.get("/categories", (request, response, next) => {
  client.getJokeCategories()
    .then((jokeCategories)=>  {
      let data = {
        categories: jokeCategories
      };
      response.render("categories", data);
    })
    .catch((err)=> {
      // window.alert(err);
    });
});

app.get("/categories/:cat", (request, response, next) => {
  client.getRandomJoke(request.params.cat)
    .then((newJoke) => {
      let data = {
        joke: newJoke.value
      };
      response.render("joke-by-category", data);
    }).catch((err) => {
      // window.alert(err);
    });
});

app.get("/search", (request, response, next) => {
  let data = {
    items: false
  };
  response.render("search-form", data);
});

app.post("/search", (request, response, next) => {
  client.search(request.body.keyword)
    .then(function (newJoke) {
      let data = {
        // joke: newJoke.items[0].value
        items: newJoke.items,
      };
      response.render("search-form", data);
    }).catch(function (err) {
      // window.alert(err);
    });
});

app.listen(3000, () => {
});
