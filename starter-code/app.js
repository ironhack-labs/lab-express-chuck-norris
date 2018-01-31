const express = require("express");
const app = express();
const Chuck = require("chucknorris-io");
const client = new Chuck();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

//app.use(express.static('public'));
app.use(expressLayouts);
app.set("layout", "layouts/main-layout");
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
// Retrieve a random chuck joke

app.get("/random", (request, response, next) => {
  
  client
  .getRandomJoke()
  .then(joke => {
    response.render("index", { joke: joke });
  })
  .catch(err => {
    console.log("Error retrieving joke")
  })

});

// our first Route

app.get("/categories", (request, response, next) => {
  let cat = request.query.cat;
  client
  .getJokeCategories()
  .then(categories =>  {
    response.render("categories", {categories});

  })
  .catch((err)=> {
    // handle error
  });
});

app.get("/joke-by-category",(request, response, next) => {
  let cat = request.query.cat;
  console.log(cat)
  response.render("joke-by-category", {cat})
});

// Server Started
app.listen(3000, () => {
  console.log("My first app listening on port 3000!");
});
