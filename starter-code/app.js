const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const Chuck = require('chucknorris-io');


const app = express();
const client = new Chuck();


app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res, next) => {
  res.render('index.ejs');
});

app.get('/random', (req, res, next) => {
  client.getRandomJoke().then((jokeData) => {
    // See 3rd party APIs working 
    console.log('\ngetRandomJoke()');
    console.log(jokeData);

    res.render(
      'random-joke-view.ejs',
      { joke: jokeData.value }
    );
  });
});

app.get('/categories', (req, res, next) => {
  if (req.query.cat === undefined) {
      client.getJokeCategories().then((categoriesData) => {
      

      res.render(
        'categories.ejs',
        { categories: categoriesData }
      );
    });
  }
  else {
    client.getRandomJoke(req.query.cat).then((jokeData) => {
        //checking ramdom joke
      console.log(`\ngetRandomJoke(${req.query.cat})`);
      console.log(jokeData);

      res.render(
        'joke-by-category-view.ejs',
        {
          joke: jokeData.value,
          category: req.query.cat
        }
      );
    });
  }
});

app.get('/search', (req, res, next) => {
  res.render('search-form-view.ejs');
});

app.post('/search', (req, res, next) => {
  client.search( req.body.keyword )
    .then((searchData) => {
      console.log(`\nsearch(${req.body.keyword})`);
      console.log(searchData);

      res.render(
        'search-results-view.ejs',
        {
          searchResults: searchData.items,
          searchTerm: req.body.keyword
        }
      );
    })
    .catch((error) => {
      console.log(`\nERROR!! search(${req.body.keyword})`);
      console.log(error);

      res.render(
        'search-results-view.ejs',
        {
          searchResults: [],
          searchTerm: req.body.keyword
        }
      );
    });
});


app.listen(3000);
