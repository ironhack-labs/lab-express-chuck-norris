const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
// the package contains a constructor function
const Chuck  = require('chucknorris-io');
const client = new Chuck();

app.set('view engine', 'ejs');

app.set('layout', 'layout.ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressLayouts);

//ROUTES

app.get('/', (req, res, next) => {
  res.render('home-view.ejs');
});

// Get a random joke of any category
app.get('/random', (req, res, next) => {
  client.getRandomJoke().then((joke) => {
    res.render('random-joke-view.ejs', {
      objectJoke: joke
    });
  });
});

//Get the list of jokes categories
app.get('/categories', (req, res, next) => {
  client.getJokeCategories().then((categories)=>  {
    res.render('categories.ejs', {
      categoriesArray: categories
    });
  });
});

//One a joke category is clicked on, a random joke of the
//category is displayed
app.get('/jokeCategoryPage', (req, res, next) => {
  const clickedCategory = req.query.cat;
    client.getRandomJoke(clickedCategory).then((joke) => {
      console.log(joke.value);
      res.render('joke-by-category.ejs', {
        theJoke: joke.value,
        clickedCategory: req.query.cat
    });
  });
});


//Search a joke by keyword
app.get('/search', (req, res, next) => {
  res.render('search-view.ejs');
});

app.post('/check-results', (req, res, next) => {
  // req.query refers to the data in the "query string" (?food=pizz&price=88)
  const theSearch = req.body.searchTerm;
    client.search(theSearch)
    .then( (results) => {
      res.render('results-view.ejs', {
        viewResults: results
      });
    });
});

app.listen(3000);
