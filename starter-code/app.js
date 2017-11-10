const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const Chuck  = require('chucknorris-io');
const client = new Chuck();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.get("/", (req, res, next) => {
  res.render('index.ejs');
});
app.get("/random", (req, res, next) => {
  client.getRandomJoke().then(response => {
    res.locals.randomJoke =  response.value;
    res.render('random.ejs');
  }).catch(error=>{
    console.log(error);
  });
});
app.get("/categories", (req, res, next) => {
  client.getJokeCategories().then(response => {
    res.locals.categories =  response;
    res.render('categories.ejs');
  }).catch(error => {
    console.log(error);
  });
});

app.get("/categories/:x", (req, res, next)=>{
  let category = req.params.x;
  client.getRandomJoke(category).then(response=> {
    res.locals.category = category;
    res.locals.joke = response;
    res.render('joke-by-category.ejs');
  });
});
app.get("/search", (req, res, next)=>{
  res.render('search-form.ejs');
});
app.get("/search/:x", (req, res, next)=>{
  let searchTerm = req.query.mySearch;
  client.search(searchTerm)
  .then(function (response) {
    res.locals.searchTerm = searchTerm;
    res.locals.response = response;
    res.render('');
  }).catch(function (err) {
    // handle error
  });
});
app.listen(3000);
