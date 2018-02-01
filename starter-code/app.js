const express = require("express");
const app = express();
const Chuck = require("chucknorris-io");
const client = new Chuck();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/random", (req, res, next) => {
  // Retrieve a random chuck joke
  client
    .getRandomJoke()
    .then(chiste => {
      // use the response here
      res.render("index", { miChiste: chiste.value });
    })
    .catch(err => {
      // handle error
    });
});
app.get("/categories", (req, res, next) => {
  client
    .getJokeCategories()
    .then(function(response) {
      res.render("categories", { categorias: response});
    })
    .catch(function(err) {
      console.log(err);
    });
});

app.listen(3000);
