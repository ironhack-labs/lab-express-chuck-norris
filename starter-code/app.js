const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');


app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');

//STATIC
app.use(express.static('public'));  //Server, use static files from the public folder


// --EXPRESS LAYOUTS--
// app.use(expressLayouts);
// app.set('layout', 'layouts/main-layout');
//  /* New */
// app.set('views', __dirname + "/views");

// client.getRandomJoke().then(function (response) {
//     console.log(response);
// }).catch(function (err) {
//     console.log(error);
// });




                                            // RANDOM JOKES
      // Retrieve a random chuck joke
        app.get('/random', (request, response) => {

          client.getRandomJoke().then(function (res) {
            jokeValue = res.value;
              response.render("index", {joke: jokeValue});   //<---must pass an object
          }).catch(function (err) {
              console.log(err);
          });

        });




                                              //CATEGORIES
// Retrieve a list of available joke categories
app.get('/categories', (request, response) => {
client.getJokeCategories().then(function (res) {

      response.render("categories", {categories: res});

}).catch(function (err) {
    console.log(err);
});


});

//URL with the new joke...
app.get('/categories/:category', (req, response) => {

  response.send(`Chuck Norris Joke Category: ${req.params.category}`);
  // let category = req.query.category;

  client.getRandomJoke(req.param("categories")).then(function (res) {
    jokeValue = res.value;
    response.render("joke-by-category", {jokeByCategory: jokeValue});
}).catch(function (err) {
    console.log(err);
});



});




                                                // SEARCH
app.get('/search', (req, res) => {
  res.render("");
});



// Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
