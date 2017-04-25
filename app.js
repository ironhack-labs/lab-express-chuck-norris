const express = require('express');//WHAT?
const expressLayouts = require('express-ejs-layouts');
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

//Setting up app config(A)
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout', './layouts/main-layout.ejs');

//Letting app using stuff(B)

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded( {extended: true}));

//Making pages(C)
app.get('/', (req, res, next) => {
  res.render('homepage-view.ejs');
});

app.get('/random', (req, res, next) => {
  client.getRandomJoke()
  .then((randomOne) => {
    console.log(randomOne);
    res.render('chuck-random.ejs',
  {randomJoke: randomOne.value});

  }).catch((err) => {
    console.log('smth went wrong');
  });
});

//Categories
app.get('/categories', (req, res, next) => {
  if (req.query.cat === undefined) {
    client.getJokeCategories()
    .then((categoryList)=>  {
      console.log(categoryList);
      res.render('categories.ejs',
      {categories: categoryList});
    });
  } else {
    client.getRandomJoke(req.query.cat)
    .then((joke) => {
      console.log(joke);

      res.render(
        'joke-by-category.ejs',
        { joke: joke.value,
          categories: req.query.cat
        }
      );
    });
  }
});

//Search
app.get('/search', (req, res, next) => {
  console.log("searching");
  res.render('search-view.ejs',
  {searchResults: []});
});

app.post('/search', (req, res, next) => {
  console.log(req.body.searchKeyword);
  client.search(req.body.searchKeyword).then((results) => {
    console.log(`searching for --> ${req.body.searchKeyword}`);
    res.render('search-view.ejs',
     {searchResults: results.items});
    console.log(results.items);
  }).catch(function (err) {
    // handle error
});
});

app.listen(3000);
