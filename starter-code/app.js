const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();


// SETUP -------------------------

app.get("/aCategory", (req, res, next) => {
  res.render("categories.ejs");
});

app.get("/categories", (req, res, next) => {
  client.getJokeCategories()
  .then((response)=>  {

    res.locals.categoryList = response;
    // use the response here
    res.render("categories.ejs");
  })
  .catch((err)=> {
    // handle error
    res.render("/error");
  });
});

app.get("/index", (req, res, next) => {
  res.render("index.ejs");
});

app.get("/joke-by-category", (req, res, next) => {
  res.render("joke-by-category.ejs");
});

app.get("/", (req, res, next) => {
  res.render("home-page.ejs");
});


app.get("/random", (req, res, next) => {
   client.getRandomJoke()
   .then((response) => {
      console.log("Joke Data: ");
      console.log(response);

      res.locals.joke = response.value;
      res.render("random.ejs");

    //save "response.value" as a local EJS variable
    // render a view to display the joke

   })
   .catch((err) => {
      console.log("Joke ERROR: ");
      console.log(err);

      res.render("/error");

      // render an error view (think 404 page)

   });
}); //GET /random






app.listen(3000);
