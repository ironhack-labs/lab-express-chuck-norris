const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const Chuck = require("chucknorris-io");
const client = new Chuck();

app.use(expressLayouts);
app.set("layout", "layouts/main-layout");

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/random", (req, res, next) => {
  client
    .getRandomJoke()
    .then(result => {
      const data = {
        joke: result
      };
      res.render("random", data);
    })
    .catch(err => {
      throw err;
    });
});

app.get("/random", (req, res, next) => {
  client
    .getRandomJoke()
    .then(result => {
      const data = {
        joke: result
      };
      res.render("random", data);
    })
    .catch(err => {
      throw err;
    });
});

app.get("/categories", (req, res, next) => {
  client
    .getJokeCategories()
    .then(result => {
      const data = {
        category: result
      };
      res.render("categories", data);
    })
    .catch(err => {
      throw err;
    });
});

app.listen(3001);
