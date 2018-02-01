const express = require("express");
const app = express();
const Chuck = require("chucknorris-io");
const client = new Chuck();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// First route
app.get("/random", (req, res, next) => {
  client.getRandomJoke()
    .then(pedro => {
      res.render("index", { miChiste: pedro.value });
    })
    .catch(err => {});
});

// Second iteration
app.get("/categories", (req, res, next) => {
    client.getJokeCategories()
      .then(pedro => {
          console.log(pedro)
        res.render("categories", { chisteCategories: pedro });
      })
      .catch(err => {});
  });

// Server Started
app.listen(3000, () => {
  console.log("My first app listening on port 3000!");
});
