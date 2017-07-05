// EXPRESS
const express = require('express');
const app = express();

// VIEW DEFINITION
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// MIDDLEWARE: chucknorris-io
const Chuck  = require('chucknorris-io');
const client = new Chuck();

// MIDDLEWARE: express-ejs-layouts
const expressLayouts = require('express-ejs-layouts');
app.use(express.static('public'));
app.use(expressLayouts);
app.set('layout', 'layouts/index');

// MIDDLEWARE: Bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


/**
 * ROUTES
 */

/* /route */
app.get('/', (request, response, next) => {

  // Render the / page
  response.render('index');

});

/* /random */
app.get('/random', (request, response, next) => {
  
  // Retrieve a random chuck joke
  client.getRandomJoke()
    .then( (chuckRandomJokeResponse) => {
      // Retrieve the joke
      let data = {
        joke: chuckRandomJokeResponse.value
      };
      // Render the random page
      response.render('random', data);
    })
    .catch((err) => {
    // handle error
    console.log("Error, Chuck is not ready to cooperate: ", err);
  });
});


/* /categories route */
app.get('/categories', (request, response, next) => {
  
  // Retrieve chuck joke categories
  client.getJokeCategories()
    .then( (chuckJokeCategories) => {
      // Retrive the category array
      let data = {
        categories: chuckJokeCategories
      };
      // Render the categories page
      response.render('categories', data);
    })
    .catch((err)=> {
      // handle error
      console.log("Error, Chuck is not ready to cooperate: ", err); 
    });
});


/* /categories/:cat routes */
app.get('/categories/:cat', (request, response, next) => {
  
  // Retrieve a random chuck joke
  client.getRandomJoke(request.params.cat)
    .then((chuckRandomJokeResponse) => {
      // Retrieve a random joke from this category
      let data = {
        joke: chuckRandomJokeResponse.value
      };
      // Render the joke by category page
      response.render('joke-by-category', data);
    }).catch((err) => {
      // handle error
      console.log("Error, Chuck is not ready to cooperate: ", err); 
    });
});


/* /search GET route */
app.get('/search', (request, response, next) => {
  // Define an empty joke to displaye the form (if statement)
  let data = {
        jokes: []
      };
  // Just render the form
  response.render('search-form', data);
});


/* /search POST routes */
app.post('/search', (request, response, next) => {

  // Search a joke based on the keyword
  client.search(request.body.keyword)
  .then(function (chuckSearchResponse) {
    // Retrieve the search result
      let data = {
        jokes: chuckSearchResponse.items
      };
      // Render the joke by category page
      response.render('search-form', data);

  }).catch(function (err) {
    // handle error
    console.log("Error, Chuck is not ready to cooperate: ", err); 
  });

});


// Server Started
app.listen(3000, () => {
  console.log('My first app listening on port 3000!')
});