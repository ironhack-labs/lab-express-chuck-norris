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
      // use the response here
      res.send("<p>" + joke.value + "<br>" + joke.categories[0] + "</p>");
      // console.log(joke);
    })
    .catch(err => {
      // handle error
      throw err;
    });
  // console.log(client.getRandomJoke());
});

app.get("/categories", (req, res, next) => {
  // Retrieve a random chuck joke
  client
    .getJokeCategories()
    .then(categorie => {
      // console.log(categorie);
      res.render("categories", {
        cat: categorie
      });
    })
    .catch(err => {
      // handle error
      throw err;
    });
});

// Server Started
app.listen(3000, () => {
  console.log("My first app listening on port 3000!");
});
