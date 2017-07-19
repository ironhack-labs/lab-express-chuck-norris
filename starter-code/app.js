const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const expressLayouts = require('express-ejs-layouts');
const client = new Chuck();
const bodyParser = require('body-parser');

// creates an absolute path pointing to a folder called "views"
app.set('views', __dirname + '/views');


// Setup Express and expressLayouts
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');
app.use(bodyParser.urlencoded({ extended: true }));


// GET Method for random jokes
app.get('/random', (req, res, next) => {

  client.getRandomJoke()
  .then((joke) => {
    res.send(joke.value);
  })
  .catch((err) => {
    ////
  })
});

// GET Method for jokes by categories
app.get('/categories', (req, res, next) => {

  // If a category has been selected in the query
  if (req.query.cat) {
    client.getRandomJoke(req.query.cat)
    .then((joke) =>{
      res.render('joke-by-category', {joke: joke, cat: req.query.cat});
    })
    .catch((err) => {
      //
    })

  // else render the category selection page
  } else {

    client.getJokeCategories()
    .then((jokeCategories) => {
      res.render('categories', {jokeCategories});
    })
    .catch((err) => {
      ///
    });
  }
})


// GET METHOD for joke by keyword search page
app.get('/search', (req, res, next) => {
  res.render('search-form');
});


// POST METHOD for joke by keyword search
app.post('/search', (req, res, next) => {
  let keyword = req.body.keyword;

  client.getRandomJoke(keyword)
  .then((joke) =>{
    res.render('joke-by-category', {joke: joke, cat: keyword});
  })
  .catch((err) => {
    //
  })

});


app.listen(3000, () => {
  console.log('Listenting on 3000');
});
