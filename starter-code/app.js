/* jshint esversion: 6 */

const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', 'views');
app.set('view engine', 'ejs');

app.get('/random', function(request, response) {
  // Retrieve a random chuck joke
  client.getRandomJoke().then(function (rJoke) {
    // to stuff here
    console.log(rJoke);

    response
      .status(200)
      .render('index', {
        joke: rJoke.value
      });
  }).catch(function (err) {
    // handle error
  });

});

app.get('/search', function (request, response){
  response
    .status(200)
    .render('search-form');
});

app.post('/search', function (request, response){
  let chosenTerm = request.body.keyboard;
  client.search(chosenTerm).then(function (rSearch) {
    // to stuff here
    let allJokes = rSearch.items;
    //console.log(rSearch);
    response.render("search-show", {word: chosenTerm, items: allJokes});
  }).catch(function (err) {
    // handle error
  });

});

app.get('/categories/:catName', function(request, response) {

  const chosenCat = request.params.catName;
  // Retrieve a random chuck joke from the given category
  client.getRandomJoke(chosenCat).then(function (rJoke) {
    // to stuff here
    response
      .status(200)
      .render('joke-by-category', {
        category: chosenCat,
        joke: rJoke.value
    });
  }).catch(function (err) {
    // handle error
  });
});

app.get('/categories', function(request, response) {
  client.getJokeCategories().then((rCategories)=>  {
     // use the response here
     console.log(rCategories);
     response
       .status(200)
       .render('categories', {
         categories: rCategories
     });
  }).catch((err)=> {
    console.error(err);
  });
});

app.get('/', function(request, response) {
  response.send('hello world');
});

app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
