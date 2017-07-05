const express = require('express');
const expressLayouts = require("express-ejs-layouts");
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const bodyParser = require("body-parser");

app.use(expressLayouts);
app.set("layout", "layouts/main");
app.set("views",__dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.redirect("/random");
});

app.get("/random", (req, res, next)=> {
  client.getRandomJoke()
    .then((response) => {
      const joke = response.value;
      res.render("index", {joke});
    }).catch((err) => {
      console.log("error:" + err);
    });
});

app.get("/categories", (req, res, next)=> {
  if (req.query.cat !== undefined) {
    const cat = req.query.cat;
    client.getRandomJoke(cat)
    .then((response) => {
      const joke = response.value;
      res.render("joke-by-category", {joke, cat});
    }).catch((err) => {
      console.log("error:" + err);
    });
  } else {
    client.getJokeCategories()
      .then((categories) => {
        res.render("categories", {categories});
      }).catch((err) => {
        console.log("error:" + err);
      });
  }
});

app.get("/search", (req, res, next) => {
  res.render("search-form");
});

app.post("/search", (req, res, next) => {
  client.search(req.body.keyword)
  .then((response) => {
    res.render("search-form", {response});
  }).catch((err) => {
    console.log("error:" + err);
  });
});

app.listen(3001, ()=> {
  console.log("listening to port 3001");
});
