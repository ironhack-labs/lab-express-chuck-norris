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
    .then(joke => {
      res.render("index", joke);
    })
    .catch(err => {
      console.log(err);
      // handle error
    });
});

app.get("/categories", (req, res, next) => {
  client
    .getJokeCategories()
    .then(result => {
      const data = {
        categories: result
      };
      res.render("categories", data);
    })
    .catch(err => {
      // handle error
    });
});

app.get("/categories/:cat", function(req, res) {
  const category = req.params;
  res.render("joke-by-category", category);
});

app.listen(3000, () => {
  console.log("My first app listening on port 3000!");
});
