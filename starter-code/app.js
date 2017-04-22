  const express = require('express');
  const expressLayouts = require('express-ejs-layouts');
  const bodyParser = require('body-parser');
  const morgan = require('morgan');
  const Chuck  = require('chucknorris-io');
  const client = new Chuck();

  const app = express();


  app.set('view engine', 'ejs');
  app.set('layout', 'layouts/main-layout.ejs');
  // ------------------------------------
  app.use(morgan('dev'));
  app.use(express.static('public'));
  app.use(expressLayouts);
  app.use(bodyParser.urlencoded({ extended: true }));


  app.get('/', (req, res, next) => {
      res.render('home-view.ejs');
  });

  app.get('/random', (req, res, next) => {
    client.getRandomJoke().then((jokeData) => {
      console.log(jokeData);
      quote = jokeData.value;
      res.render('random.ejs', {
        joke: quote
      });
    }).catch((err) => {
      console.log('Something went wrong');
    });
  });


  client.getJokeCategories().then((array)=>  {
    categories = array;
  });

  app.get('/category', (req, res, next) => {

      res.render('categories.ejs', {
        display: categories
      });
  });


  app.get('/joke-by-category', (req, res, next) => {
    client.getRandomJoke(req.query.cat).then((categories) => {
      getCategory = categories;
      newOne = categories.value;
    res.render('joke-by-category.ejs', {
      catGory: newOne,
      displayCategory : req.query.cat
      });
    });
  });

  app.post('/search', (req,res,next) => {
    client.search(req.body.searchTerm).then(function(searchResult){
      let finalJoke = searchResult.items;
      res.render('search.ejs',{
        finalJoke
    });
  });
  });

  app.get('/search', (req,res,next) => {
    res.render('search.ejs', {
     finalJoke: ''
      });
  });



app.listen(3000);
