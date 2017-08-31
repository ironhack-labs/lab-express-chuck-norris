const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const Chuck  = require('chucknorris-io');
const client = new Chuck();


app.set('views', 'views');
app.set('view engine', 'ejs');
app.set('layout', 'index.ejs');

app.use(expressLayouts);
app.use(express.static('public'));




app.get('/', (req, res, next) => {
  client.getRandomJoke().then((jokeInfo) => {
    console.log('RANDOM JOKE..............................');
    console.log(jokeInfo);

    console.log(jokeInfo.value);

    res.locals.oneJoke = jokeInfo.value;

    res.render('random');

  });
});


app.get('/categories', (req, res, next) => {
  client.getJokeCategories().then((jokeCat) =>  {

    console.log('RANDOM Cat..............................');
    console.log(jokeCat);

    res.locals.listOfCategories = jokeCat;

    res.render('categories')

    });
});

app.get('/categories-search', (req, res, next) => {
  client.getRandomJoke(req.query.cat).then((joke) => {
    console.log( req.query.cat);

    res.locals.oneJoke = joke.value;

    res.render('joke-by-category');

    }).catch((err) => {});

});


app.get('/search', (req, res, next) => {
  res.render('search-form');
});

app.get('/search-result', (req, res, next) => {
  client.search(req.query.searchTerm).then((result) => {
    console.log('KEYWORD SEARCH-------------');
    console.log(result);

    res.locals.resultCollection = result;

    // res.locals.oneJoke = result.value;
    //
    res.render('search-result');
  }).catch((err) => {});

});

app.listen(3000);
