const express = require('express');//WHAT?
const expressLayouts = require('express-ejs-layouts');
const Chuck  = require('chucknorris-io');
const client = new Chuck();

const app = express();

//Setting up app config(A)
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout.ejs');

//Letting app using stuff(B)

app.use(express.static('public'));
app.use(expressLayouts);

//Making pages(C)
app.get('/', (req, res, next) => {
  res.render('homepage-view.ejs');
});

app.get('/random', (req, res, next) => {
  client.getRandomJoke().then((fact) => {
    console.log("I see this: "+ fact);
    thisJoke = joke.value;
    res.render('chuck-random.ejs', {
      joke: quote
    });
  }).catch((err) => {
    console.log('Your mind could not understand complexity of Chuck humor');
  });
});

app.get('/categories', (req, res, next) => {
  res.render('joke-by-category.ejs');
}); //Categories

app.get('/search', (req, res, next) => {
  res.render('search-view.ejs');
}); //Search

app.listen(3000);
