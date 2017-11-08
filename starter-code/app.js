const express = require('express');
const app = express();
const Chuck = require('chucknorris-io');
const client = new Chuck();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/random", (request, result, next) => {

  client.getRandomJoke()
    .then(joke => {
      console.log(joke.iconUrl);
      console.log(joke.value);
      result.render("index", joke);

    }).catch(error => {
      console.log(error);
    });

});

app.get("/categories", (request, result, next) => {

  client.getJokeCategories()
    .then(category => {
      console.log(category);
      result.render("categories", {category});
    }).catch(error => {
      console.log(error);
    });
});


app.listen(3001);
