const express = require("express");
const app = express();
const Chuck = require("chucknorris-io");
const client = new Chuck();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// app.get("/", (req, res, next) => {
//   // s
//   res.render("index");
// });

app.get("/random", (req, res, next) => {
  client
    .getRandomJoke()
    .then(joke => {
      let jo = joke.value;
      res.render("index", { name: jo });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/categories", (req, res, next) => {
  client.getJokeCategories()
    .then(categories => {
      responde.render("categories", {categories})
    })
    .catch(err => {
      console.log(err)
    });
});

app.listen(3000);
