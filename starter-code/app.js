const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const Chuck = require('chucknorris-io');
const client = new Chuck();

const app = express();

app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout.ejs');

app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.render('home.ejs');
});

app.get('/random', (req, res, next) => {
  client.getRandomJoke().then((jokeData) => {
    randomJoke = jokeData.value;
  res.render('random.ejs',{
    oneJoke: randomJoke
    });
  });
});

client.getJokeCategories().then((categoryList) =>  {
    jokeCategories = categoryList;
  });

app.get('/categories', (req, res, next) => {
  res.render('categories.ejs',{
    categories: jokeCategories
  });
});

app.get('/joke-by-category', (req, res, next) => {
  client.getRandomJoke(req.query.cat).then((jokeCategory) => {
    newJoke = jokeCategory.value;
  res.render('joke-by-category.ejs', {
    categoryJoke: newJoke
    });
  });
});

app.get('/search', (req, res, next) => {
  res.render('search-form.ejs', {
    finalJoke: ''
  });
});

app.post('/search', (req,res,next) => {
    client.search(req.body.searchTerm).then(function(searchResult){
      let finalJoke = searchResult.items;
      res.render('search-form.ejs',{
        finalJoke
    });
  });
});


app.listen(3000);
