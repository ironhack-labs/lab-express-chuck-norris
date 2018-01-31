const express = require("express");
const app = express();
const Chuck = require("chucknorris-io");
const client = new Chuck();
const expressLayouts = require("express-ejs-layouts");

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
    console.log(joke);
    response.render("index", { joke: joke });
  })
  .catch(err => {
    console.log("Error retrieving joke")
  })

});

// our first Route



// Server Started
app.listen(3000, () => {
  console.log("My first app listening on port 3000!");
});
