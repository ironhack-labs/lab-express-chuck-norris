const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

app.set('views','views');
app.set('view engine', 'ejs');
app.set('layout', 'my-master-layout.ejs');

app.use(expressLayouts);
app.use(express.static('public'));
// creates request.body for our POST routes
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res, next) => {
  res.render('home.ejs');
});
app.get('/random',(req,res,next) => {

  // Retrieve a random chuck joke
  client.getRandomJoke()
  .then((response) => {
    console.log(response);

    res.locals.joke = response.value;

    res.render('random.ejs');
  });

});

app.get('/categories',(req,res,next) => {

  // Retrieve a random chuck joke
  client.getJokeCategories()
  .then((response) => {
    console.log(response);

    res.locals.jokeCategories = response;

    res.render('categories.ejs');
  });

});

app.get('/search-form', (req,res,next) => {

  res.render('search-form.ejs');

});

app.get('/search-results',(req,res,next) => {


  const myTerm = req.query.mySearchTerm;

  client.search(myTerm).then(function (response) {

    console.log("HERE!");

    var randomIndex = Math.floor(Math.random() * response.items.length);

    console.log(response.items[2].value);
    console.log(response.items[randomIndex].value);
    res.locals.joke = response.items[randomIndex].value;


    res.render('search-results.ejs');
  });

});


// app.get('/category-joke')
app.get('/:categoryName', (req, res, next) => {
   const category = req.params.categoryName;

   // Retrieve a random chuck joke
   client.getRandomJoke(category)
  .then((response) => {
    res.locals.joke = response.value;
    res.render('joke-by-category.ejs');
  });
});

// app.get('/explicit',(req,res,next) => {
//
// });

app.listen(3000);
