/*jshint esversion: 6*/
const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const morgan     = require('morgan');
const bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/random', (req, res, next) => {
  var jokeValue;
  client.getRandomJoke()
  .then((response) => {
    console.log(response);
    jokeValue = response.value;
    res.render('index', {joke: jokeValue});
  }).catch((err) => {
    // handle error
  });
});

app.get('/categories', (req, res, next) => {
  var jokeCategoriesValue;
  var jokeCategorySelectedValue;
  let cat = req.query.cat;

  if(cat!==undefined)
  {
    client.getRandomJoke(cat)
    .then((response) => {
      console.log(response);
      // use the response here
      jokeSelectedValue = response.value;
      jokeCategorySelectedValue = response.categories[0];
      res.render('joke-by-category', {jokeSelected:jokeSelectedValue,jokeCategorySelected:jokeCategorySelectedValue});
    }).catch((err) => {
      // handle error
    });
  }
  else
  {
    client.getJokeCategories()
    .then((response)=>  {
      jokeCategoriesValue = response;
      res.render('categories', {jokeCategories: jokeCategoriesValue});
    }).catch((err) => {
      // handle error
    });
  }
});

app.get('/search',(req,res,next)=>{
  res.render('search-form',{jokesCategorySearched: undefined});
});

app.post('/search',(req,res,next)=>{
  let jokesCategorySearchedValue;
  client.search(req.body.category)
  .then(function (response) {
    // to stuff here
    let jokesCategorySearchedValue = response.items;
    res.render('search-form',{jokesCategorySearched: jokesCategorySearchedValue});
  }).catch(function (err) {
    // handle error
  });

});

app.get('/', (req, res, next) => {
    res.render('home');
});

app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});
