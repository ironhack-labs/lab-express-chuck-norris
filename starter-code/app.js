const express = require('express');
const Chuck  = require('chucknorris-io');
const layouts = require('express-ejs-layouts');


const app = express();
const client = new Chuck();

app.set("view engine", "ejs");

app.use(layouts);
app.use(express.static("public"));

// SETUP -------------

app.get("/", (req, res, next) => {
  res.render("index.ejs");
});

app.get("/random", (req, res, next) => {
  client.getRandomJoke()
    .then( (response) => {
      // "response" contains the joke data
      res.locals.randomJoke = response.value;
      res.render("random.ejs");

      // save "response.value" as a local EJS variable
      // render a view to display the joke
    })
    .catch( (err) => {
      console.log("Joke ERROR:");
      console.log(err);
      //render an error view (think 404 page)
    });
});

client.getRandomJoke()
  .then( (response) => {
    // "response" contains the joke data
    console.log("Joke Data:", response);
    // use joke data here
    console.log("Random Joke:");
    console.log(response.value);
  })
  .catch( (err) => {
    // this will get called ONLY if thtere's an error
    console.log("Joke ERROR:", err);
  });

app.get("/categories", (req, res, next) => {

  client.getJokeCategories()
    .then( (response) =>  {
      res.locals.jokeCategories = response;
      res.render("categories.ejs");
    })
    .catch((err)=> {
      console.log("Categories ERROR:", err);
  });

  // Retrieve a random chuck joke
  client.getRandomJoke(req.query.oneCat)
    .then((response) => {
      // use the response here
      res.locals.randomCatJoke = response.value;
      res.render("joke-by-category.ejs");

    })
    .catch((err) => {
      // handle error
        console.log("Categories ERROR:", err);
    });
});

// END SETUP

  app.listen(3000);
