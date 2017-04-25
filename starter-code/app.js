const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const Chuck = require('chucknorris-io');

// initializing express and chuck norris api
const app = express();
const client = new Chuck();

// setting ejs view engine
app.set('view engine', 'ejs');

// middlewares
app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));

// routers
app.get('/', (req, res, next) => {
  res.render('home-view.ejs');
});

app.get('/random', (req, res, next) => {
  client.getRandomJoke().then((jokeData) => {
    console.log('\ngetRandomJoke()');
    console.log(jokeData);

    res.render(
      'random-joke-view.ejs',
      { joke: jokeData.value }
    );
  });
});

app.get('/categories', (req, res, next) => {
  // get the category when user click a category link in  'categories-view.ejs' 
  let jokeCategory = req.query.cat;    
  if (jokeCategory === undefined) {
    client.getJokeCategories().then((categoriesData) => {
      console.log('\ngetJokeCategories()');
      console.log(categoriesData);

      res.render( 'categories-view.ejs',
      { categories: categoriesData }
      );
    });
  } else {
    client.getRandomJoke(jokeCategory).then((jokeData) => {
      console.log('\ngetRandomJoke()');
      console.log(jokeData);

      res.render( 'joke-by-category-view',
      { 
        category: jokeCategory,
        joke: jokeData.value        
      }
      );
     });
  }  
});

app.get('/search', (req, res, next) => {
  res.render('search-form-view.ejs');
});

app.post('/search', (req, res, next) => {
  let keyword    = req.body.keyword;
  client.search( keyword ).then((searchData) => {
      console.log(`\nsearch(${keyword})`);
      console.log(searchData);

      res.render( 'search-results-view.ejs',
        {
          results: searchData.items,
          keyword: keyword
        }
      );
    });
  
});

app.listen(3000);